# ImagePass Frontend

Next.js frontend for ImagePass.

Allows users to upload an image and receive a deterministic password.

---

## Tech stack

- Next.js (App Router)
- React
- Typescript
- Tailwind CSS
- shadcn/ui

---

## Environment variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1/generate
````

---

## Run locally

```bash
bun install
bun dev
```

---

## Notes

* GIF uploads are blocked client-side
* Server still validates all uploads
* Fingerprint is shown for user verification