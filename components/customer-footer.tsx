"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function CustomerFooter() {
  const { language } = useLanguage()

  return (
    <footer className="bg-[#1a1f2e] text-white">
      {/* Main footer content */}
      <div className="container px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 sm:mb-5">
              <Image src="/logo.png" alt="Lalaji Namkeens" width={140} height={50} className="h-10 sm:h-11 w-auto" />
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
              {language === "en"
                ? "Since 1980, bringing authentic Indian namkeen and snacks to families across India with love and tradition."
                : "1980 से, प्यार और परंपरा के साथ भारत भर के परिवारों के लिए प्रामाणिक भारतीय नमकीन और स्नैक्स।"}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </a>
              <a
                href="#"
                className="h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </a>
              <a
                href="#"
                className="h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm sm:text-base mb-4 sm:mb-5">
              {language === "en" ? "Quick Links" : "त्वरित लिंक"}
            </h4>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <Link href="/" className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm">
                {translations.home[language]}
              </Link>
              <Link href="/products" className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm">
                {translations.products[language]}
              </Link>
              <Link href="/track" className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm">
                {translations.trackOrder[language]}
              </Link>
              <Link href="/cart" className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm">
                {translations.cart[language]}
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-sm sm:text-base mb-4 sm:mb-5">
              {language === "en" ? "Categories" : "श्रेणियाँ"}
            </h4>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <Link
                href="/products?category=bhujia"
                className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm"
              >
                {language === "en" ? "Bhujia" : "भुजिया"}
              </Link>
              <Link
                href="/products?category=mixture"
                className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm"
              >
                {language === "en" ? "Mixture" : "मिक्सचर"}
              </Link>
              <Link
                href="/products?category=namkeen"
                className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm"
              >
                {language === "en" ? "Namkeen" : "नमकीन"}
              </Link>
              <Link
                href="/products?category=sweets"
                className="text-gray-400 hover:text-[#d4e157] transition-colors text-sm"
              >
                {language === "en" ? "Sweets" : "मिठाई"}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-sm sm:text-base mb-4 sm:mb-5">
              {translations.contact[language]}
            </h4>
            <div className="flex flex-col gap-3 sm:gap-4">
              <a
                href="mailto:info@lalajinamkeens.com"
                className="flex items-center gap-2.5 sm:gap-3 text-gray-400 hover:text-[#d4e157] transition-colors text-xs sm:text-sm break-all"
              >
                <div className="h-7 sm:h-8 w-7 sm:w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </div>
                <span className="break-words">info@lalajinamkeens.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-gray-400 hover:text-[#d4e157] transition-colors text-sm"
              >
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                +91 98765 43210
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>{language === "en" ? "Mumbai, Maharashtra, India" : "मुंबई, महाराष्ट्र, भारत"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
              © 2025 {language === "en" ? "Lalaji Namkeens" : "लालाजी नमकीन"}.{" "}
              {translations.allRightsReserved[language]}
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-[#d4e157] transition-colors">
                {language === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
              </Link>
              <Link href="/terms" className="hover:text-[#d4e157] transition-colors">
                {language === "en" ? "Terms of Service" : "सेवा की शर्तें"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
