# CATCH Bangladesh — Progress Log

Newest first. Each entry says what changed, the decisions behind it, and what is still open.

---

## 2026-10-06

### Changed

**Social links: Facebook only** (`src/components/layout/AppFooter.vue`, `src/views/ContactView.vue`, `src/data/contact.js`)
- The footer and the Contact page each showed five unlinked icons (Facebook, LinkedIn, Snapchat, Flickr, Instagram). Both now show only Facebook, linked to https://www.facebook.com/theyouthpeacenetwork/ (opens in a new tab).
- The URL lives in `CONTACT_HREF.facebook` in `src/data/contact.js` with the other contact links.
- The icon is now an inline SVG in the text colour: white in the footer, dark on the Contact page (turns brand red on hover). The old icon files were white, so on the Contact page's near-white card they were invisible.
- The LinkedIn, Snapchat, Flickr and Instagram SVGs are still in `src/assets/icons/social/`, unused.

---

## 2026-10-05

### Changed (later the same day)

**Youth Fact Finding – two-column layout from step 2** (`src/views/FactCheckerView.vue`, new `src/components/factchecker/ContentPreview.vue`)
- From step 2 (Emotion check) through the Recap, the page is two columns on desktop (from 1024px): the content being checked on the left, the form on the right. Step 1 and the Result stay single-column — the result card already shows the content.
- The left panel shows the uploaded image (whole image, not cropped), the link with its thumbnail and an "Open link ↗" button, or both. If nothing was attached, it shows "No image or link added" with a hint to go back to step 1. The content-type tag (Image, Video, …) sits next to the panel title.
- The panel stays in view (sticky) while the form scrolls on desktop. On phones and tablets it sits above the form.
- New copy `factChecker.preview` (bn + en): label, noAttachment, noAttachmentHint, openLink.
- Every step change (Next, Back, Check something else) now scrolls the page to the top. Before, the page kept its scroll position, so after a long step 1 the next step opened part-way down with its heading hidden.

### Open items
- Bangla wording needs sign-off: "আপনি যা যাচাই করছেন", "কোনো ছবি বা লিংক যুক্ত করা হয়নি", "লিংকটি খুলুন".

### Changed

