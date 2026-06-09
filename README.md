# 🚀 Merchant Dashboard - Alert Rules Management System

This is a modern, high-performance **Next.js** project optimized for managing merchant stores and automating multi-stage message notifications/alerts prior to lock expiration.

---

## 🛠️ Tech Stack & Key Features

* **Framework:** [Next.js (App Router)](https://nextjs.org/) for server-side rendering and routing.
* **State Management:** [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware to manage global store configurations seamlessly.
* **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) for efficient API caching, sync, and mutations.
* **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/) for fully responsive, slick dark/light theme component variations.
* **Form Inputs:** [React Phone Input 2](https://github.com/bluewebtech/react-phone-input-2) for robust country-code dropdown selection and validation.

---

## ⚡ Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed on your local machine.

### 2. Installation
Clone the repository and install the dependencies:


```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the Development Server
Execute one of the following commands to start the local server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

📁 Key Configurations Inside Project
🔔 Alert Rules System (/alerts/page.tsx)
Configures multi-stage automated message channels (WhatsApp, Email) based on dynamic trigger intervals (e.g., 30, 7, 3 days before expiry). It automatically synchronizes with the dynamic currentStore phone context for a smooth user experience.

🏪 Store Context Management (/store/useStoreContext.ts)
Uses Zustand to manage global reactive state for:

currentStoreId (Active store identification)

currentStore (Full object synchronization including merchant name & fallback contact numbers)

🚀 Build & Deployment
Production Build
To compile and optimize the application for production:

```
npm run build
```