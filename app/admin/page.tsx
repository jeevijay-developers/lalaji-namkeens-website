import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  // Verify user has admin profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  if (!profile || !profile.is_active) {
    redirect("/admin/login")
  }

  // Fetch dashboard statistics
  const [quotationsResult, ordersResult, productsResult] = await Promise.all([
    supabase.from("quotations").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
  ])

  const stats = {
    totalQuotations: quotationsResult.count || 0,
    totalOrders: ordersResult.count || 0,
    totalProducts: productsResult.count || 0,
  }

  // Fetch recent quotations
  const { data: recentQuotations } = await supabase
    .from("quotations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader user={data.user} profile={profile} />
      <AdminDashboard stats={stats} recentQuotations={recentQuotations || []} recentOrders={recentOrders || []} />
    </div>
  )
}
