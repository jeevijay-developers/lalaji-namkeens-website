"use client"

import type { CartItem } from "./types"

const CART_KEY = "lalaji_cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []

  try {
    const cart = localStorage.getItem(CART_KEY)
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch (error) {
    console.error("Failed to save cart:", error)
  }
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = getCart()

  // Check if item already exists
  const existingIndex = cart.findIndex((i) => i.product_id === item.product_id && i.variant_id === item.variant_id)

  if (existingIndex > -1) {
    // Update quantity
    cart[existingIndex].quantity += item.quantity
  } else {
    // Add new item
    cart.push(item)
  }

  saveCart(cart)
  return cart
}

export function updateCartItemQuantity(productId: string, variantId: string, quantity: number): CartItem[] {
  const cart = getCart()

  const index = cart.findIndex((i) => i.product_id === productId && i.variant_id === variantId)

  if (index > -1) {
    if (quantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
  }

  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string, variantId: string): CartItem[] {
  const cart = getCart()
  const filtered = cart.filter((i) => !(i.product_id === productId && i.variant_id === variantId))

  saveCart(filtered)
  return filtered
}

export function clearCart(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_KEY)
}

export function getCartCount(): number {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
