import { getProduct } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import StarRating from "@/components/StarRating";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{
    id: string;
  }>;
};


export async function generateStaticParams() {
  return [];
}


export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const numId = Number(id);

  if (isNaN(numId)) {
    return {
      title: "Product Not Found",
    };
  }

  try {
    const product = await getProduct(numId);

    return {
      title: `${product.title} — ShopFlame`,
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const numId = Number(id);

  if (isNaN(numId)) {
    notFound();
  }

  let product;

  try {
    product = await getProduct(numId);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }

  const categoryColors: Record<string, string> = {
    electronics: "bg-blue-50 text-blue-700 border-blue-200",
    jewelery: "bg-purple-50 text-purple-700 border-purple-200",
    "men's clothing": "bg-green-50 text-green-700 border-green-200",
    "women's clothing": "bg-pink-50 text-pink-700 border-pink-200",
  };

  const badgeClass =
    categoryColors[product.category] ??
    "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link
          href="/"
          className="hover:text-orange-500 transition-colors"
        >
          Home
        </Link>

        <span>›</span>

        <Link
          href="/products"
          className="hover:text-orange-500 transition-colors"
        >
          Products
        </Link>

        <span>›</span>

        <Link
          href={`/products?category=${encodeURIComponent(
            product.category
          )}`}
          className="hover:text-orange-500 transition-colors capitalize"
        >
          {product.category}
        </Link>

        <span>›</span>

        <span className="text-gray-600 truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square max-h-[500px] flex items-center justify-center border border-gray-100">
          {/* <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-12"
          /> */}
                 <img
  src={product.image}
  alt={product.title}
  className="object-contain p-1"
/>
        </div>

        <div className="flex flex-col">
          <span
            className={`badge self-start border ${badgeClass} mb-4`}
          >
            {product.category}
          </span>

          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 leading-tight mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <StarRating
              rate={product.rating.rate}
              count={product.rating.count}
              size="md"
            />

            <span className="text-sm text-gray-400">
              {product.rating.count} reviews
            </span>
          </div>

          <div className="text-4xl font-display font-extrabold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 leading-relaxed text-base mb-8">
            {product.description}
          </p>

          <AddToCartButton product={product} />

          <Link
            href="/products"
            className="mt-4 text-sm text-center text-gray-400 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to all products
          </Link>
        </div>
      </div>
    </div>
  );
}