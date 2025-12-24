"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"
import { ArrowRight } from "lucide-react"

interface FeaturedProductsProps {
  products: Product[]
  title?: { en: string; hi: string }
  subtitle?: { en: string; hi: string }
}

export function FeaturedProducts({ products, title, subtitle }: FeaturedProductsProps) {
  const { language } = useLanguage()

  if (!products || products.length === 0) return null

  const defaultTitle = { en: "You might need", hi: "आपको चाहिए होगा" }
  const defaultSubtitle = { en: "Popular products you'll love", hi: "लोकप्रिय उत्पाद जो आपको पसंद आएंगे" }

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-2">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {language === "en" ? title?.en || defaultTitle.en : title?.hi || defaultTitle.hi}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {language === "en" ? subtitle?.en || defaultSubtitle.en : subtitle?.hi || defaultSubtitle.hi}
            </p>
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
