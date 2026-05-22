/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Read from env first so Vercel preview deploys use their own canonical
  siteUrl: process.env.SITE_URL || "https://firsthand-website.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/contact/thanks", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/contact/thanks"] },
    ],
  },
  transform: async (config, path) => {
    // Bump priority for high-value pages
    const HIGH_VALUE = new Set([
      "/",
      "/contact",
      "/portfolio",
      "/financing",
      "/services/lawn-maintenance",
      "/services/landscape-design",
      "/services/sod-installation",
      "/services/irrigation",
      "/service-areas/winter-park",
      "/service-areas/orlando",
      "/service-areas/windermere",
      "/service-areas/bay-hill",
      "/service-areas/college-park",
      "/blog",
    ]);
    // Blog posts get priority 0.8 — between top-level (1.0) and stub pages (0.7)
    if (path.startsWith("/blog/")) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: HIGH_VALUE.has(path) ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
