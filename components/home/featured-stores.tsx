"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight, Zap } from "lucide-react"

const stores = [
  {
    name: { en: "Premium Collection", hi: "प्रीमियम संग्रह" },
    description: { en: "Exclusive snacks", hi: "विशेष स्नैक्स" },
    color: "bg-gradient-to-br from-orange-400 to-orange-500",
    pattern: "🥨",
  },
  {
    name: { en: "Festival Special", hi: "त्योहार विशेष" },
    description: { en: "Seasonal delights", hi: "मौसमी व्यंजन" },
    color: "bg-gradient-to-br from-violet-500 to-purple-600",
    pattern: "🎉",
  },
  {
    name: { en: "Healthy Options", hi: "स्वस्थ विकल्प" },
    description: { en: "Low oil snacks", hi: "कम तेल वाले स्नैक्स" },
    color: "bg-gradient-to-br from-emerald-400 to-teal-500",
    pattern: "🌿",
  },
]

export function FeaturedStores() {
  const { language } = useLanguage()

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#f8f8f8]">
      {/* Added max-w-7xl and mx-auto for proper centering on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-2">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            {language === "en" ? "Featured collections" : "विशेष संग्रह"}
          </h2>
          <Link
            href="/products"
            className="text-[#1a5f5f] hover:text-[#145050] font-semibold text-sm flex items-center gap-1 group self-start sm:self-auto"
          >
            {language === "en" ? "Visit all collections" : "सभी संग्रह देखें"}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stores.map((store, index) => (
            <Link key={index} href="/products">
              <div className="group cursor-pointer">
                <div
                  className={`${store.color} rounded-2xl p-6 h-36 sm:h-44 relative overflow-hidden transition-transform group-hover:scale-[1.02]`}
                >
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <span className="text-4xl">{store.pattern}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                    {language === "en" ? store.name.en : store.name.hi}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mt-1">
                    <Zap className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-[#FFB800]" />
                    {language === "en" ? store.description.en : store.description.hi}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
