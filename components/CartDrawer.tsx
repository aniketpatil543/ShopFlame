"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect } from "react";
import { ShoppingCart, X, Trash2, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-display font-bold text-xl text-gray-900">
            Your Cart
            {cartItems.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"})
              </span>
            )}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-100">
                <ShoppingCart
                  size={40}
                  className="text-orange-500"
                  strokeWidth={1.8}
                />
              </div>

              <p className="text-gray-500 font-medium">
                Your cart is empty
              </p>

              <p className="text-sm text-gray-400">
                Add some products to get started
              </p>

              <button
                onClick={onClose}
                className="btn-outline mt-2"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-orange-50/50 border border-orange-100"
                >
                  <div className="relative w-16 h-16 shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                    {/* <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    /> */}
                           <img
  src={item.image}
  alt={item.title}
  className="object-contain p-1"
/>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                      {item.title}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </span>

                        <span className="ml-2 text-sm font-bold text-orange-600">
                          $
                          {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">
                Total
              </span>

              <span className="text-2xl font-display font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2">
              Checkout
              <ArrowRight size={18} />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors text-center"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}