# Criticality Consulting

An editorial website for an independent semiconductor functional-safety consultancy. It combines a consultancy proposition, specialist service areas and substantive technical insights.

## Run locally

```bash
npm install
npm run dev
```

## Production metadata

Set `SITE_URL` to the final public origin when building for production:

```bash
SITE_URL=https://example.com npm run build
```

The build creates static HTML entry points for the insights index and every technical note. When `SITE_URL` is set it also adds absolute canonical and social URLs, generates `sitemap.xml`, and adds the sitemap location to `robots.txt`. Legacy `/fieldnotes/...` URLs redirect to their corresponding `/insights/...` pages.

## Positioning

The consultancy is expert-led. AI support is positioned as a bounded method for evidence retrieval, comparison and review preparation—not as an autonomous safety decision-maker.
