"use client";

import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, cartItems } = useCart();
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
      <button
        onClick={handleAdd}
        className={`w-full py-4 rounded-2xl text-base font-bold transition-all duration-150 ${
          flash
            ? "bg-green-500 text-white scale-[0.98]"
            : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        {flash
          ? "✓ Added to cart!"
          : inCart
          ? `Add again (${inCart.quantity} in cart)`
          : "Add to cart"}
      </button>
      {inCart && (
        <p className="text-center text-sm text-orange-600 font-medium">
          🛒 You have {inCart.quantity} of this item in your cart
        </p>
      )}
    </div>
  );
}
