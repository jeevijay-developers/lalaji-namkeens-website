"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"
import { ArrowRight, TrendingUp } from "lucide-react"

interface MostSellingProps {
  products: Product[]
}

export function MostSelling({ products }: MostSellingProps) {
  const { language } = useLanguage()

  if (!products || products.length === 0) return null

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#1a5f5f]/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-[#1a5f5f]" />
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {language === "en" ? "Most selling products" : "सबसे ज्यादा बिकने वाले उत्पाद"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {language === "en" ? "Customer favorites this month" : "इस महीने ग्राहकों की पसंद"}
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="text-[#1a5f5f] hover:text-[#145050] font-semibold text-sm flex items-center gap-1 group self-start sm:self-auto"
          >
            {language === "en" ? "See more" : "और देखें"}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} showBadge />
          ))}
        </div>
      </div>
    </section>
  )
}
