-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public can view active categories" ON categories;
DROP POLICY IF EXISTS "Public can view active products" ON products;
DROP POLICY IF EXISTS "Public can view active variants" ON product_variants;
DROP POLICY IF EXISTS "Anyone can insert quotations" ON quotations;
DROP POLICY IF EXISTS "Users can view their own quotations" ON quotations;
DROP POLICY IF EXISTS "Admins can manage quotations" ON quotations;
DROP POLICY IF EXISTS "Anyone can insert quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Anyone can view quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Admins can manage quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Anyone can view orders" ON orders;
DROP POLICY IF EXISTS "Admins can manage orders" ON orders;
DROP POLICY IF EXISTS "Anyone can view order items" ON order_items;
DROP POLICY IF EXISTS "Admins can manage order items" ON order_items;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage product variants" ON product_variants;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update their own profile" ON profiles;

-- Create a security definer function to check if user is admin
-- This bypasses RLS and prevents infinite recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_active = true
  );
END;
$$;

-- Profiles policies (simple, no recursion)
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Authenticated users can insert profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Public read access for categories, products, and variants
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active variants" ON product_variants
  FOR SELECT USING (is_active = true);

-- Quotations policies
CREATE POLICY "Anyone can insert quotations" ON quotations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view quotations" ON quotations
  FOR SELECT USING (true);

CREATE POLICY "Admins can update quotations" ON quotations
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete quotations" ON quotations
  FOR DELETE USING (is_admin());

-- Quotation items policies
CREATE POLICY "Anyone can insert quotation items" ON quotation_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view quotation items" ON quotation_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can update quotation items" ON quotation_items
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete quotation items" ON quotation_items
  FOR DELETE USING (is_admin());

-- Orders policies
CREATE POLICY "Public can view orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert orders" ON orders
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete orders" ON orders
  FOR DELETE USING (is_admin());

-- Order items policies
CREATE POLICY "Public can view order items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert order items" ON order_items
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update order items" ON order_items
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete order items" ON order_items
  FOR DELETE USING (is_admin());

-- Admin policies for managing products and categories
CREATE POLICY "Admins can insert categories" ON categories
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update categories" ON categories
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete categories" ON categories
  FOR DELETE USING (is_admin());

CREATE POLICY "Admins can insert products" ON products
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update products" ON products
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete products" ON products
  FOR DELETE USING (is_admin());

CREATE POLICY "Admins can insert product variants" ON product_variants
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update product variants" ON product_variants
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete product variants" ON product_variants
  FOR DELETE USING (is_admin());