**Learning-module PDFs replaced with the updated set** (from the team's Google Drive download, files dated 2026-10-04)
- All 9 PDFs in `public/learning-materials/` replaced, keeping the same file names, so `src/data/learningModules.js` is unchanged.
- Module 1 had been broken locally (the old file was removed before the code was updated); it loads again.
- Total size down from ~65 MB to ~44 MB (~4.9 MB each; old Module 7 was 26 MB).
- The Drive ZIP was deleted from `public/` so it is not deployed.

**New hero image** (`assets/landing page.pngss.png` → copied over `src/assets/photos/hero-bg.png`)
- Same size and composition as the previous illustration (2167×726, the 7 friends in the same place); the right side now has a red diagonal panel with a halftone pattern instead of the monument, flag and rickshaw.
- No layout or code change needed. Checked at 1440px and 500px widths.

### Open items
- Takes effect on the live site after the next push + Vercel deploy.

---

## 2026-10-01

### Changed

**Tool renamed: "Fact Checker" → "Youth Fact Finding"** (team's chosen name)
- Bangla: **ইয়ুথ ফ্যাক্ট ফাইন্ডিং** (transliterated, like the old "ফ্যাক্ট চেকার").
- Updated everywhere the tool is named: header CTA (desktop + mobile), "What we do" button, home intro eyebrow, wizard eyebrow, Help page back link, footer Platform link (was "Verify" / "যাচাই করুন"). English home CTA "Fact Check Now" → "Verify Now" (matches the Bangla "এখনই যাচাই করুন").
- URL is now `/youth-fact-finding`; `/fact-checker` redirects there so shared links/bookmarks keep working. Result-card download is now `catch-bangladesh-youth-fact-finding-<verdict>.png`.
- Not renamed (generic wording, not the tool's name): "A fact-checking and awareness building platform in Bangla", and the footer Modules link "Fact-Checking Tool" (points to Module 9 "Tools and techniques to verify").
- Internal code names (`factChecker` copy keys, `components/factchecker/`, route name) unchanged.

### Open items
- Confirm the Bangla form of the name: ইয়ুথ ফ্যাক্ট ফাইন্ডিং (transliteration) vs a translated form such as যুব তথ্য অনুসন্ধান.

---

## 2026-09-28

### Changed

**Partner logos (new `src/data/partners.js`, logos copied from `assets/Logos/` into `src/assets/logos/`)**
- One list of partners (ActionAid Bangladesh, SHED, EU) with logo, name, role label key and a per-logo height so the wide wordmark, square badge and flag+text logo look balanced. Used by the three places below.
- **Home – new "Co-powered by" section** (`src/components/home/PartnersSection.vue`) right after the stats bar (2nd section): heading + the three logos in a centred row (wraps on phones).
- **Hero** (`HeroSection.vue`): "Co-funding support" label + EU logo on a small white tile, in one compact row under the CTAs.
  - From 1280px the hero used to be a fixed height (the image's proportions). The Bangla copy already nearly filled it at ~1440px, so the extra row got clipped. The hero now grows when its content needs more height (`xl:overflow-visible` + 32px vertical padding); at 1440px it grows ~80px and the illustration is slightly larger/cropped on the pale left sky. At 1280px and 1920px it looks as before.
- **Footer** (`AppFooter.vue`): new "Our Partners" row above Get in Touch — each logo on a white tile with its role: Implemented by (ActionAid), Implementing partner (SHED), Co-funding support (EU). White tiles because the EU logo's blue text is unreadable on the dark footer.
- Copy in `src/i18n/content.js`: `hero.coFundingLabel` and a new `partners` block (bn + en).

- Follow-up (same day, user request): removed the white tiles behind the logos in the hero and footer — logos now sit directly on the illustration / dark footer. On the footer the EU logo's dark-blue text has low contrast; the EU's official white (negative) version of the logo would fix it.

### Open items
- Bangla wording needs sign-off: "যৌথ সহযোগিতায়" (Co-powered by), "আমাদের অংশীদার" (Our Partners), "বাস্তবায়নে" / "সহযোগী সংস্থা" / "সহ-অর্থায়ন সহায়তা".
- SHED's role label ("Implementing partner") is an assumption — confirm.
- EU visibility rules may require specific wording/size for the EU emblem; check against the grant's communication guidelines.

---

## 2026-09-23

### Changed

**Footer (`src/i18n/content.js`, `src/components/layout/AppFooter.vue`, `src/data/contact.js`)**
- Trimmed the footer columns to pages/actions that actually exist:
  - **Platform**: removed "Verification Archive" and "Trusted Sources" (unbuilt pages) — kept Home, Verify, Learning Materials.
  - **Help & Support**: removed "Report Suspicious Content", "I've Been Harmed — I Need Help", "Frequently Asked Questions" (unbuilt pages) — replaced with **Email Us** (`mailto:`) and **Emergency Call (999)** (`tel:999`, Bangladesh's national emergency line, already referenced on `/help`).
  - **About the Organization**: replaced "About Us / About the Project / Privacy Policy / Terms of Use" with a single **About ActionAid** link that opens `https://actionaidbd.org/` (ActionAid Bangladesh's own site) in a new tab.
- Wired up the remaining links so they are real, working navigation instead of plain text:
  - Platform → `/`, `/fact-checker`, `/learn`.
  - Modules → the three named modules now link to their detail pages (`/learn/introduction-to-information-disorder`, `/learn/deep-fake`, `/learn/tools-and-techniques-to-verify`); "View All Modules →" → `/learn`. Note: "Deepfake & Cheap Fake" covers two separate modules with no combined page, so it points at the Deep Fake module — flagged to the user, open to changing it to Cheap Fake instead.
- `CONTACT_HREF` (`src/data/contact.js`) gained `emergency` (`tel:999`) and `actionAidOfficial` (`https://actionaidbd.org/`).
- `AppFooter.vue` link rendering now branches three ways: plain string (not yet built), `{ label, href, external }` via `CONTACT_HREF` lookup (mailto/tel/external), or `{ label, to }` via `RouterLink` (internal routes) — kept backward compatible so future columns can stay plain text until they have somewhere to go.

**Deployment (`vercel.json`, new file)**
- Fixed a live-site 404 on the module PDF's "Full screen" button (`/learn/:slug/read`, opened as a real new-tab navigation). Vue Router runs in history mode and Vercel had no fallback, so any direct/new-tab load of a nested route 404'd. Added a catch-all rewrite to `index.html`; static files (JS/CSS/PDFs/images) are still served directly by Vercel's filesystem handling first, so this doesn't affect asset delivery. Takes effect on the next Vercel deploy.

### Decisions worth remembering
- Footer links stay plain (non-clickable) text until the page behind them actually exists — don't wire a link just to avoid a 404.
- "Deepfake & Cheap Fake" in the footer's Modules column is a judgment call (points at Deep Fake) — revisit if the user wants it changed.

---

## 2026-09-21

### Changed

**Copy**
- Confirmed every "Text should be" item in `assets/Feedback on factchecking website (1) (2).docx` is applied in the Bangla copy (`src/i18n/content.js`, `src/data/learningModules.js`). Two typos in the doc were deliberately not copied: "তোইরি" (kept "তৈরি") and the stray space before "।".

**Layout tokens (`src/style.css`)**
- `--page-gutter`: 42px, 156px from 1280px up. Used by the header, home/learn sections and the footer. (Tried 210px, reverted to 156px.)
- `rounded-button` = 8px (brand rule). Applied to every button and button-style link (28 elements).

**Footer**
- ActionAid logo at the left directly on the dark background, motto at the right. Logo and favicon now come from `assets/Logos/` (`src/assets/logo-actionaid.png`, `public/favicon.svg`, linked in `index.html`).

**Contact**
- Email and WhatsApp are links (`src/data/contact.js`: `mailto:` / `wa.me`). The office phone stays plain text on purpose — it is a range of lines (55044851-57), not one number.
- New two-column layout: message form (name, email, message, Send) beside the contact card. There is no backend, so Send opens the visitor's email app with the message pre-filled to `aab.mail@actionaid.org`.

**Hero (`src/components/home/HeroSection.vue`)**
- New illustration (`assets/hero image.png` → `src/assets/photos/hero-bg.png`). From 1280px the hero keeps the image's own proportions so it is never cropped; below that the image is a band above the text.
- Figma layout: slogan split into two red bars, "Learn about Myth vs Fact" + "Take the Pledge" buttons. Copy is vertically centred with 82px side padding (29px on phones).
- Title is fluid: 30px at 1280px up to 58px at 1488px and beyond (was 42px; 64px was tried and cut back to 58px so the second bar stays clear of the faces).

**Home – "What we do" scroll animation**
- Shortened the pin from ~230vh to ~80vh of scrolling, normalised the timeline with a hold on the last panel, and aligned the ScrollTrigger end to the sticky pin so it no longer feels stuck.

**Learning modules**
- Module PDFs are now rendered in-page with pdf.js (`src/components/learn/PdfViewer.vue`, `pdfjs-dist` legacy build, lazy-loaded) instead of the browser's own `<object>` viewer, which showed nothing on phones and in browsers set to download PDFs. Files and server were verified fine (all 9 parse; served as `application/pdf`).
- "Full screen" button opens `/learn/:slug/read` (`src/views/PdfReaderView.vue`, route meta `bare` = no header/footer) in a new tab.

### Decisions worth remembering
- Do not change image size or text size when asked only to change text placement.
- The phone number is never a `tel:` link.
- Figma is the source of truth for layout; where it conflicts with the 8px button rule, the 8px rule wins.

### Open items
- **Myth vs Fact page does not exist** — the hero button points to `/learn` for now. Bangla label "ভুল ধারণা বনাম সত্য জানুন" needs sign-off.
- Both "pledge" buttons do nothing.
- Contact form has no server: it relies on the visitor having an email app. A real endpoint (form service or ActionAid server) is still to be chosen.
- `module-7-clickbait.pdf` is 27 MB (one very large photo); compress before launch. All PDFs are 5–27 MB.
- English copy has not been synced with the revised Bangla wording (pillars section, intro).
- Social icons in the contact card are white on a light background (invisible).
- Fact-checker verdict logic (from the 2026-09-21 review, not yet changed): a skipped media check can give "Verified"; "no source found" gives "Misleading/Harmful" instead of "Needs verification"; harm-flagged result cards can embed the flagged image.
- Brand red has three values in play: `#f40000` (code), `#ED1C24` (`DESIGN_SYSTEM.md`), `#C62828` (checklist doc).
- Pages still missing from `PROJECT_CONTEXT.md`: community archive, trusted sources, FAQ, admin, myth vs fact, report. Footer links and social icons are not linked yet.

### How this was checked
Headless Edge screenshots at 500 / 800 / 1100 / 1280 / 1440 / 1488 / 1920px, pdf.js render checks on modules 1, 6 and 7, and a production build (`vite build`). The Claude Chrome extension was not connected, so nothing was checked in Chrome itself.
