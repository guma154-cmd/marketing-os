"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 text-zinc-50 p-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-500">Opa! Algo deu errado.</h1>
      <p className="text-zinc-400 mb-8 max-w-md">
        Ocorreu um erro inesperado no processamento desta página.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-bold border border-zinc-700"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
