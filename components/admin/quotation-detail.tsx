"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Quotation } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"

interface QuotationDetailProps {
  quotation: Quotation
}

export function QuotationDetail({ quotation }: QuotationDetailProps) {
  return (
    <main className="flex-1 container py-8">
      <Link
        href="/admin/quotations"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Quotations
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-4xl font-bold">{quotation.quotation_number}</h1>
        <Badge
          className={
            quotation.status === "approved"
              ? "bg-green-100 text-green-800"
              : quotation.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
          }
        >
          {quotation.status}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{quotation.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-medium">{quotation.customer_mobile}</p>
              </div>
              {quotation.customer_email && (
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{quotation.customer_email}</p>
                </div>
              )}
              {quotation.customer_address && (
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{quotation.customer_address}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quotation.quotation_items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.product_name_en}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.variant_label_en} × {item.quantity}
                      </p>
                    </div>
                    {item.total_price && <p className="font-medium">₹{item.total_price.toFixed(2)}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {quotation.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Customer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{quotation.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="font-semibold">{quotation.total_items}</p>
              </div>
              {quotation.approved_total && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Approved Amount</p>
                  <p className="text-2xl font-bold text-primary">₹{quotation.approved_total.toFixed(2)}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">{format(new Date(quotation.created_at), "MMM dd, yyyy hh:mm a")}</p>
              </div>
            </CardContent>
          </Card>

          {quotation.admin_notes && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{quotation.admin_notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
