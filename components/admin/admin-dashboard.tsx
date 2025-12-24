"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Quotation, Order } from "@/lib/types"
import { Package, FileText, ShoppingBag, ArrowRight, Clock, CheckCircle, Truck } from "lucide-react"

interface AdminDashboardProps {
  stats: {
    totalQuotations: number
    totalOrders: number
    totalProducts: number
  }
  recentQuotations: Quotation[]
  recentOrders: Order[]
}

export function AdminDashboard({ stats, recentQuotations, recentOrders }: AdminDashboardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "requested":
        return <Clock className="h-4 w-4" />
      case "approved":
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "dispatched":
        return <Truck className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <main className="flex-1 container py-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Lalaji Namkeens Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Quotations</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalQuotations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Quotations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Quotations</CardTitle>
              <Link href="/admin/quotations">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentQuotations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No quotations yet</p>
            ) : (
              <div className="space-y-3">
                {recentQuotations.map((quotation) => (
                  <Link key={quotation.id} href={`/admin/quotations/${quotation.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <p className="font-medium">{quotation.quotation_number}</p>
                        <p className="text-sm text-muted-foreground">{quotation.customer_name}</p>
                      </div>
                      <Badge
                        variant={quotation.status === "requested" ? "secondary" : "default"}
                        className="flex items-center gap-1"
                      >
                        {getStatusIcon(quotation.status)}
                        {quotation.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link key={order.id} href={`/admin/orders/${order.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <p className="font-medium">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                      </div>
                      <Badge className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
