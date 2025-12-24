"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Product, ProductVariant, CartItem } from "@/lib/types"
import { addToCart } from "@/lib/cart-storage"
import { Minus, Plus, ShoppingCart, Package2 } from "lucide-react"

interface AddToCartDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export function AddToCartDialog({ open, onOpenChange, product }: AddToCartDialogProps) {
  const { language } = useLanguage()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product.variants?.[0] || null)
  const [quantity, setQuantity] = useState(1)

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
    onOpenChange(false)
    setQuantity(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Product header with image */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm">
            {product.image_url ? (
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={language === "en" ? product.name_en : product.name_hi}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <Package2 className="h-8 w-8 text-gray-300" />
            )}
          </div>
          <div className="flex-1">
            <DialogHeader className="text-left p-0">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {language === "en" ? product.name_en : product.name_hi}
              </DialogTitle>
            </DialogHeader>
            {selectedVariant?.price && (
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-[#1a5f5f]">₹{selectedVariant.price * quantity}</span>
                {quantity > 1 && (
                  <span className="text-sm text-gray-500">
                    (₹{selectedVariant.price} × {quantity})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Variant Selection */}
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
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedVariant?.id === variant.id
                          ? "border-[#1a5f5f] bg-[#1a5f5f]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <RadioGroupItem value={variant.id} id={`dialog-${variant.id}`} className="sr-only" />
                      <Label htmlFor={`dialog-${variant.id}`} className="cursor-pointer text-sm">
                        <span className="font-medium block">
                          {language === "en" ? variant.weight_label_en : variant.weight_label_hi}
                        </span>
                        {variant.price && <span className="text-[#1a5f5f] font-semibold">₹{variant.price}</span>}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <Label className="text-sm font-semibold mb-3 block text-gray-700">{translations.quantity[language]}</Label>
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="h-9 w-9 rounded-lg hover:bg-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-9 w-9 rounded-lg hover:bg-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 pt-0 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 h-11 rounded-xl border-2">
            {translations.cancel[language]}
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className="flex-1 h-11 rounded-xl bg-[#1a5f5f] hover:bg-[#145050] text-white gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {translations.addToCart[language]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
