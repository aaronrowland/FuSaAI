# Criticality Consulting Site Improvement Plan

This plan addresses the commercial, content, accessibility, responsive-design and discoverability issues identified in the July 2026 site review.

## Implementation status

- **Completed locally:** consultancy proposition, concrete AI applications, engagement types, a dedicated insights page, permanent technical-note routes, legacy Fieldnote redirects, browser history, accessible article links, mobile-menu semantics, keyboard focus treatment, reduced-motion support, responsive diagram, responsive spacing, favicons, social-card asset, structured data and pre-rendered article metadata.
- **Awaiting business details:** contact email, removal of the contact placeholder, consultant profile, LinkedIn URL and any registered-company information.
- **Awaiting final domain:** set `SITE_URL` in the production build environment to generate absolute canonical URLs, `sitemap.xml` and the sitemap entry in `robots.txt`.
- **Still required before launch:** production Cloudflare route testing, final domain metadata validation and a final deployed Lighthouse review.

## Phase 1 — Remove launch blockers

- Replace `hello@example.com` with the consultancy's real email address.
- Remove the visible placeholder warning from the contact section.
- Add a concise founder or consultant profile covering:
  - Semiconductor design background
  - Functional safety experience
  - Applied AI experience
  - Relevant standards and technical areas
  - Location and availability
  - LinkedIn profile, if appropriate
- Add appropriate company information to the footer:
  - Registered company name, if applicable
  - UK location
  - Contact email
  - Privacy notice

### Required input

- Preferred contact email address
- Profile details and credentials suitable for publication
- Company registration details, if they should be displayed
- LinkedIn URL, if it should be included

### Completion criteria

- Every contact action uses a real address.
- No placeholder or pre-launch messaging is visible.
- A prospective customer can identify who is behind the consultancy and why their experience is relevant.

## Phase 2 — Strengthen the consultancy proposition

- Add a compact "Why Criticality" section centred on the combination of:
  - Semiconductor design knowledge
  - Functional safety engineering
  - Applied AI capability
- Replace abstract AI claims with concrete applications, including:
  - Cross-document consistency analysis
  - FMEDA and safety-assumption change-impact analysis
  - Source-linked evidence retrieval and review preparation
- Add clear engagement types:
  - Independent technical review
  - Architecture and FMEDA support
  - Evidence and integration review
  - AI workflow assessment or pilot
- State that customer information remains controlled and AI outputs remain subject to engineering review.

### Completion criteria

- The homepage clearly explains why the combination of skills is unusual and valuable.
- A prospective customer can recognise at least one relevant engagement or AI use case.
- The language does not imply that AI replaces engineering judgement.

## Phase 3 — Create permanent insights routes

- Add React Router or a suitably lightweight routing equivalent.
- Give each technical note a permanent URL, for example:
  - `/insights/fmeda-customer-boundary/`
  - `/insights/diagnostic-coverage-evidence/`
  - `/insights/ip-to-soc-assumptions/`
- Preserve legacy `/fieldnotes/...` URLs as redirects.
- Make browser back and forward navigation work correctly.
- Ensure direct visits and page refreshes work on Cloudflare.
- Convert Fieldnote cards into genuine links.
- Preserve the existing Fieldnote visual design.

### Completion criteria

- Every Fieldnote is shareable and bookmarkable.
- Direct Fieldnote URLs work after a browser refresh.
- Browser navigation behaves normally.
- No article relies solely on in-memory React state.

## Phase 4 — Accessibility and interaction

- Remove the nested interactive control from the featured Fieldnote.
- Convert all Fieldnote cards to semantic links.
- Add `aria-expanded` and `aria-controls` to the mobile menu.
- Close the mobile menu after navigation and when Escape is pressed.
- Add clearly visible keyboard-focus styling.
- Verify logical heading order.
- Support keyboard-only navigation throughout the site.
- Respect `prefers-reduced-motion` for smooth scrolling and transitions.
- Check text and control contrast against WCAG AA.

### Completion criteria

- All navigation and Fieldnotes are usable without a mouse.
- There are no nested interactive elements.
- Focus is always visible.
- Mobile-menu state is correctly announced to assistive technology.

## Phase 5 — SEO and social sharing

- Add unique page titles and descriptions for every Fieldnote.
- Add canonical URLs using the final production domain.
- Add Open Graph and social-sharing metadata.
- Create a branded social-preview image.
- Add structured data for the consultancy and Fieldnote articles.
- Add:
  - `sitemap.xml`
  - `robots.txt`
  - Favicons
  - Web app icons
- Confirm that the final production domain is used consistently.

### Dependency

- The final public domain must be selected before canonical URLs and production social metadata are completed.

### Completion criteria

- Search engines can discover the homepage and every Fieldnote.
- Shared links show the correct title, description and branded image.
- Metadata contains no temporary or development URLs.

## Phase 6 — Responsive visual refinement

- Create a simplified mobile SoC diagram with fewer labels and larger text.
- Retain the detailed diagram on tablet and desktop.
- Adjust the caption so the diagram is clearly an example of technical work, rather than a depiction of the entire safety lifecycle.
- Reduce excessive mobile vertical spacing in:
  - Expertise
  - Fieldnotes
  - Approach
  - Contact
- Test at 390 px, 768 px, 1024 px and 1440 px widths.

### Completion criteria

- Diagram labels remain legible on mobile.
- The page retains its editorial character without feeling excessively long.
- No content overlaps or causes horizontal scrolling at the target widths.

## Phase 7 — Final launch QA

- Run the production build and formatting checks.
- Test navigation, Fieldnote routes and contact links.
- Review desktop and mobile layouts visually.
- Test keyboard navigation and focus order.
- Check for console errors and broken links.
- Validate metadata and structured data.
- Test direct Fieldnote URLs on Cloudflare.
- Run a basic Lighthouse review.
- Commit and push the completed release to `main`.

### Completion criteria

- The production build passes.
- No known broken links, placeholder content or console errors remain.
- Direct routes work in the deployed Cloudflare environment.
- The final deployed site passes the agreed visual and functional checks.

## Recommended implementation order

1. Contact details and consultant credibility
2. Consultancy proposition and concrete AI use cases
3. Permanent Fieldnote routing
4. Accessibility and interaction fixes
5. SEO and social metadata
6. Responsive visual refinement
7. Production QA and deployment

This sequence establishes commercial credibility first, then improves sharing, accessibility, discoverability and presentation without destabilising the existing visual identity.
