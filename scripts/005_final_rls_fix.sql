-- Completely disable RLS on profiles table since it's only used for authenticated admins
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Drop the security definer function if it exists
DROP FUNCTION IF EXISTS public.is_admin();

-- Drop all existing policies
DROP POLICY IF EXISTS "Public can view active categories" ON categories;
DROP POLICY IF EXISTS "Public can view active products" ON products;
DROP POLICY IF EXISTS "Public can view active variants" ON product_variants;
DROP POLICY IF EXISTS "Anyone can insert quotations" ON quotations;
DROP POLICY IF EXISTS "Users can view their own quotations" ON quotations;
DROP POLICY IF EXISTS "Admins can manage quotations" ON quotations;
DROP POLICY IF EXISTS "Public can view quotations" ON quotations;
DROP POLICY IF EXISTS "Admins can update quotations" ON quotations;
DROP POLICY IF EXISTS "Admins can delete quotations" ON quotations;
DROP POLICY IF EXISTS "Anyone can insert quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Anyone can view quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Public can view quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Admins can manage quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Admins can update quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Admins can delete quotation items" ON quotation_items;
DROP POLICY IF EXISTS "Anyone can view orders" ON orders;
DROP POLICY IF EXISTS "Public can view orders" ON orders;
DROP POLICY IF EXISTS "Admins can manage orders" ON orders;
DROP POLICY IF EXISTS "Admins can insert orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Admins can delete orders" ON orders;
DROP POLICY IF EXISTS "Anyone can view order items" ON order_items;
DROP POLICY IF EXISTS "Public can view order items" ON order_items;
DROP POLICY IF EXISTS "Admins can manage order items" ON order_items;
DROP POLICY IF EXISTS "Admins can insert order items" ON order_items;
DROP POLICY IF EXISTS "Admins can update order items" ON order_items;
DROP POLICY IF EXISTS "Admins can delete order items" ON order_items;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can insert categories" ON categories;
DROP POLICY IF EXISTS "Admins can update categories" ON categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;
DROP POLICY IF EXISTS "Admins can manage product variants" ON product_variants;
DROP POLICY IF EXISTS "Admins can insert product variants" ON product_variants;
DROP POLICY IF EXISTS "Admins can update product variants" ON product_variants;
DROP POLICY IF EXISTS "Admins can delete product variants" ON product_variants;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can insert profile" ON profiles;

-- Create helper function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_active = true
  );
$$;

-- Public read-only access for customer-facing data
CREATE POLICY "allow_public_select_categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "allow_public_select_products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "allow_public_select_variants" ON product_variants
  FOR SELECT USING (is_active = true);

-- Quotations - public insert, public read, admin manage
CREATE POLICY "allow_insert_quotations" ON quotations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_select_quotations" ON quotations
  FOR SELECT USING (true);

CREATE POLICY "allow_admin_update_quotations" ON quotations
  FOR UPDATE USING (check_is_admin());

CREATE POLICY "allow_admin_delete_quotations" ON quotations
  FOR DELETE USING (check_is_admin());

-- Quotation items
CREATE POLICY "allow_insert_quotation_items" ON quotation_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_select_quotation_items" ON quotation_items
  FOR SELECT USING (true);

CREATE POLICY "allow_admin_update_quotation_items" ON quotation_items
  FOR UPDATE USING (check_is_admin());

CREATE POLICY "allow_admin_delete_quotation_items" ON quotation_items
  FOR DELETE USING (check_is_admin());

-- Orders - public read for tracking, admin full control
CREATE POLICY "allow_select_orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "allow_admin_insert_orders" ON orders
  FOR INSERT WITH CHECK (check_is_admin());

CREATE POLICY "allow_admin_update_orders" ON orders
  FOR UPDATE USING (check_is_admin());

CREATE POLICY "allow_admin_delete_orders" ON orders
  FOR DELETE USING (check_is_admin());

-- Order items
CREATE POLICY "allow_select_order_items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "allow_admin_insert_order_items" ON order_items
  FOR INSERT WITH CHECK (check_is_admin());

CREATE POLICY "allow_admin_update_order_items" ON order_items
  FOR UPDATE USING (check_is_admin());

CREATE POLICY "allow_admin_delete_order_items" ON order_items
  FOR DELETE USING (check_is_admin());

-- Categories - admin full control
CREATE POLICY "allow_admin_insert_categories" ON categories
  FOR INSERT WITH CHECK (check_is_admin());

CREATE POLICY "allow_admin_update_categories" ON categories
  FOR UPDATE USING (check_is_admin());

CREATE POLICY "allow_admin_delete_categories" ON categories
  FOR DELETE USING (check_is_admin());

-- Products - admin full control
CREATE POLICY "allow_admin_insert_products" ON products
  FOR INSERT WITH CHECK (check_is_admin());

CREATE POLICY "allow_admin_update_products" ON products
  FOR UPDATE USING (check_is_admin());

CREATE POLICY "allow_admin_delete_products" ON products
  FOR DELETE USING (check_is_admin());

-- Product variants - admin full control
CREATE POLICY "allow_admin_insert_variants" ON product_variants
  FOR INSERT WITH CHECK (check_is_admin());

CREATE POLICY "allow_admin_update_variants" ON product_variants
  FOR UPDATE USING (check_is_admin());

CREATE POLICY "allow_admin_delete_variants" ON product_variants
  FOR DELETE USING (check_is_admin());
