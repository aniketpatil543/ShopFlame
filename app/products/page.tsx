import { Suspense } from "react";
import { getProducts, getProductsByCategory, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

export const revalidate = 60;

export async function generateMetadata({ searchParams }: Props) {
  const { category: cat } = await searchParams;
  return {
    title: cat ? `${cat} — ShopFlame` : "All Products — ShopFlame",
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const [products, categories] = await Promise.all([
    category ? getProductsByCategory(category) : getProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-1">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Products"}
        </h1>
        <p className="text-gray-500 text-sm">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <Suspense fallback={<div className="h-10 skeleton w-96" />}>
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-5xl mb-4">📦</p>
          <p className="font-medium">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
