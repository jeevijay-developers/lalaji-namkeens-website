"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { Package2, Plus, Flame } from "lucide-react"
import { AddToCartDialog } from "./add-to-cart-dialog"

interface ProductCardProps {
  product: Product
  showBadge?: boolean
}

export function ProductCard({ product, showBadge }: ProductCardProps) {
  const { language } = useLanguage()
  const [showAddDialog, setShowAddDialog] = useState(false)

  const minPrice =
    product.variants && product.variants.length > 0 ? Math.min(...product.variants.map((v) => v.price || 0)) : 0

  const firstVariant = product.variants?.[0]

  return (
    <>
      <div className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
        {/* Image */}
        <Link href={`/products/${product.slug}`} className="block relative">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden p-3 sm:p-4">
            {product.image_url ? (
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={language === "en" ? product.name_en : product.name_hi}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <Package2 className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300" />
            )}
          </div>

          {/* Bestseller badge */}
          {showBadge && (
            <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#E63946] text-white border-0 gap-1 text-xs px-2 py-0.5">
              <Flame className="h-3 w-3" />
              <span className="hidden xs:inline">{language === "en" ? "Best Seller" : "बेस्ट सेलर"}</span>
              <span className="xs:hidden">🔥</span>
            </Badge>
          )}
        </Link>

        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-2 hover:text-[#1a5f5f] transition-colors mb-1">
              {language === "en" ? product.name_en : product.name_hi}
            </h3>
          </Link>

          {firstVariant && (
            <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
              {language === "en" ? firstVariant.weight_label_en : firstVariant.weight_label_hi}
            </p>
          )}

          {/* Price */}
          <div className="mt-auto">
            {minPrice > 0 && (
              <div className="flex items-baseline gap-0.5 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">{minPrice}</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500">₹</span>
              </div>
            )}

            {/* Add button */}
            <Button
              onClick={() => setShowAddDialog(true)}
              className="w-full bg-[#e8f5e9] hover:bg-[#c8e6c9] text-[#1a5f5f] border-0 rounded-xl h-9 sm:h-11 font-medium transition-all text-xs sm:text-sm"
            >
              <Plus className="h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>

      <AddToCartDialog open={showAddDialog} onOpenChange={setShowAddDialog} product={product} />
    </>
  )
}
