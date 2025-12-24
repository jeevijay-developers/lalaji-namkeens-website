"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { CustomerHeader } from "@/components/customer-header"
import { CustomerFooter } from "@/components/customer-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Quotation, Order } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Search, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react"

export default function TrackPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<"quotation" | "order">("quotation")
  const [searchTerm, setSearchTerm] = useState("")
  const [mobile, setMobile] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [quotation, setQuotation] = useState<Quotation | null>(null)
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setQuotation(null)
    setOrder(null)

    if (!searchTerm || !mobile) {
      setError(language === "en" ? "Please enter both number and mobile" : "कृपया नंबर और मोबाइल दोनों दर्ज करें")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      if (activeTab === "quotation") {
        const { data, error: fetchError } = await supabase
          .from("quotations")
          .select("*, quotation_items(*)")
          .eq("quotation_number", searchTerm.toUpperCase())
          .eq("customer_mobile", mobile)
          .single()

        if (fetchError || !data) {
          setError(language === "en" ? "Quotation not found" : "कोटेशन नहीं मिला")
        } else {
          setQuotation(data)
        }
      } else {
        const { data, error: fetchError } = await supabase
          .from("orders")
          .select("*, order_items(*)")
          .eq("order_number", searchTerm.toUpperCase())
          .eq("customer_mobile", mobile)
          .single()

        if (fetchError || !data) {
          setError(language === "en" ? "Order not found" : "ऑर्डर नहीं मिला")
        } else {
          setOrder(data)
        }
      }
    } catch (err) {
      setError(language === "en" ? "Something went wrong" : "कुछ गलत हो गया")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      requested: { color: "bg-blue-100 text-blue-800", icon: Clock, label: translations.requested },
      approved: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: translations.approved },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle, label: translations.rejected },
      processing: { color: "bg-yellow-100 text-yellow-800", icon: Package, label: translations.processing },
      dispatched: { color: "bg-purple-100 text-purple-800", icon: Truck, label: translations.dispatched },
      delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: translations.delivered },
      cancelled: { color: "bg-gray-100 text-gray-800", icon: XCircle, label: translations.cancelled },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    if (!config) return null

    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label[language]}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl font-bold mb-2">{translations.trackOrder[language]}</h1>
          <p className="text-muted-foreground mb-8">
            {language === "en"
              ? "Enter your quotation or order number along with mobile number to track status"
              : "स्थिति ट्रैक करने के लिए अपना कोटेशन या ऑर्डर नंबर मोबाइल नंबर के साथ दर्ज करें"}
          </p>

          <Card>
            <CardHeader>
              <CardTitle>{translations.enterDetails[language]}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "quotation" | "order")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="quotation">{translations.quotationNumber[language]}</TabsTrigger>
                  <TabsTrigger value="order">{translations.orderNumber[language]}</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">
                      {activeTab === "quotation"
                        ? translations.quotationNumber[language]
                        : translations.orderNumber[language]}
                    </Label>
                    <Input
                      id="number"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                      placeholder={activeTab === "quotation" ? "QT-20250122-0001" : "ORD-20250122-0001"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">{translations.mobileNumber[language]}</Label>
                    <Input
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {translations.loading[language]}
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {translations.track[language]}
                      </>
                    )}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quotation Result */}
          {quotation && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{quotation.quotation_number}</CardTitle>
                  {getStatusBadge(quotation.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{translations.fullName[language]}</p>
                    <p className="font-medium">{quotation.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{translations.mobileNumber[language]}</p>
                    <p className="font-medium">{quotation.customer_mobile}</p>
                  </div>
                  {quotation.customer_email && (
                    <div>
                      <p className="text-sm text-muted-foreground">{translations.email[language]}</p>
                      <p className="font-medium">{quotation.customer_email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">{language === "en" ? "Total Items" : "कुल आइटम"}</p>
                    <p className="font-medium">{quotation.total_items}</p>
                  </div>
                </div>

                {quotation.approved_total && (
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === "en" ? "Approved Amount" : "स्वीकृत राशि"}
                    </p>
                    <p className="text-2xl font-bold text-primary">₹{quotation.approved_total.toFixed(2)}</p>
                  </div>
                )}

                {quotation.quotation_items && quotation.quotation_items.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">{language === "en" ? "Items" : "आइटम"}</h4>
                    <div className="space-y-2">
                      {quotation.quotation_items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">
                              {language === "en" ? item.product_name_en : item.product_name_hi}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {language === "en" ? item.variant_label_en : item.variant_label_hi} × {item.quantity}
                            </p>
                          </div>
                          {item.unit_price && (
                            <p className="font-medium">₹{(item.unit_price * item.quantity).toFixed(2)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {quotation.admin_notes && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm font-semibold mb-1">
                      {language === "en" ? "Note from Admin" : "एडमिन का नोट"}
                    </p>
                    <p className="text-sm">{quotation.admin_notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Order Result */}
          {order && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{order.order_number}</CardTitle>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{translations.fullName[language]}</p>
                    <p className="font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{translations.mobileNumber[language]}</p>
                    <p className="font-medium">{order.customer_mobile}</p>
                  </div>
                  {order.tracking_number && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Tracking Number" : "ट्रैकिंग नंबर"}
                      </p>
                      <p className="font-medium">{order.tracking_number}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Payment Status" : "भुगतान स्थिति"}
                    </p>
                    <p className="font-medium capitalize">{order.payment_status}</p>
                  </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{language === "en" ? "Subtotal" : "उप-योग"}</span>
                    <span className="text-sm">₹{order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{language === "en" ? "GST" : "जीएसटी"}</span>
                    <span className="text-sm">₹{order.gst_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">{language === "en" ? "Total Amount" : "कुल राशि"}</span>
                    <span className="text-xl font-bold text-primary">₹{order.final_amount.toFixed(2)}</span>
                  </div>
                </div>

                {order.customer_address && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{translations.address[language]}</p>
                    <p className="font-medium">{order.customer_address}</p>
                  </div>
                )}

                {order.order_items && order.order_items.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">{language === "en" ? "Items" : "आइटम"}</h4>
                    <div className="space-y-2">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">
                              {language === "en" ? item.product_name_en : item.product_name_hi}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {language === "en" ? item.variant_label_en : item.variant_label_hi} × {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">₹{item.total_price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <CustomerFooter />
    </div>
  )
}
