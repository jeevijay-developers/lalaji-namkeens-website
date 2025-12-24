"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { CustomerHeader } from "@/components/customer-header"
import { CustomerFooter } from "@/components/customer-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CartItem } from "@/lib/types"
import { getCart, clearCart } from "@/lib/cart-storage"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const cartItems = getCart()
    if (cartItems.length === 0) {
      router.push("/cart")
    }
    setCart(cartItems)
  }, [router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = language === "en" ? "Name is required" : "नाम आवश्यक है"
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = language === "en" ? "Mobile number is required" : "मोबाइल नंबर आवश्यक है"
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = language === "en" ? "Invalid mobile number" : "अमान्य मोबाइल नंबर"
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "en" ? "Invalid email address" : "अमान्य ईमेल पता"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const supabase = createClient()

      // Generate quotation number
      const { data: quotationNumber } = await supabase.rpc("generate_quotation_number")

      // Create quotation
      const { data: quotation, error: quotationError } = await supabase
        .from("quotations")
        .insert({
          quotation_number: quotationNumber,
          customer_name: formData.name,
          customer_email: formData.email || null,
          customer_mobile: formData.mobile,
          customer_address: formData.address || null,
          total_items: cart.reduce((sum, item) => sum + item.quantity, 0),
          notes: formData.notes || null,
          status: "requested",
        })
        .select()
        .single()

      if (quotationError) throw quotationError

      // Create quotation items
      const quotationItems = cart.map((item) => ({
        quotation_id: quotation.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        product_name_en: item.product_name_en,
        product_name_hi: item.product_name_hi,
        variant_label_en: item.variant_label_en,
        variant_label_hi: item.variant_label_hi,
        quantity: item.quantity,
        unit_price: item.unit_price || null,
        total_price: item.total_price || null,
      }))

      const { error: itemsError } = await supabase.from("quotation_items").insert(quotationItems)

      if (itemsError) throw itemsError

      // Clear cart
      clearCart()
      window.dispatchEvent(new Event("cart-updated"))

      // Redirect to success page
      router.push(`/quotation-success?number=${quotation.quotation_number}`)
    } catch (error) {
      console.error("Error submitting quotation:", error)
      alert(
        language === "en"
          ? "Failed to submit quotation. Please try again."
          : "कोटेशन सबमिट करने में विफल। कृपया पुन: प्रयास करें।",
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (cart.length === 0) {
    return null
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "en" ? "Back to Cart" : "कार्ट पर वापस जाएं"}
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-8">{translations.requestQuotation[language]}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{translations.customerDetails[language]}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {translations.fullName[language]} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === "en" ? "Enter your full name" : "अपना पूरा नाम दर्ज करें"}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">
                      {translations.mobileNumber[language]} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder={language === "en" ? "10-digit mobile number" : "10-अंकों का मोबाइल नंबर"}
                      maxLength={10}
                    />
                    {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{translations.email[language]}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={language === "en" ? "your.email@example.com" : "आपका.ईमेल@example.com"}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">{translations.address[language]}</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={language === "en" ? "Enter delivery address" : "डिलीवरी पता दर्ज करें"}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{translations.notes[language]}</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={
                        language === "en" ? "Any special requests or instructions" : "कोई विशेष अनुरोध या निर्देश"
                      }
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === "en" ? "Submitting..." : "सबमिट कर रहा है..."}
                      </>
                    ) : (
                      translations.submit[language]
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{language === "en" ? "Order Summary" : "ऑर्डर सारांश"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.product_id}-${item.variant_id}`} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{language === "en" ? item.product_name_en : item.product_name_hi}</p>
                        <p className="text-muted-foreground text-xs">
                          {language === "en" ? item.variant_label_en : item.variant_label_hi} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>{language === "en" ? "Total Items" : "कुल आइटम"}</span>
                    <span>{totalItems}</span>
                  </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-xs text-center">
                    {language === "en"
                      ? "You'll receive a price quotation from our team shortly after submission."
                      : "सबमिशन के तुरंत बाद आपको हमारी टीम से मूल्य कोटेशन प्राप्त होगा।"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <CustomerFooter />
    </div>
  )
}
