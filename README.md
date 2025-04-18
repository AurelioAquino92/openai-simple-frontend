This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **Note:** This frontend application requires a backend server running at `http://localhost:8000` to function properly. Make sure your backend server is running before using the chat interface. You can find an example backend implementation at [openai-simple-backend](https://github.com/AurelioAquino92/openai-simple-backend).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Main Page Features

The main page (`app/page.tsx`) implements a modern chat interface with the following features:

- Real-time chat interface using AI SDK for React
- Markdown support for message content
- Auto-scrolling to the latest message
- Thinking animation while waiting for responses
- Responsive design with a clean, modern UI
- Input validation and disabled states
- Support for streaming text responses

The chat interface connects to a local API endpoint at `http://localhost:8000/ask` and supports:
- User and assistant message types
- Markdown formatting including lists, code blocks, and text styling
- Real-time message updates
- Input validation to prevent empty submissions

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
