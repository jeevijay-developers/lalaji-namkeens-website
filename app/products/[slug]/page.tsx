import { createClient } from "@/lib/supabase/server"
import { CustomerHeader } from "@/components/customer-header"
import { CustomerFooter } from "@/components/customer-footer"
import { ProductDetailClient } from "@/components/product-detail-client"
import { notFound } from "next/navigation"

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      variants:product_variants(*)
    `,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-1">
        <ProductDetailClient product={product} />
      </main>
      <CustomerFooter />
    </div>
  )
}
