import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import AddToCartButton from "./AddToCartButton";
import StarRating from "./StarRating";


export default function ProductCard({ product }: { product: Product }) {


  const categoryColors: Record<string, string> = {
    electronics: "bg-blue-50 text-blue-700",
    jewelery: "bg-purple-50 text-purple-700",
    "men's clothing": "bg-green-50 text-green-700",
    "women's clothing": "bg-pink-50 text-pink-700",
  };
  const badgeClass = categoryColors[product.category] ?? "bg-gray-100 text-gray-600";

  return (
    <Link href={`/products/${product.id}`} className="card group block overflow-hidden">

      <div className="relative h-52 bg-gray-50 overflow-hidden">
        {/* <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        /> */}
       <img
  src={product.image}
  alt={product.title}
  className="object-contain w-full h-full p-6"
/>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <span className={`badge self-start ${badgeClass}`}>
          {product.category}
        </span>

        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.title}
        </h3>

        <StarRating rate={product.rating.rate} count={product.rating.count} />

        <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
          <span className="text-lg font-display font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <AddToCartButton product={product} 
           isOnCard={true}
          />
        </div>
      </div>
    </Link>
  );
}
