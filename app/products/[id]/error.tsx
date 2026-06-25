"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle , RefreshCwIcon, ArrowLeft} from "lucide-react"

export default function ProductError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">
          Product not available
        </h2>
        <p className="text-gray-500 mb-8 text-sm">{error.message}</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary px-6 py-2.5 rounded-xl">
            <RefreshCwIcon className="w-5 h-5" />
            <span>Retry</span>
          </button>
          <Link href="/products" className="btn-outline px-6 py-2.5">
            <ArrowLeft className="w-5 h-5" />
            <span>All products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
