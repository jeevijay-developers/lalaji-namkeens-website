"use client"

import { useLanguage } from "@/lib/language-context"
import { Shield, Clock, Award, Truck, Leaf, Heart } from "lucide-react"

export function WhyChooseUs() {
  const { language } = useLanguage()

  const features = [
    {
      icon: Award,
      titleEn: "45+ Years Legacy",
      titleHi: "45+ वर्षों की विरासत",
      descEn: "Trusted since 1980 for authentic taste",
      descHi: "प्रामाणिक स्वाद के लिए 1980 से विश्वसनीय",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Shield,
      titleEn: "100% Pure Quality",
      titleHi: "100% शुद्ध गुणवत्ता",
      descEn: "Made from finest ingredients only",
      descHi: "केवल बेहतरीन सामग्री से बनाया",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: Clock,
      titleEn: "Fresh Daily",
      titleHi: "रोज़ ताज़ा",
      descEn: "Freshly prepared traditional recipes",
      descHi: "ताज़ा पारंपरिक व्यंजन",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: Truck,
      titleEn: "Pan India Delivery",
      titleHi: "पूरे भारत में डिलीवरी",
      descEn: "Quick delivery to your doorstep",
      descHi: "आपके दरवाजे तक त्वरित डिलीवरी",
      color: "from-violet-400 to-purple-500",
    },
    {
      icon: Leaf,
      titleEn: "No Preservatives",
      titleHi: "कोई प्रिज़र्वेटिव नहीं",
      descEn: "100% natural, no added chemicals",
      descHi: "100% प्राकृतिक, कोई रसायन नहीं",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Heart,
      titleEn: "Made with Love",
      titleHi: "प्यार से बना",
      descEn: "Handcrafted with care and tradition",
      descHi: "देखभाल और परंपरा के साथ हस्तनिर्मित",
      color: "from-rose-400 to-pink-500",
    },
  ]

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {language === "en" ? "Why Choose Lalaji Namkeens?" : "लालाजी नमकीन क्यों चुनें?"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            {language === "en"
              ? "Experience the difference of authentic Indian snacks made with love and tradition"
              : "प्यार और परंपरा के साथ बने प्रामाणिक भारतीय स्नैक्स का अंतर अनुभव करें"}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {language === "en" ? feature.titleEn : feature.titleHi}
                </h3>
                <p className="text-sm text-muted-foreground">{language === "en" ? feature.descEn : feature.descHi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
