/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test harness installs a TypeScript require hook without adding a runtime dependency. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createHmac } = require("node:crypto");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
require.extensions[".ts"] = (module, filename) => {
  const source = ts
    .transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    })
    .outputText.replace(
      /require\("@\/([^\"]+)"\)/g,
      (_, p) => `require(${JSON.stringify(path.join(root, p))})`,
    );
  module._compile(source, filename);
};
const { POST } = require("../app/api/estimate/route.ts");
let ip = 1;
const valid = {
  landingPage: "artificial-turf",
  name: "Website QA",
  email: "qa@example.com",
  phone: "2025550147",
  zip: "32804",
  projectType: "Residential Artificial Turf Installation",
  squareFootage: "450",
  website: "",
  submissionId: "60d68593-1d90-4d1d-b051-36a3ae1d5bf6",
  trackingConsent: true,
  attribution: { utm_source: "qa", gclid: "test" },
};
function request(body = valid, headers = {}) {
  return new Request("https://firsthandlawns.com/api/estimate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `192.0.2.${ip++}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
test("estimate validation, delivery, attribution, and duplicate contract", async (t) => {
  const originalFetch = global.fetch;
  const originalUrl = process.env.JOBBER_WEBHOOK_URL;
  const originalSecret = process.env.WEBSITE_LEAD_WEBHOOK_SECRET;
  process.env.JOBBER_WEBHOOK_URL = "https://crm.example.test/website-lead";
  process.env.WEBSITE_LEAD_WEBHOOK_SECRET = "test-only-secret";
  try {
    await t.test(
      "invalid, bot, unsupported service, cross-origin, and oversized requests never reach CRM",
      async () => {
        global.fetch = () => {
          throw Error("must not call backend");
        };
        for (const body of [
          { ...valid, phone: "abc" },
          { ...valid, zip: "no" },
          { ...valid, website: "spam" },
          { ...valid, projectType: "Custom Backyard Putting Greens" },
          { ...valid, squareFootage: "0" },
          "{",
        ])
          assert.equal((await POST(request(body))).status, 400);
        assert.equal(
          (await POST(request(valid, { origin: "https://evil.example" })))
            .status,
          403,
        );
        assert.equal((await POST(request("x".repeat(13000)))).status, 413);
      },
    );
    const payloads = [];
    global.fetch = async (url, init) => {
      assert.equal(url, "https://crm.example.test/website-lead");
      assert.equal(
        init.headers["X-Hub-Signature-256"],
        createHmac("sha256", "test-only-secret")
          .update(init.body)
          .digest("base64"),
      );
      payloads.push(JSON.parse(init.body));
      return Response.json({ ok: true, jobber_request_id: "test-request" });
    };
    await t.test(
      "accepted lead preserves CRM contract and consented attribution",
      async () => {
        assert.equal((await POST(request())).status, 200);
        const p = payloads.at(-1);
        assert.match(p.message, /"utm_source":"qa"/);
        assert.match(p.message, /Approximate square footage: 450/);
        assert.match(p.message, /Submitted at:/);
        assert.equal(p.sms_consent, false);
        assert.equal(p.source_address.zip, "32804");
      },
    );
    await t.test(
      "identical inquiries reuse the durable CRM idempotency key",
      async () => {
        await POST(
          request({
            ...valid,
            submissionId: "324cf162-2745-49b8-943f-824447203efe",
          }),
        );
        assert.equal(
          payloads.at(-1).idempotency_key,
          payloads.at(-2).idempotency_key,
        );
      },
    );
    await t.test(
      "denied consent strips all attribution before forwarding",
      async () => {
        await POST(request({ ...valid, trackingConsent: false }));
        assert.match(payloads.at(-1).message, /Campaign attribution: \{\}/);
        assert.doesNotMatch(payloads.at(-1).message, /"gclid"/);
      },
    );
    await t.test(
      "outdoor project details reach the same receiver",
      async () => {
        assert.equal(
          (
            await POST(
              request({
                ...valid,
                landingPage: "outdoor-living",
                projectType: "Paver Patios & Hardscaping",
                budget: "$10,000–$25,000",
                startDate: "1–3 months",
                squareFootage: undefined,
              }),
            )
          ).status,
          200,
        );
        assert.match(
          payloads.at(-1).message,
          /Estimated budget: \$10,000–\$25,000/,
        );
      },
    );
    await t.test(
      "backend errors, pending rows, malformed acceptance never show success",
      async () => {
        for (const result of [
          { ok: false },
          { ok: true },
          { ok: true, status: "failed", jobber_request_id: "x" },
          { ok: true, status: "pending", jobber_request_id: null },
        ]) {
          global.fetch = async () => Response.json(result);
          assert.equal((await POST(request())).status, 503);
        }
        global.fetch = async () => new Response("unavailable", { status: 502 });
        assert.equal((await POST(request())).status, 503);
        global.fetch = async () => {
          throw Error("network");
        };
        assert.equal((await POST(request())).status, 503);
      },
    );
    await t.test("missing delivery credentials fails closed", async () => {
      delete process.env.WEBSITE_LEAD_WEBHOOK_SECRET;
      assert.equal((await POST(request())).status, 503);
    });
    await t.test("burst protection rejects excessive requests", async () => {
      for (let n = 0; n < 6; n++)
        await POST(request(valid, { "x-forwarded-for": "192.0.2.250" }));
      assert.equal(
        (await POST(request(valid, { "x-forwarded-for": "192.0.2.250" })))
          .status,
        429,
      );
    });
  } finally {
    global.fetch = originalFetch;
    if (originalUrl) process.env.JOBBER_WEBHOOK_URL = originalUrl;
    else delete process.env.JOBBER_WEBHOOK_URL;
    if (originalSecret)
      process.env.WEBSITE_LEAD_WEBHOOK_SECRET = originalSecret;
    else delete process.env.WEBSITE_LEAD_WEBHOOK_SECRET;
  }
});

test("browser attribution and analytics honor consent", () => {
  const vm = require("node:vm");
  const trackingModule = { exports: {} };
  const local = new Map();
  const session = new Map();
  const memory = (map) => ({
    getItem: (key) => map.get(key) || null,
    setItem: (key, value) => map.set(key, value),
    removeItem: (key) => map.delete(key),
  });
  const context = {
    exports: trackingModule.exports,
    module: trackingModule,
    localStorage: memory(local),
    sessionStorage: memory(session),
    location: {
      search:
        "?utm_source=qa&utm_medium=test&utm_campaign=acceptance&utm_term=backyard&utm_content=hero&gclid=g&gbraid=b&wbraid=w&fbclid=f",
      pathname: "/artificial-turf",
    },
    URLSearchParams,
    window: { dataLayer: [] },
  };
  vm.runInNewContext(
    ts.transpileModule(
      fs.readFileSync(path.join(root, "lib/landing-tracking.ts"), "utf8"),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
        },
      },
    ).outputText,
    context,
  );
  const { captureAttribution, landingEvent } = trackingModule.exports;
  assert.equal(JSON.stringify(captureAttribution()), "{}");
  landingEvent("form_start", "artificial-turf");
  assert.equal(context.window.dataLayer.length, 0);
  assert.equal(session.size, 0);
  local.set("firsthand:cookie-consent", "granted");
  const result = captureAttribution();
  assert.equal(Object.keys(result).length, 9);
  assert.equal(result.gclid, "g");
  context.location.search = "";
  assert.equal(captureAttribution().utm_source, "qa");
  landingEvent("form_start", "artificial-turf");
  landingEvent("cta_click", "artificial-turf");
  landingEvent("lead_form_submit", "artificial-turf");
  landingEvent("generate_lead", "artificial-turf");
  const events = context.window.dataLayer
    .filter((e) => e.event)
    .map((e) => e.event);
  assert.equal(
    JSON.stringify(events),
    JSON.stringify([
      "form_start",
      "cta_click",
      "lead_form_submit",
      "generate_lead",
    ]),
  );
  assert.equal(
    context.window.dataLayer.filter(
      (e) => e[0] === "event" && e[2].send_to === "G-D7SGCGNJEP",
    ).length,
    2,
  );
  local.set("firsthand:cookie-consent", "denied");
  const count = context.window.dataLayer.length;
  landingEvent("generate_lead", "artificial-turf");
  assert.equal(context.window.dataLayer.length, count);
  assert.equal(JSON.stringify(captureAttribution()), "{}");
});
