"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface CategoryFilterProps {
  categories: string[];
}


export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "";

  const select = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (cat === "" || cat === current) {
        params.delete("category");
      } else {
        params.set("category", cat);
      }
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams, current]
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => select("")}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 border-2 
           hover: cursor-pointer
          ${
          current === ""
            ? "bg-orange-500 border-orange-500 text-white shadow-sm"
            : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 bg-white"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => select(cat)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 border-2 
             hover: cursor-pointer
            ${
            current === cat
              ? "bg-orange-500 border-orange-500 text-white shadow-sm"
              : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
