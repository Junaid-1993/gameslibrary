# 🎮 GamesLibrary

> A full-stack web app for discovering, reviewing, and organizing video games with personalized libraries, wishlists, and stats.

---

## 📖 Overview

**GamesLibrary** is a feature-rich platform where gamers can:

- Discover and browse a wide range of video games.
- Create and manage custom game lists.
- Write reviews and rate games.
- Organize a wishlist and mark favorites.
- Track gaming stats, tags, and progress.
- Enjoy a responsive UI with dark/light modes and smooth animations.

Built using **Next.js**, **Tailwind CSS**, **TypeScript**, and **Prisma**, this app emphasizes personalization and community-style interaction.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
- **Backend**: [Next.js API Routes], [Prisma ORM](https://www.prisma.io/)
- **Database**: SQLite3 (development), PostgreSQL (production-ready)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Markdown Support**: [React Markdown](https://github.com/remarkjs/react-markdown)

---

## 🧪 Features

- 🔐 User authentication with profile and avatar
- 📋 Custom game lists with pinned favorites
- 📝 Game reviews with markdown and rating
- 📌 Wishlist and favorites tab
- 📊 Personalized game stats and dashboard
- 🧠 Game tags, notes, and private data
- 🎨 Fully responsive, dark/light mode support
- 🗃️ Admin-ready schema using Prisma

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/gameslibrary.git
cd gameslibrary

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

# Start the app
npm run dev
```
