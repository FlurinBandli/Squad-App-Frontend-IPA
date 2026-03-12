# FC Zürich-Leutschenbach Frontend

This project is a web application for managing and displaying football squads. Squads can be created and managed in a protected admin area and shared
with external users via a public link.

The frontend is built with Next.js and communicates with an existing NestJS backend via a REST API.

## Tech Stack

- Next.js
- TypeScript
- NextAuth
- shadcn/ui
- Tailwind CSS

## Requirements

- Node.js v20
- npm
- Running Nest.js backend (API)

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a .env file based on the provided example:

```bash
cp .env.example .env
```

3. Adjust the values if necessary (API URL, credentials).

## Running the project

Start the development server:

```bash
npm run dev
```

Open the application in your browser at [http://localhost:3000](http://localhost:3000)
