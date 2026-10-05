# BAZA Bot v0.1

Discord bot for the BAZA gaming platform.

## Stack

- Node.js
- TypeScript
- discord.js
- Railway

## Commands

/help
/profile
/stats
/servers
/play
/events
/leaderboard
/report

## Local setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Fill in Discord credentials.
5. Run `npm run register`.
6. Run `npm run dev`.

## Railway

Connect the GitHub repository to Railway.

Variables:

- DISCORD_TOKEN
- DISCORD_CLIENT_ID
- DISCORD_GUILD_ID

Build command:

`npm run build`

Start command:

`npm start`

Do not commit `.env`.
