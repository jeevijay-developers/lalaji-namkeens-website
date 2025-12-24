"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Product, ProductVariant, CartItem } from "@/lib/types"
import { addToCart } from "@/lib/cart-storage"
import { Minus, Plus, ShoppingCart, Package2, Star, Flame, Heart, Share2, Clock } from "lucide-react"

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { language } = useLanguage()
  const router = useRouter()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product.variants?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock multiple images (in real app, product would have images array)
  const productImages = [product.image_url, product.image_url, product.image_url, product.image_url].filter(Boolean)

  const handleAddToCart = () => {
    if (!selectedVariant) return

    const cartItem: CartItem = {
      product_id: product.id,
      variant_id: selectedVariant.id,
      product_name_en: product.name_en,
      product_name_hi: product.name_hi,
      variant_label_en: selectedVariant.weight_label_en,
      variant_label_hi: selectedVariant.weight_label_hi,
      quantity,
      unit_price: selectedVariant.price,
      total_price: selectedVariant.price ? selectedVariant.price * quantity : undefined,
      product,
      variant: selectedVariant,
    }

    addToCart(cartItem)
    window.dispatchEvent(new Event("cart-updated"))
    router.push("/cart")
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left - Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
            {/* Discount badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-[#1a365d] text-white px-4 py-2 rounded-full text-center">
                <div className="text-xl font-bold">10%</div>
                <div className="text-xs uppercase tracking-wide">Discount</div>
              </div>
            </div>

            {/* Wishlist button */}
            <button className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
            </button>

            {product.image_url ? (
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={language === "en" ? product.name_en : product.name_hi}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <Package2 className="h-32 w-32 text-gray-300" />
            )}
          </div>

          {/* Thumbnail images */}
          {productImages.length > 1 && (
            <div className="flex gap-3 justify-center">
              {productImages.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-[#1a5f5f] ring-2 ring-[#1a5f5f]/20" : "border-gray-200"
                  }`}
                >
                  <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-contain bg-gray-50 p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col">
          {/* Timer badge */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Clock className="h-4 w-4 text-[#1a5f5f]" />
            <span className="font-medium">{language === "en" ? "Limited time offer" : "सीमित समय का ऑफर"}</span>
          </div>

          {/* Category */}
          {product.category && (
            <p className="text-sm text-muted-foreground mb-1">
              {language === "en" ? product.category.name_en : product.category.name_hi}
            </p>
          )}

          {/* Title */}
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {language === "en" ? product.name_en : product.name_hi}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-[#FFB800] text-[#FFB800]" />
              <span className="font-semibold">4.5</span>
              <span className="text-sm text-muted-foreground">(15 {language === "en" ? "reviews" : "समीक्षाएं"})</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-[#E63946]">
              <Flame className="h-4 w-4" />
              <span>100 {language === "en" ? "sold in last 24 hours" : "पिछले 24 घंटों में बिके"}</span>
            </div>
          </div>

          {/* Price */}
          {selectedVariant?.price && (
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-gray-900">{selectedVariant.price}</span>
              <span className="text-2xl font-bold text-gray-900">₹</span>
              <span className="text-lg text-gray-400 line-through ml-2">
                {Math.round(selectedVariant.price * 1.1)}₹
              </span>
            </div>
          )}

          {/* Variant Selection */}
          <Card className="mb-6 border-gray-200">
            <CardContent className="p-5 space-y-5">
              {product.variants && product.variants.length > 0 && (
                <div>
                  <Label className="text-sm font-semibold mb-3 block text-gray-700">
                    {translations.selectWeight[language]}
                  </Label>
                  <RadioGroup
                    value={selectedVariant?.id}
                    onValueChange={(value) => {
                      const variant = product.variants?.find((v) => v.id === value)
                      if (variant) setSelectedVariant(variant)
                    }}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {product.variants.map((variant) => (
                        <div
                          key={variant.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedVariant?.id === variant.id
                              ? "border-[#1a5f5f] bg-[#1a5f5f]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedVariant(variant)}
                        >
                          <RadioGroupItem value={variant.id} id={variant.id} className="sr-only" />
                          <Label htmlFor={variant.id} className="cursor-pointer flex-1">
                            <span className="font-medium text-sm block">
                              {language === "en" ? variant.weight_label_en : variant.weight_label_hi}
                            </span>
                            {variant.price && (
                              <span className="text-[#1a5f5f] font-semibold text-sm">₹{variant.price}</span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <Label className="text-sm font-semibold mb-3 block text-gray-700">
                  {translations.quantity[language]}
                </Label>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-14 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant}
              size="lg"
              className="flex-1 bg-[#1a5f5f] hover:bg-[#145050] text-white gap-2 rounded-xl h-12"
            >
              <ShoppingCart className="h-5 w-5" />
              {translations.addToCart[language]}
            </Button>
            <Button variant="outline" size="lg" className="h-12 w-12 rounded-xl border-2 bg-transparent">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product info */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">SKU:</span>
              <span className="font-medium">{product.id.slice(0, 8).toUpperCase()}</span>
            </div>
            {product.category && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{language === "en" ? "Category:" : "श्रेणी:"}</span>
                <Badge variant="secondary">
                  {language === "en" ? product.category.name_en : product.category.name_hi}
                </Badge>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description_en && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-2">{language === "en" ? "Description" : "विवरण"}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "en" ? product.description_en : product.description_hi}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
