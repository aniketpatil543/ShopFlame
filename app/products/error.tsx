"use client";

import { useEffect } from "react";
import { AlertTriangle , RefreshCwIcon} from "lucide-react"

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Products error:", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="max-w-md mx-auto">
        <AlertTriangle className="text-6xl mb-6" />
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">
          Failed to load products
        </h2>
        <p className="text-gray-500 mb-2 text-sm">
          {error.message || "Something went wrong while fetching products."}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span>
                <RefreshCwIcon></RefreshCwIcon>
            </span>
          <button
            onClick={reset}
            className="btn-primary px-8 py-3 rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
