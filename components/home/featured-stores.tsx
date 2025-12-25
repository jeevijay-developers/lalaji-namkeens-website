"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

const stores = [
  {
    name: { en: "Premium Collection", hi: "प्रीमियम संग्रह" },
    description: { en: "Exclusive snacks", hi: "विशेष स्नैक्स" },
    color: "bg-gradient-to-br from-orange-400 to-orange-500",
    image: "/Categories/premium.png",
  },
  {
    name: { en: "Festival Special", hi: "त्योहार विशेष" },
    description: { en: "Seasonal delights", hi: "मौसमी व्यंजन" },
    color: "bg-gradient-to-br from-violet-500 to-purple-600",
    image: "/Categories/festive.png",
  },
  {
    name: { en: "Healthy Options", hi: "स्वस्थ विकल्प" },
    description: { en: "Low oil snacks", hi: "कम तेल वाले स्नैक्स" },
    color: "bg-gradient-to-br from-emerald-400 to-teal-500",
    image: "/Categories/healthy.png",
  },
];

export function FeaturedStores() {
  const { language } = useLanguage();

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
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
                  className={`rounded-2xl h-36 sm:h-44 relative overflow-hidden transition-transform group-hover:scale-[1.02]`}
                >
                  <Image
                    src={store.image}
                    alt={language === "en" ? store.name.en : store.name.hi}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-3 sm:mt-4">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                    {language === "en" ? store.name.en : store.name.hi}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mt-1">
                    <Zap className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-[#FFB800]" />
                    {language === "en"
                      ? store.description.en
                      : store.description.hi}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
