import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "shopflame",
  description: "shopflame is a nextjs ecommerce app built with turborepo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-gray-100 py-8 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
                <span className="font-display font-semibold text-orange-500">ShopFlame</span>
                
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
