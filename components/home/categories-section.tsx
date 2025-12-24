"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import type { Category } from "@/lib/types"
import { ArrowRight } from "lucide-react"

interface CategoriesSectionProps {
  categories: Category[]
}

const categoryIcons: Record<string, string> = {
  bhujia: "🥜",
  mixture: "🍿",
  namkeen: "🥨",
  sweets: "🍬",
  chips: "🥔",
  papad: "🫓",
  default: "🥘",
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const { language } = useLanguage()

  if (!categories || categories.length === 0) return null

  return (
    <section className="bg-[#f8f8f8] py-8 sm:py-10 lg:py-12">
      {/* Added max-w-7xl and mx-auto for proper centering on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto sm:overflow-x-visible sm:flex-wrap gap-3 sm:justify-center pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group min-w-[160px] sm:min-w-0">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-xl sm:text-2xl">{categoryIcons[category.slug] || categoryIcons.default}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 whitespace-nowrap">
                    {language === "en" ? category.name_en : category.name_hi}
                  </h3>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {language === "en" ? "Shop now" : "अभी खरीदें"}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* See all button */}
          <Link href="/products">
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3 bg-[#d4e157] rounded-xl hover:bg-[#c0ca33] transition-all cursor-pointer group h-full min-w-[140px] sm:min-w-0">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-white/40 flex items-center justify-center flex-shrink-0">
                <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 text-gray-900 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-semibold text-sm text-gray-900 whitespace-nowrap">
                {language === "en" ? "See all" : "सभी देखें"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
