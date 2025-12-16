# Boxify - Custom Packaging Solutions

This is a web application for Boxify, a company specializing in custom printed boxes, mailers, and shipping solutions for businesses. This document serves as a user manual for setting up and running the project locally.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore & Authentication)
*   **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit) for AI flows.

---

## Local Development Setup

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

*   **Node.js**: Ensure you have Node.js version 18 or later installed.
*   **Firebase Project**: You must have a Firebase project created. If you don't have one, create a new project at the [Firebase Console](https://console.firebase.google.com/).
*   **Enable Firestore**: Within your Firebase project, navigate to **Firestore Database** and create a database. Start in **test mode** for initial development to allow writes.

### 2. Clone the Repository

Clone this repository to your local machine using your preferred method (HTTPS or SSH).

```bash
git clone <repository-url>
cd <repository-folder>
```

### 3. Install Dependencies

Install the project's dependencies using npm.

```bash
npm install
```

### 4. Set Up Environment Variables

This project uses Firebase for its backend and requires environment variables to connect to your instance.

**a. Get Your Firebase Configuration:**
1.  Go to the [Firebase Console](https://console.firebase.google.com/) and select your project.
2.  Click the gear icon next to "Project Overview" and go to **Project settings**.
3.  In the "General" tab, scroll down to the "Your apps" section.
4.  If you haven't already, create a new Web App (`</>`).
5.  Find your web app and click on the **SDK setup and configuration** section, then select **Config**.
6.  This will display a `firebaseConfig` object. You will need these values.

**b. Create the `.env.local` file:**
Create a file named `.env.local` in the root directory of the project. Copy and paste the following content into it, replacing `"YOUR_..."` values with the corresponding keys from your Firebase project's `firebaseConfig`.

```
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```

The `src/firebase/index.ts` file is configured to use these environment variables.

### 5. Run the Development Server

Start the Next.js development server. The `--turbopack` flag is used for faster development, and the app will run on port `9002`.

```bash
npm run dev
```

The application will be available at **[http://localhost:9002](http://localhost:9002)**.

### 6. Using Genkit for AI Features

If you intend to work with the AI features powered by Genkit, you will need to run the Genkit development server separately.

```bash
# This will start the Genkit server and watch for changes in your AI flows
npm run genkit:watch
```
