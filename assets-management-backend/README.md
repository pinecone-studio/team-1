# OpenNext Starter

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Read the documentation at https://opennext.js.org/cloudflare.

## Develop

Run the Next.js development server:

```bash
npm run dev
# or similar package manager command
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Preview

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Deploy

Deploy the application to Cloudflare:

```bash
npm run deploy
# or similar package manager command
```

### Internal Server Error after deploy

1. **Health check** — Worker ажиллаж байгаа эсэхийг шалгах:
   - `GET https://<your-worker>.workers.dev/api/health`
   - 200 + `{"ok":true,...}` ирвэл Worker OK; 500 бол бусад алдаа.

2. **D1 remote** — Ихэвчлэн D1 хүснэгт байхгүй эсвэл migration ажиллаагүй:
   - Remote D1 дээр schema байрлуулах: `npx wrangler d1 migrations apply team_one --remote`
   - Эсвэл Drizzle-аар push хийсэн бол Cloudflare D1-д хүснэгтүүд (migrations эсвэл push) remote дээр хийгдсэн эсэхийг шалгана.

3. **Лог (500-ийн шалтгаан олох)** — Яг ямар алдаа гарсныг харах:
   - Терминал 1: `cd assets-management-backend && npx wrangler tail`
   - Терминал 2 эсвэл браузер: `https://my-next-app....workers.dev/api/health` дуудна
   - Терминал 1-д гарсан улаан текст (exception message, stack) — энэ нь 500-ийн шалтгаан.

4. **Локалд ажиллуулж шалгах** — Deploy-оос өмнө Worker-ийг локалд ажиллуулах:
   - `npm run preview` → дараа нь `http://localhost:8787/api/health` нээх
   - Энд ч 500 гарвал алдаа нь кодын/build талдаа; 200 бол deploy орчин (binding, env) талдаа.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
