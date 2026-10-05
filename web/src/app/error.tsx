"use client";

import { Container } from "@/shared/components/ui/Container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="grid min-h-[80svh] place-items-center pt-32 text-center">
      <div>
        <h1 className="font-display text-6xl">Something broke.</h1>
        <p className="mt-4 text-muted">An unexpected error occurred. Please try again.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 rounded-full bg-gradient-to-r from-wine to-rose px-7 py-3.5 text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </Container>
  );
}
