import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  if (!profile || !profile.is_active) {
    redirect("/admin/login")
  }

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*), variants:product_variants(*)")
    .order("display_order")

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader user={data.user} profile={profile} />
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-4xl font-bold">Products</h1>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name_en}</TableCell>
                    <TableCell>{product.category?.name_en || "-"}</TableCell>
                    <TableCell>{product.variants?.length || 0}</TableCell>
                    <TableCell>{product.is_featured ? <Badge>Featured</Badge> : "-"}</TableCell>
                    <TableCell>
                      <Badge variant={product.is_active ? "default" : "secondary"}>
                        {product.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
