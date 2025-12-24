"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { CustomerHeader } from "@/components/customer-header"
import { CustomerFooter } from "@/components/customer-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

function SuccessContent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const quotationNumber = searchParams.get("number")

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="font-heading text-3xl font-bold mb-4">
              {language === "en" ? "Quotation Request Submitted!" : "कोटेशन अनुरोध सबमिट किया गया!"}
            </h1>

            <p className="text-muted-foreground mb-6">
              {language === "en"
                ? "Thank you for your interest! Our team will review your request and send you a price quotation shortly."
                : "आपकी रुचि के लिए धन्यवाद! हमारी टीम आपके अनुरोध की समीक्षा करेगी और शीघ्र ही आपको मूल्य कोटेशन भेजेगी।"}
            </p>

            {quotationNumber && (
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === "en" ? "Your Quotation Number" : "आपका कोटेशन नंबर"}
                </p>
                <p className="text-2xl font-bold text-primary">{quotationNumber}</p>
              </div>
            )}

            <p className="text-sm text-muted-foreground mb-8">
              {language === "en"
                ? "Please save this quotation number to track your request."
                : "कृपया अपने अनुरोध को ट्रैक करने के लिए इस कोटेशन नंबर को सहेजें।"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/track">
                <Button variant="outline" size="lg">
                  {language === "en" ? "Track Status" : "स्थिति ट्रैक करें"}
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {language === "en" ? "Continue Shopping" : "खरीदारी जारी रखें"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <CustomerFooter />
    </div>
  )
}

export default function QuotationSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
