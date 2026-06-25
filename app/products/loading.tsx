"use client";

import {
  ShimmerThumbnail,
  ShimmerText,
  ShimmerButton,
} from "react-shimmer-effects";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <ShimmerText line={2} gap={10} />
      </div>

      <div className="mb-8 flex gap-3 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <ShimmerButton key={i} size="md" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-2xl p-4 bg-white"
          >
            <ShimmerThumbnail
              height={220}
            />

            <div className="mt-4">
              <ShimmerText line={3} gap={10} />

              <div className="flex justify-between items-center mt-4">
                <ShimmerButton size="sm" />
                <ShimmerButton size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}