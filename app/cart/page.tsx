"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { CustomerHeader } from "@/components/customer-header"
import { CustomerFooter } from "@/components/customer-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CartItem } from "@/lib/types"
import { getCart, updateCartItemQuantity, removeFromCart } from "@/lib/cart-storage"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(getCart())

    const handleCartUpdate = () => {
      setCart(getCart())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => window.removeEventListener("cart-updated", handleCartUpdate)
  }, [])

  const updateQuantity = (productId: string, variantId: string, newQuantity: number) => {
    const updated = updateCartItemQuantity(productId, variantId, newQuantity)
    setCart(updated)
    window.dispatchEvent(new Event("cart-updated"))
  }

  const removeItem = (productId: string, variantId: string) => {
    const updated = removeFromCart(productId, variantId)
    setCart(updated)
    window.dispatchEvent(new Event("cart-updated"))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-8">
        <h1 className="font-heading text-4xl font-bold mb-8">{translations.yourCart[language]}</h1>

        {cart.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">{translations.emptyCart[language]}</p>
              <Link href="/products">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {translations.continueShopping[language]}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={`${item.product_id}-${item.variant_id}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-10 w-10 text-primary/40" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {language === "en" ? item.product_name_en : item.product_name_hi}
                        </h3>
                        <Badge variant="secondary" className="mb-3">
                          {language === "en" ? item.variant_label_en : item.variant_label_hi}
                        </Badge>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.product_id, item.variant_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{language === "en" ? "Cart Summary" : "कार्ट सारांश"}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{language === "en" ? "Total Items" : "कुल आइटम"}</span>
                      <span className="font-medium">{totalItems}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {translations.requestQuotation[language]}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    {language === "en"
                      ? "Submit your cart to receive a price quotation from us"
                      : "हमसे मूल्य कोटेशन प्राप्त करने के लिए अपना कार्ट सबमिट करें"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <CustomerFooter />
    </div>
  )
}
