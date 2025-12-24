import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { QuotationDetail } from "@/components/admin/quotation-detail"

export default async function QuotationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  if (!profile || !profile.is_active) {
    redirect("/admin/login")
  }

  const { data: quotation } = await supabase.from("quotations").select("*, quotation_items(*)").eq("id", id).single()

  if (!quotation) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader user={data.user} profile={profile} />
      <QuotationDetail quotation={quotation} />
    </div>
  )
}
