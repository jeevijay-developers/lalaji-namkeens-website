"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageToggle } from "./language-toggle"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useEffect, useState } from "react"
import { getCartCount } from "@/lib/cart-storage"

export function CustomerHeader() {
  const { language } = useLanguage()
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setCartCount(getCartCount())

    const handleStorageChange = () => {
      setCartCount(getCartCount())
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("cart-updated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cart-updated", handleStorageChange)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      {/* Added max-w-7xl and mx-auto for proper centering */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image src="/logo.png" alt="Lalaji Namkeens" width={110} height={40} className="h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#1a5f5f] transition-colors">
              {translations.home[language]}
            </Link>
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-[#1a5f5f] transition-colors">
              {translations.products[language]}
            </Link>
            <Link href="/track" className="text-sm font-medium text-gray-700 hover:text-[#1a5f5f] transition-colors">
              {translations.trackOrder[language]}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageToggle />

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 hover:bg-gray-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-5 min-w-5 flex items-center justify-center p-0 text-xs bg-[#E63946] text-white border-2 border-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 hover:bg-gray-100 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {/* Added max-w-7xl and mx-auto for proper centering */}
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              {translations.home[language]}
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              {translations.products[language]}
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              {translations.trackOrder[language]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
