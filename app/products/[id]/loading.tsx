"use client";

import {
  ShimmerButton,
  ShimmerText,
  ShimmerThumbnail,
} from "react-shimmer-effects";

export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="flex flex-wrap items-center gap-3 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <ShimmerButton size="sm" />
            {i < 3 && (
              <span className="text-gray-300 text-lg font-light">/</span>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="rounded-3xl overflow-hidden">
          <ShimmerThumbnail
            height={500}
          />
        </div>


        <div className="flex flex-col gap-5">

          <ShimmerButton size="sm" />

  
          <ShimmerText line={2} gap={10} />

  
          <ShimmerButton size="sm" />

  
          <ShimmerButton size="md" />

    
          <ShimmerText line={4} gap={8} />

          <div className="pt-4">
            <ShimmerButton size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}