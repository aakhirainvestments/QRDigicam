# Rayaan & Qudsiyyah — setup checklist

**Use a brand-new Supabase project and a brand-new Vercel project.** The app always shows the
newest row in `events`, so sharing a database with the bridal shower would hijack that site.

## Supabase (new project)
1. supabase.com -> New project (free tier is fine).
2. SQL Editor -> paste all of `supabase/schema.sql` -> Run.
3. Edit the commented `insert into events ...` at the bottom (date/time, admin key), uncomment, Run.
4. Project Settings -> API -> copy **Project URL** and **anon public** key.
5. Storage -> check a public bucket called `wedding-photos` exists (the schema creates it).

## GitHub + Vercel
1. Push this repo to GitHub (new repo, or a new branch of the old one).
2. Vercel -> New Project -> import it -> **Root Directory = `wedding-album`**.
3. Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (+ the optional Resend ones, see `.env.example`).
4. Deploy. Optional: add a custom domain under Domains.

## Before the day
- Open `<your-url>/host` **on the live URL** (not localhost), enter the admin key, and print the QR.
- Do a full test on a phone: join -> take a shot -> check the polaroid -> `/gallery` shows locked.
- To test the reveal, temporarily set `start_time` to the past, then set it back.
- Supabase free projects pause after ~1 week of inactivity — open the site a few days before.
