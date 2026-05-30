# Saguaro Cabinetry and Design — Website (Launch Guide)

A complete 12-page, SEO-optimized website. Plain HTML/CSS/JS — no framework, no
database, no build step. Just upload the folder to a host and it's live.

**Domain:** https://saguarocabinets.com
**Phone:** (480) 540-1193  ·  **Instagram:** @saguarocabinetry
**License:** ROC #364785 · Bonded · Insured

---

## How to put it live on Netlify (about 5 minutes, free)

This site is pre-wired for **Netlify Forms**, so the contact form works
automatically once it's on Netlify — no extra setup, no third-party service.

1. Go to https://app.netlify.com and sign up / log in (free).
2. On the dashboard, choose **"Add new site" -> "Deploy manually."**
3. **Drag the entire unzipped `saguaro` folder** onto the upload area.
   (Drag the folder itself — the one containing `index.html` — not the .zip.)
4. Netlify gives you a temporary URL like `random-name.netlify.app`. The site is live.
5. **Connect the real domain:** Site configuration -> Domain management ->
   "Add a domain" -> enter `saguarocabinets.com`. Netlify shows the DNS records
   to set at the registrar (or transfer the domain to Netlify DNS).
   HTTPS is added automatically once DNS resolves.

### Where the leads go
- In Netlify: **Forms -> "contact"** shows every submission.
- Turn on notifications: Forms -> Settings -> **Form notifications** ->
  add an email (or Slack) so each new lead is emailed to you instantly.
- No API keys needed. (If the site is ever moved off Netlify, set
  `FALLBACK_EMAIL` in `assets/js/main.js` and the form will open the
  visitor's email app as a backup.)

*Other hosts work too (Cloudflare Pages, Vercel, cPanel hosting) — just upload the
folder. Only the automatic form capture is Netlify-specific.*

---

## Status — what's already done
- Real logo, favicon, and project photos (from the business's own posts)
- Brand green #557049 + gold + cream throughout
- Real phone number wired everywhere (click-to-call on mobile)
- Domain set to https://saguarocabinets.com (canonical, Open Graph, sitemap, robots)
- Contact email placeholder set to hello@saguarocabinets.com
- Lead form wired for Netlify Forms
- Real Google reviews on the Home and About pages
- ROC #364785 in the footer and FAQ
- Full SEO: titles, meta, Open Graph/Twitter cards, JSON-LD schema, sitemap.xml, robots.txt

## Confirm / finish before or right after launch
1. Email address — hello@saguarocabinets.com is assumed. If the real inbox is
   different, find/replace it across the .html files and in assets/js/main.js.
2. Business hours — currently Mon-Fri 8-5, Sat 9-2 (footer + Contact + schema). Edit if different.
3. Bathroom photos — the gallery is kitchens + custom/built-ins (no bathroom photo
   was available). Add real bathroom project photos when you have them.
4. After launch: set up a Google Business Profile, add the site to Google Search
   Console, and submit sitemap.xml.

## Editing tips
- Colors/fonts/spacing: variables at the top of assets/css/style.css (green #557049, gold #B8923F).
- Interactivity (menu, gallery lightbox, FAQ, form): assets/js/main.js.
- Each page is a standalone .html file you can edit by hand.
