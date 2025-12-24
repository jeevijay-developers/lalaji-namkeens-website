import { createClient } from "@/lib/supabase/server"
import { CustomerHeader } from "@/components/customer-header"
import { CustomerFooter } from "@/components/customer-footer"
import { ProductCard } from "@/components/product-card"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      variants:product_variants(*)
    `,
    )
    .eq("is_active", true)
    .order("display_order")

  if (params.category) {
    const { data: category } = await supabase.from("categories").select("id").eq("slug", params.category).single()

    if (category) {
      query = query.eq("category_id", category.id)
    }
  }

  const { data: products } = await query

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-8">
        <h1 className="font-heading text-4xl font-bold mb-8">
          {params.category
            ? params.category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "All Products"}
        </h1>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </main>
      <CustomerFooter />
    </div>
  )
}
