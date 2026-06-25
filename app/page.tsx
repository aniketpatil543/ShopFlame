import Link from "next/link";
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <section className="py-20 md:py-28 text-center">
       
        <h1 className="font-display font-extrabold text-5xl md:text-7xl text-gray-900 leading-[1.05] tracking-tight mb-6">
          Shop smarter,<br />
          <span className="text-orange-500">not harder.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Electronics, jewellery, clothing — curated products with real reviews and honest prices.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="btn-primary text-base px-8 py-3.5 rounded-xl text-black">
            Browse all products
          </Link>
          <span>
            <ArrowRight></ArrowRight>
          </span>
        </div>
      </section>
    
    </div>
  );
}
