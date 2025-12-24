"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Phone, Clock, ArrowRight } from "lucide-react"

export function CTASection() {
  const { language } = useLanguage()

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#7b2d4a] via-[#6b2540] to-[#5a1f36]">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-6 sm:gap-8 items-center p-6 sm:p-8 lg:p-12">
            {/* Left content */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {language === "en" ? "Stay Home and Get All Your Namkeen From Us!" : "घर बैठे पाएं सभी नमकीन हमसे!"}
              </h2>

              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                {language === "en"
                  ? "Order your favorite namkeen and get it delivered fresh to your doorstep. Call us or visit our store."
                  : "अपनी पसंदीदा नमकीन ऑर्डर करें और इसे ताज़ा अपने दरवाजे पर पाएं। हमें कॉल करें या हमारी दुकान पर आएं।"}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#d4e157] hover:bg-[#c0ca33] text-gray-900 font-semibold gap-2 rounded-full px-6 sm:px-8"
                  >
                    {language === "en" ? "Order Now" : "अभी ऑर्डर करें"}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/track">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-white/30 hover:bg-white/10 text-white bg-transparent rounded-full px-6 sm:px-8"
                  >
                    {language === "en" ? "Track Order" : "ऑर्डर ट्रैक करें"}
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col xs:flex-row flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
                <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                  <Phone className="h-4 w-4 text-[#d4e157] flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                  <Clock className="h-4 w-4 text-[#d4e157] flex-shrink-0" />
                  <span>{language === "en" ? "9 AM - 9 PM" : "सुबह 9 - रात 9"}</span>
                </div>
              </div>
            </div>

            {/* Right - Delivery illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/5 rounded-full blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                  <div className="text-8xl mb-4">🛵</div>
                  <div className="text-white font-semibold text-lg">
                    {language === "en" ? "Fast Delivery" : "तेज़ डिलीवरी"}
                  </div>
                  <div className="text-white/70 text-sm mt-1">{language === "en" ? "Across India" : "पूरे भारत में"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
