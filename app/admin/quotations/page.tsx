import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { QuotationsTable } from "@/components/admin/quotations-table"

export default async function AdminQuotationsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  if (!profile || !profile.is_active) {
    redirect("/admin/login")
  }

  const { data: quotations } = await supabase
    .from("quotations")
    .select("*, quotation_items(*)")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader user={data.user} profile={profile} />
      <main className="flex-1 container py-8">
        <h1 className="font-heading text-4xl font-bold mb-8">Quotations</h1>
        <QuotationsTable quotations={quotations || []} />
      </main>
    </div>
  )
}
