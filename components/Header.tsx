"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <span
                className="font-display font-bold text-xl tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors"
              >
                ShopFlame
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/products"
                className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
              >
                All Products
              </Link>
            </nav>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group hover:cursor-pointer"
              aria-label={`Open cart, ${itemCount} items`}
            >
                <ShoppingCart
  size={24}
  className="text-orange-600 group-hover:scale-110 transition-transform"
/>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-once">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
