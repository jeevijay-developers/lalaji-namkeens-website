"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { LogOut, User, LayoutDashboard, Package, FileText, ShoppingBag } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface AdminHeaderProps {
  user: SupabaseUser
  profile: {
    full_name?: string
    email: string
  }
}

export function AdminHeader({ user, profile }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Lalaji Namkeens" width={100} height={35} className="h-8 w-auto" />
            <span className="text-sm font-semibold text-muted-foreground">Admin</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/admin"
              className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/admin/quotations"
              className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FileText className="h-4 w-4" />
              Quotations
            </Link>
            <Link
              href="/admin/orders"
              className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Link>
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{profile.full_name || profile.email}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
