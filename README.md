# LinkGate
> *Because even a URL deserves privacy.*

**LinkGate** is a multi-role, access-controlled URL shortener built with **NestJS**, **Prisma**, and **PostgreSQL**.  
It supports public, private, and group-scoped links with fine-grained authorization enforced at the data layer.

---
## 💡 Motivation

LinkGate is built as a learning-driven backend project, focusing on:

- real authorization problems
- correct data modeling
- type safety without over-engineering
- pragmatic NestJS + Prisma usage
- Not a toy CRUD. Not a tutorial clone.

---

## 🚀 Features

- 🔗 URL shortening with collision-safe identifiers
- 🔐 Access control per URL:
  - `PUBLIC` – accessible by anyone
  - `PRIVATE` – accessible only by the owner
  - `GROUP` – accessible by members of a specific group
- 👥 Group system with roles and membership status
  - Owner / Admin / Member
  - Pending / Accepted / Rejected membership
- 🧠 Authorization enforced via Prisma queries (not post-filters)
- 📦 Clean service-oriented architecture (NestJS)
- 🗄️ PostgreSQL with Prisma ORM
- ✅ DTO validation using `class-validator`

---

## 🏗️ Tech Stack

- **Backend**: NestJS (TypeScript)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: class-validator
- **Auth (planned)**: JWT
- **Runtime**: Node.js

---

## 📐 Architecture Overview

```bash
src/
├── prisma/ # PrismaService, database access
├── user/ # User module
├── group/ # Group & membership logic
├── url/ # URL shortening & access control
├── utils/ # Shared utilities (hashing, ID generation)
└── generated/ # Prisma generated client
```

Key design decisions:
- Authorization logic is pushed **into Prisma queries**
- Services return **explicitly shaped data**, not raw models
- No global “god” services; dependencies are explicit

---

## 🧩 Data Model (High Level)

- **User**
- **Group**
- **GroupMembers**
  - role: `OWNER | ADMIN | MEMBER`
  - status: `PENDING | ACCEPTED | REJECTED`
- **Url**
  - access: `PUBLIC | PRIVATE | GROUP`
  - ownerId
  - optional groupId

---

## ⚙️ Setup & Development
Prerequisites
- Node.js ≥ 18
- PostgreSQL
- npm / pnpm / yarn

Install dependencies
```bash
npm install
```

Environment variables

Create a .env file:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/linkgate
```

Database setup
```bash
npx prisma migrate dev
npx prisma generate
```
Run the app
```bash
npm run start:dev
```