## How I made this

1. `npx create-t3-app@latest`
1. Set-up database
   1. Create new Supabase project and copy the URI
   1. change db provider to postgresql in `schema.prisma`
   1. put db URI in .env
   1. `npx prisma db push`
1. Set-up GitHub OAuth
   1. Register new OAuth App on GitHub and generate secret token (dev and prod)
   1. Change 'Discord' to 'Github' in `src/env.mjs` and `src/server/auth.ts`
   1. Generate NextAuth secret and save in .env
   1. Save GitHub client id and secret in .env (dev and prod)
1. Deploy to Vercel
   1. Push repo to GitHub
   1. Login on Vercel.com and create new project from repo
   1. Add environment variables to project on Vercel and deploy
1. Add UI
   1. install daisyui and @tailwindcss/typography
1. Add tables to database
   1. add topic and note models in prisma schema
   1. `npx prisma db push`

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
