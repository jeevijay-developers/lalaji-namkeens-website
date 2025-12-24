"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Quotation } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Eye, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface QuotationsTableProps {
  quotations: Quotation[]
}

export function QuotationsTable({ quotations: initialQuotations }: QuotationsTableProps) {
  const router = useRouter()
  const [quotations, setQuotations] = useState(initialQuotations)
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [action, setAction] = useState<"approve" | "reject" | null>(null)
  const [approvedAmount, setApprovedAmount] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = (quotation: Quotation, actionType: "approve" | "reject") => {
    setSelectedQuotation(quotation)
    setAction(actionType)
    setApprovedAmount(quotation.estimated_total?.toString() || "")
    setAdminNotes(quotation.admin_notes || "")
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!selectedQuotation || !action) return

    setIsLoading(true)

    try {
      const supabase = createClient()

      const updateData: {
        status: string
        approved_total?: number
        admin_notes?: string
      } = {
        status: action === "approve" ? "approved" : "rejected",
        admin_notes: adminNotes || null,
      }

      if (action === "approve" && approvedAmount) {
        updateData.approved_total = Number.parseFloat(approvedAmount)
      }

      const { error } = await supabase.from("quotations").update(updateData).eq("id", selectedQuotation.id)

      if (error) throw error

      // Update local state
      setQuotations((prev) =>
        prev.map((q) =>
          q.id === selectedQuotation.id
            ? {
                ...q,
                ...updateData,
              }
            : q,
        ),
      )

      setShowDialog(false)
      setSelectedQuotation(null)
      setAction(null)
      router.refresh()
    } catch (error) {
      console.error("Error updating quotation:", error)
      alert("Failed to update quotation")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      requested: { color: "bg-blue-100 text-blue-800", label: "Requested" },
      approved: { color: "bg-green-100 text-green-800", label: "Approved" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
      converted_to_order: { color: "bg-purple-100 text-purple-800", label: "Converted" },
    }

    const statusConfig = config[status as keyof typeof config]
    if (!statusConfig) return null

    return <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell className="font-medium">{quotation.quotation_number}</TableCell>
                  <TableCell>{quotation.customer_name}</TableCell>
                  <TableCell>{quotation.customer_mobile}</TableCell>
                  <TableCell>{quotation.total_items}</TableCell>
                  <TableCell>{getStatusBadge(quotation.status)}</TableCell>
                  <TableCell>{format(new Date(quotation.created_at), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/admin/quotations/${quotation.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {quotation.status === "requested" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleAction(quotation, "approve")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleAction(quotation, "reject")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{action === "approve" ? "Approve Quotation" : "Reject Quotation"}</DialogTitle>
            <DialogDescription>
              {selectedQuotation?.quotation_number} - {selectedQuotation?.customer_name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {action === "approve" && (
              <div className="space-y-2">
                <Label htmlFor="amount">Approved Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={approvedAmount}
                  onChange={(e) => setApprovedAmount(e.target.value)}
                  placeholder="Enter approved amount"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Admin Notes</Label>
              <Textarea
                id="notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add any notes for the customer..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || (action === "approve" && !approvedAmount)}
              className={action === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : action === "approve" ? (
                "Approve"
              ) : (
                "Reject"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
