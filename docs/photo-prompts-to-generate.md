# Photo prompts to generate (service page heroes — illustrative)

These are AI-image-generation prompts for four service pages that currently lack hero photos (irrigation, tree-trimming/removal, stump-grinding/removal, bamboo-trimming/removal). Justin will generate them externally (DALL-E, Imagen, Midjourney, etc.) and drop the JPEGs into `public/photos/` with the filenames listed below; the manifest update is a follow-up small commit.

**Important:** alt text on these MUST end in "— illustrative" so it's transparent these aren't real Firsthand projects.

---

## 1. /services/irrigation

**Filename:** `public/photos/irrigation-illustration.jpg`
**Dimensions:** 1600 × 900 (16:9 landscape)
**Format:** JPEG, q82, EXIF stripped

**Prompt:**

> Photorealistic residential irrigation system in Central Florida front yard, sprinkler heads spraying water across lush green Bahia grass lawn, blue sky, palm trees, ranch-style stucco home in background, late afternoon golden light

**Proposed alt:**
> Residential irrigation system spraying water across a Central Florida front lawn — illustrative

---

## 2. /services/tree-trimming-removal

**Filename:** `public/photos/tree-trimming-illustration.jpg`
**Dimensions:** 1600 × 900
**Format:** JPEG, q82, EXIF stripped

**Prompt:**

> Photorealistic freshly trimmed mature oak tree canopy in Central Florida residential front yard, clean cuts visible on branches, well-manicured lawn below, ranch-style home in background, blue sky

**Proposed alt:**
> Freshly trimmed mature oak canopy over a Central Florida residential lawn — illustrative

---

## 3. /services/stump-grinding-removal

**Filename:** `public/photos/stump-grinding-illustration.jpg`
**Dimensions:** 1600 × 900
**Format:** JPEG, q82, EXIF stripped

**Prompt:**

> Photorealistic close-up of freshly ground tree stump with clean wood chip fill at ground level in residential Central Florida lawn, green grass surrounding, ranch home softly out of focus, golden hour

**Proposed alt:**
> Freshly ground stump with clean wood-chip fill in a Central Florida lawn — illustrative

---

## 4. /services/bamboo-trimming-removal

**Filename:** `public/photos/bamboo-illustration.jpg`
**Dimensions:** 1600 × 900
**Format:** JPEG, q82, EXIF stripped

**Prompt:**

> Photorealistic recently maintained bamboo privacy screen in Central Florida residential backyard, neat green bamboo culms against wooden fence, manicured grass at base, sunny day

**Proposed alt:**
> Maintained bamboo privacy screen in a Central Florida backyard — illustrative

---

## Manifest insert template (for the follow-up commit)

Add these entries at the TOP of the Ryan-curated section in `lib/photos-manifest.ts`, AFTER `sod-installation-ryan-1.jpg`. The `service-hero` role + matching `service` slug will cause `pickHero()` to land them on the right service page automatically.

```ts
{
  "src": "/photos/irrigation-illustration.jpg",
  "alt": "Residential irrigation system spraying water across a Central Florida front lawn — illustrative",
  "category": "irrigation",
  "area": "central-florida",
  "service": "irrigation",
  "role": "service-hero",
  "width": 1600,
  "height": 900,
  "bytes": 0  // fill in actual size after generation
},
{
  "src": "/photos/tree-trimming-illustration.jpg",
  "alt": "Freshly trimmed mature oak canopy over a Central Florida residential lawn — illustrative",
  "category": "tree",
  "area": "central-florida",
  "service": "tree-trimming-removal",
  "role": "service-hero",
  "width": 1600,
  "height": 900,
  "bytes": 0
},
{
  "src": "/photos/stump-grinding-illustration.jpg",
  "alt": "Freshly ground stump with clean wood-chip fill in a Central Florida lawn — illustrative",
  "category": "stump",
  "area": "central-florida",
  "service": "stump-grinding-removal",
  "role": "service-hero",
  "width": 1600,
  "height": 900,
  "bytes": 0
},
{
  "src": "/photos/bamboo-illustration.jpg",
  "alt": "Maintained bamboo privacy screen in a Central Florida backyard — illustrative",
  "category": "bamboo",
  "area": "central-florida",
  "service": "bamboo-trimming-removal",
  "role": "service-hero",
  "width": 1600,
  "height": 900,
  "bytes": 0
},
```

After generation:

1. Drop the four JPEGs into `public/photos/`.
2. Run `sips -g pixelWidth -g pixelHeight -g pixelHeight <file>` and `stat -f "%z" <file>` to grab final dims + bytes — paste into the manifest entries.
3. Commit: `feat(services): AI illustrations for 4 service page heroes`.
4. Optionally demote the existing service-hero entries for those four services (e.g. `stump-1.jpg` → `secondary`) so `pickHero` lands cleanly. Not strictly required since the new entries sit at the top of PHOTOS[] and win on array order.
