# Acme Commerce

Acme Commerce is a modern, fully-featured e-commerce web application built with the latest web technologies. It provides users with an intuitive shopping experience, offering product browsing, reviews, and a seamless auth process.

## Demo 🎥

Check out the live demo of Acme!

[Demo](https://acme-commerce-beta.vercel.app/)

Feel free to explore and interact with the store's features.

## Tech-stack ⚡

Acme Commerce is built with a modern stack to deliver a top-notch e-commerce experience:

- React & Next.js ⚛️: Dynamic, server-side rendered UIs.
- [Tailwind CSS](https://tailwindcss.com/) 🌈: Utility-first styling for fast development.
- [Storybook](https://storybook.js.org/) 📖: Develop and test UI components in isolation.
- [Supabase](https://supabase.com/) 🔒: Authentication and backend services.
- [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/) 🧪: For reliable testing and bug-free code.
- TypeScript 💻: Type safety for smoother development.
- [HeroUI](https://www.heroui.com/) 🎨: A design system for consistent UI components.
- [Next-Intl](https://next-intl.dev/) 🌍: For internationalization and localization support.
- [React Hook Form](https://react-hook-form.com/) 📝: For easy and performant form handling.

## Prerequisites 🛠️

Before setting up the project, ensure you have the following installed and configured:

### Required Tools

- Node.js version 18.20.4 or higher. Check your Node.js version:

```bash
node --version
```

- pnpm package manager. Verify installation:

```bash
pnpm --version
```

If pnpm is not installed, you can install it globally by running:

```bash
npm install -g pnpm
```

### External Services

- Supabase Account: Sign up for a free-tier account at [Supabase](https://supabase.com/) and create a project.
- reCAPTCHA v3: Obtain API keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin/site/716490403).

## Supabase Setup ⚡

### Create a Supabase Project

Sign up for a free-tier account at Supabase and create a new project.

### Get API Keys

Once your project is created, go to Project Settings > API and retrieve the following keys:

- Supabase URL → `NEXT_PUBLIC_SUPABASE_URL`
- Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Add these to your .env.local file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Set Up Email Templates

For a better user experience, you can customize your [Magic Link and Sign-up Confirmation](https://supabase.com/dashboard/project/_/auth/templates) emails using the [templates](./templates/) provided in this repository.

## Getting Started ⚙️

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/anilkaraabali/acme-commerce.git
cd acme-commerce
```

Then, install the project dependencies:

```bash
pnpm install
```

### Start the development server 🚀

Now, you can start the development server:

```bash
pnpm dev
```

#### Permissions Issue (If Occurs After Running pnpm dev) ⚠️

If you encounter the following error during the development server startup:

```bash
sh: ./scripts/merge-products/run.sh: Permission denied
sh: ./scripts/merge-all-products/run.sh: Permission denied
```

You can resolve it by changing the permissions of the script to make it executable:

```bash
chmod +x ./scripts/merge-products/run.sh
chmod +x ./scripts/merge-all-products/run.sh
```

Then, re-run the development server:

```bash
pnpm dev
```

## Running Tests 🧪

This project uses Vitest for running unit tests.

To run the tests, use the following command:

```bash
pnpm test
```

This will run all the tests in the project and output the results in the terminal.

### Running Tests in Watch Mode 👀

If you want to run the tests continuously as you make changes, you can use the following command:

```bash
pnpm test:watch
```

This will watch for changes to your test files and automatically rerun the tests.

### Running Tests with Coverage 📊

To run the tests with coverage reports, use:

```bash
pnpm test:coverage
```

This will generate a code coverage report that shows how much of your code is covered by tests.

## TypeScript Validation 🛠️

To check for TypeScript errors in your project, you can run:

```bash
pnpm validate-types
```

This will use the TypeScript compiler to validate your types and show any errors or warnings related to type issues in your code.

## Storybook 📚

To start Storybook for viewing UI components, run the following command:

```bash
pnpm storybook
```

This will start Storybook, allowing you to interact with the components in isolation.
