/**
 * Forward contact-form photos to FieldShot so the website lead's request
 * arrives WITH its photos, ready for the AI quote drafter.
 *
 * Pipe (mirrors FieldShot's public sign→PUT→finalize upload discipline,
 * server-to-server): POST /api/lead-media/sign with the lead identity + the
 * Jobber ids the ops webhook returned → PUT each photo's bytes straight to
 * signed storage URLs (no function body limits) → POST /api/lead-media/finalize
 * to land the media rows. FieldShot resolves-or-creates the project keyed by
 * the same webhook idempotency_key, so a whole-form retry converges instead of
 * duplicating, and the eventual Jobber→FieldShot sync converges on the same
 * project via the request/property/client ids threaded through here.
 *
 * Best-effort by design: a FieldShot outage must never fail the contact form —
 * the Jobber request (with its note) is the system of record for the lead.
 */

const FIELDSHOT_URL = process.env.FIELDSHOT_URL;
const FIELDSHOT_LEAD_INGEST_SECRET = process.env.FIELDSHOT_LEAD_INGEST_SECRET;
const FIELDSHOT_LEAD_ORG_ID = process.env.FIELDSHOT_LEAD_ORG_ID;

// FieldShot's media-originals allowlist (storage-paths.ts EXT_BY_MIME, images
// only — the contact form already rejects non-image/*). Anything outside this
// set is skipped with a log line rather than failing the batch.
const FIELDSHOT_IMAGE_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export interface LeadPhoto {
  filename: string;
  content: ArrayBuffer;
  type: string;
}

export interface LeadForFieldShot {
  name: string;
  street?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  zip?: string | undefined;
}

export interface JobberIdsFromWebhook {
  clientId?: string | undefined;
  requestId?: string | undefined;
  propertyId?: string | undefined;
}

interface SignResponse {
  projectId: string;
  uploads: { path: string; token: string; signedUrl: string }[];
}

export function fieldshotConfigured(): boolean {
  return Boolean(FIELDSHOT_URL && FIELDSHOT_LEAD_INGEST_SECRET && FIELDSHOT_LEAD_ORG_ID);
}

export async function forwardPhotosToFieldShot(args: {
  idempotencyKey: string;
  lead: LeadForFieldShot;
  jobber: JobberIdsFromWebhook;
  photos: LeadPhoto[];
}): Promise<{ forwarded: number; skipped: number } | { skipped: "not_configured" | "no_photos" }> {
  if (!fieldshotConfigured()) {
    if (args.photos.length > 0) {
      console.warn(
        "[contact] FieldShot env not configured — photos NOT forwarded (set FIELDSHOT_URL, FIELDSHOT_LEAD_INGEST_SECRET, FIELDSHOT_LEAD_ORG_ID)"
      );
    }
    return { skipped: "not_configured" };
  }

  // Keep the ORIGINAL form index per photo — it is the per-photo idempotency
  // key on the FieldShot side (import_ref = `${idempotencyKey}#${index}`), so
  // it must not shift when an unsupported type is skipped.
  const eligible = args.photos
    .map((photo, index) => ({ photo, index }))
    .filter(({ photo }) => {
      const ok = FIELDSHOT_IMAGE_MIMES.has(photo.type.toLowerCase());
      if (!ok) {
        console.warn(
          `[contact] photo "${photo.filename}" type ${photo.type} not accepted by FieldShot — skipped`
        );
      }
      return ok;
    });
  if (eligible.length === 0) return { skipped: "no_photos" };

  const base = FIELDSHOT_URL!.replace(/\/$/, "");
  const headers = {
    "Content-Type": "application/json",
    "x-internal-secret": FIELDSHOT_LEAD_INGEST_SECRET!,
  };

  const signRes = await fetch(`${base}/api/lead-media/sign`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      orgId: FIELDSHOT_LEAD_ORG_ID,
      idempotencyKey: args.idempotencyKey,
      lead: {
        name: args.lead.name,
        ...(args.lead.street ? { street: args.lead.street } : {}),
        ...(args.lead.city ? { city: args.lead.city } : {}),
        ...(args.lead.state ? { state: args.lead.state } : {}),
        ...(args.lead.zip ? { zip: args.lead.zip } : {}),
      },
      jobber: {
        ...(args.jobber.clientId ? { clientId: args.jobber.clientId } : {}),
        ...(args.jobber.requestId ? { requestId: args.jobber.requestId } : {}),
        ...(args.jobber.propertyId ? { propertyId: args.jobber.propertyId } : {}),
      },
      photos: eligible.map(({ photo }) => ({ contentType: photo.type })),
    }),
  });
  if (!signRes.ok) {
    throw new Error(`fieldshot sign returned ${signRes.status}: ${(await signRes.text().catch(() => "")).slice(0, 200)}`);
  }
  const signed = (await signRes.json()) as SignResponse;
  if (!signed.uploads || signed.uploads.length !== eligible.length) {
    throw new Error(`fieldshot sign returned ${signed.uploads?.length ?? 0} uploads for ${eligible.length} photos`);
  }

  for (let i = 0; i < eligible.length; i++) {
    const { photo } = eligible[i];
    const upload = signed.uploads[i];
    const putRes = await fetch(upload.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": photo.type },
      body: photo.content,
    });
    if (!putRes.ok) {
      throw new Error(`storage PUT for "${photo.filename}" returned ${putRes.status}`);
    }
  }

  const finalizeRes = await fetch(`${base}/api/lead-media/finalize`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      orgId: FIELDSHOT_LEAD_ORG_ID,
      projectId: signed.projectId,
      idempotencyKey: args.idempotencyKey,
      items: eligible.map(({ photo, index }, i) => ({
        path: signed.uploads[i].path,
        index,
        filename: photo.filename,
      })),
    }),
  });
  if (!finalizeRes.ok) {
    throw new Error(
      `fieldshot finalize returned ${finalizeRes.status}: ${(await finalizeRes.text().catch(() => "")).slice(0, 200)}`
    );
  }

  return { forwarded: eligible.length, skipped: args.photos.length - eligible.length };
}
