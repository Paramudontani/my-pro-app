import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black text-black dark:text-zinc-50">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between gap-10 py-16 px-6 bg-white dark:bg-black sm:items-start rounded-2xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
        
        {/* App Title / Logo Text */}
        <div className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
          MY PRO APP
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
            Welcome to My Project
          </h1>
          <p className="max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            To get started, edit the{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              app/page.tsx
            </code>{" "}
            file and push your changes to GitHub.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full sm:w-auto sm:flex-row">
          <Link
            href="https://vercel.com/templates?framework=next.js"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full bg-black px-6 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-medium text-sm"
          >
            Explore Templates
          </Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 px-6 font-medium text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Documentation
          </a>
        </div>

      </main>
    </div>
  );
}
