# Boxify - Custom Packaging Solutions

This is a web application for Boxify, a company specializing in custom printed boxes, mailers, and shipping solutions for businesses.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore & Authentication)
*   **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit)

## Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or later) installed on your machine.

### 2. Install Dependencies

Clone the repository and install the necessary packages.

```bash
npm install
```

### 3. Set Up Environment Variables

This project uses Firebase for its backend. You need to provide your Firebase project's configuration to connect to your instance.

Create a file named `.env.local` in the root of the project and add your Firebase configuration. You can get this from your Firebase project settings.

```
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```

The `src/firebase/config.ts` file is configured to use these environment variables.

### 4. Run the Development Server

Start the Next.js development server.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).
