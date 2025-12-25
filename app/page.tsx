import { createClient } from "@/lib/supabase/server";
import { CustomerHeader } from "@/components/customer-header";
import { CustomerFooter } from "@/components/customer-footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesSection } from "@/components/home/categories-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { FeaturedStores } from "@/components/home/featured-stores";
import { MostSelling } from "@/components/home/most-selling";
import { CTASection } from "@/components/home/cta-section";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("display_order")
    .limit(10);

  const { data: allProducts } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection categories={categories || []} />
        <FeaturedProducts
          products={featuredProducts || []}
          title={{ en: "You might need", hi: "आपको चाहिए होगा" }}
          subtitle={{
            en: "Popular products you'll love",
            hi: "लोकप्रिय उत्पाद जो आपको पसंद आएंगे",
          }}
        />
        <FeaturedStores />
        <WhyChooseUs />
        <MostSelling products={allProducts || []} />
        <CTASection />
        <Testimonials />
      </main>
      <CustomerFooter />
    </div>
  );
}
