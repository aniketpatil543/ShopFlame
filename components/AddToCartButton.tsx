"use client";

import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function AddToCartButton({ product, isOnCard }: { product: Product; isOnCard?: boolean }) {
  const { addToCart, cartItems, removeFromCart , deleteFromCart} = useCart();
  const [flash, setFlash] = useState(false);

  const inCart = cartItems.find((i) => i.id === product.id);

function handleAdd(
  e: React.MouseEvent<HTMLButtonElement>
) {
  e.preventDefault();
  e.stopPropagation();

  addToCart(product);

  setFlash(true);

  setTimeout(() => {
    setFlash(false);
  }, 1000);
}

  return (
    <div className="flex flex-col gap-3">
  {inCart ? (
    <div
      className={`flex items-center justify-between rounded-2xl bg-orange-500 text-white font-semibold ${
        isOnCard ? "py-1 px-2" : "py-3 px-4"
      }`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteFromCart(product.id);
        }}
        className="text-xl px-3 hover:scale-110 transition hover:cursor-pointer"
      >
        <Minus size={20} />
      </button>

      <span>{inCart.quantity}</span>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product);
        }}
        className="text-xl px-3 hover:scale-110 transition hover:cursor-pointer"
      >
        <Plus size={20} />
      </button>
    </div>
  ) : (
    <button
      onClick={handleAdd}
      className={`w-full rounded-2xl text-base font-bold transition-all duration-150
        hover:cursor-pointer
      ${
        flash
          ? "bg-green-500 text-white scale-[0.98]"
          : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl"
      }
      ${isOnCard ? "py-1 px-2" : "py-4"}`}
    >
      {flash ? "✓ Added to cart!" : "Add to cart"}
    </button>
  )}
</div>
  );
}
