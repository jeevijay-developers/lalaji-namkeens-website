"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#1a5f5f] via-[#145050] to-[#0d4040]">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center min-h-125 sm:min-h-140 lg:min-h-160 py-12 sm:py-16 lg:py-20">
          {/* Left Content */}
          <div className="max-w-xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold bg-[#E63946] text-white rounded-full shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              {language === "en" ? "Since 1980" : "1980 से"}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {language === "en" ? (
                <>
                  We bring authentic{" "}
                  <span className="text-[#FFB800] drop-shadow-sm">
                    Indian Namkeen
                  </span>{" "}
                  to your door
                </>
              ) : (
                <>
                  हम प्रामाणिक{" "}
                  <span className="text-[#FFB800] drop-shadow-sm">
                    भारतीय नमकीन
                  </span>{" "}
                  आपके दरवाजे तक लाते हैं
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed max-w-lg">
              {language === "en"
                ? "Get traditional Indian snacks and premium namkeen delivered fresh. Made from finest ingredients with time-honored recipes since 1980."
                : "पारंपरिक भारतीय स्नैक्स और प्रीमियम नमकीन ताजा डिलीवर करवाएं। 1980 से बेहतरीन सामग्री और पुरानी विधियों से बनाया गया।"}
            </p>

            <div className="flex flex-row gap-3 pt-2 mb-1">
              <Link href="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#d4e157] hover:bg-[#c0ca33] text-gray-900 font-semibold gap-2 shadow-lg hover:shadow-xl transition-all rounded-full px-6 sm:px-8 h-11 sm:h-12"
                >
                  {language === "en" ? "Shop now" : "अभी खरीदें"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/track">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/40 hover:bg-white/10 text-white bg-transparent rounded-full px-6 sm:px-8 h-11 sm:h-12"
                >
                  {language === "en" ? "Track order" : "ऑर्डर ट्रैक करें"}
                </Button>
              </Link>
            </div>

            <div className="flex flex-row items-start xs:items-center gap-4 sm:gap-6 pt-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-lg">🏆</span>
                </div>
                <div className="text-white/80 text-sm">
                  <div className="font-semibold text-white">45+</div>
                  {language === "en" ? "Years Legacy" : "वर्षों की विरासत"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div className="text-white/80 text-sm">
                  <div className="font-semibold text-white">10K+</div>
                  {language === "en" ? "Happy Customers" : "खुश ग्राहक"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden sm:flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-[#c9a961]/30 to-[#FFB800]/20 rounded-full blur-3xl scale-110" />

              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/indian-namkeen-snacks-in-decorative-bowl.jpg"
                  alt="Lalaji Namkeens authentic Indian snacks"
                  width={550}
                  height={450}
                  className="object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20"
        >
          <path
            fill="#fff"
            d="M0,40 C240,20 480,10 720,20 C960,30 1200,50 1440,40 L1440,80 L0,80 Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
