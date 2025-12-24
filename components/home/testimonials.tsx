"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: { en: "Rajesh Kumar", hi: "राजेश कुमार" },
    location: { en: "Delhi", hi: "दिल्ली" },
    rating: 5,
    text: {
      en: "Best namkeen I've ever tasted! The bhujia is crispy and fresh every time. My whole family loves it.",
      hi: "अब तक का सबसे अच्छा नमकीन! भुजिया हर बार कुरकुरी और ताजी होती है। मेरे पूरे परिवार को पसंद है।",
    },
    avatar: "RK",
  },
  {
    name: { en: "Priya Sharma", hi: "प्रिया शर्मा" },
    location: { en: "Mumbai", hi: "मुंबई" },
    rating: 5,
    text: {
      en: "Authentic taste that reminds me of my grandmother's kitchen. Fast delivery and great packaging!",
      hi: "प्रामाणिक स्वाद जो मुझे मेरी दादी की रसोई की याद दिलाता है। तेज डिलीवरी और बढ़िया पैकेजिंग!",
    },
    avatar: "PS",
  },
  {
    name: { en: "Amit Patel", hi: "अमित पटेल" },
    location: { en: "Ahmedabad", hi: "अहमदाबाद" },
    rating: 5,
    text: {
      en: "Been ordering from Lalaji for 3 years now. Consistent quality and the traditional recipes are unmatched.",
      hi: "3 साल से लालाजी से ऑर्डर कर रहा हूं। सुसंगत गुणवत्ता और पारंपरिक व्यंजन बेजोड़ हैं।",
    },
    avatar: "AP",
  },
]

export function Testimonials() {
  const { language } = useLanguage()

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-[#f8f8f8]">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {language === "en" ? "What our customers say" : "हमारे ग्राहक क्या कहते हैं"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {language === "en" ? "Trusted by thousands of happy customers" : "हजारों खुश ग्राहकों द्वारा विश्वसनीय"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-5 sm:p-6">
                <Quote className="h-6 sm:h-8 w-6 sm:w-8 text-primary/20 mb-3 sm:mb-4" />
                <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  {language === "en" ? testimonial.text.en : testimonial.text.hi}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-gradient-to-br from-[#1a5f5f] to-[#145050] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {language === "en" ? testimonial.name.en : testimonial.name.hi}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {language === "en" ? testimonial.location.en : testimonial.location.hi}
                    </div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-3 sm:h-4 w-3 sm:w-4 fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
