# Arun Adhinath — Portfolio

React + TypeScript + Tailwind (Vite). No backend, no database.

```bash
npm install
npm run dev       # local dev
npm run build     # production build in dist/
npm run preview   # serve the build
```

## Editing content
- **Gallery:** `src/config/projects.ts` is the only file to touch. Each entry has `src`, `poster`, `title`, `categories`, `description`. Add, remove or reorder freely. `tools` is intentionally empty; add software names only once confirmed.
- **Personal details / resume text:** `src/config/site.ts`.
- **Resume PDF:** replace `public/resume/Arun-Adhinath-Resume.pdf`.

## Hosting large videos
The repo ships four optimized MP4s (about 50 MB) in `public/media/video`, which is fine for Netlify, Vercel or Cloudflare Pages. As the portfolio grows, host videos on a video service (Cloudinary, Bunny Stream, Mux, or S3 + CDN) and paste the URL into `src` and `poster` in `projects.ts`. Nothing else changes. Use H.264 MP4 with `+faststart` for the widest browser support.

## Optional extension: in-site uploads (not built)
An upload UI needs credentials and a server. To add one safely:
1. Create a Cloudinary account and an **unsigned or signed upload preset**.
2. Preferred: a tiny serverless function (Netlify/Vercel) that signs upload requests with the API secret, which stays server-side.
3. In the browser, upload directly to Cloudinary with progress (XHR), validate type and size first, then save the returned `secure_url` and `thumbnail_url` into a JSON store (e.g. a Git-backed file, Cloudinary metadata, or a small KV) that `projects.ts` reads.
Never put an API secret in frontend code.

## Contact form
There is no server. Submit validates, then opens a pre-filled email (`mailto:`) or WhatsApp message. It never claims a message was sent. To get real submissions, point the form at Formspree, Netlify Forms or a serverless function.

## Notes
- Hero video is muted, loops, pauses off-screen, has a pause button, and is replaced by a still poster under `prefers-reduced-motion` or on load error.
- Project pages use hash links, e.g. `/#/work/by-the-river`. Deep links never autoplay audio.
- Social links: add real URLs to `socials` in `site.ts`; none were supplied.
- Set a full URL for `og:image` in `index.html` once the domain is known.
