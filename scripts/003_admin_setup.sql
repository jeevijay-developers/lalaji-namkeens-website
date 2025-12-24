-- Create profiles table for admin users (references auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public read access for categories, products, and variants (customer-facing)
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active variants" ON product_variants
  FOR SELECT USING (is_active = true);

-- Quotations policies (customers can only see their own via mobile number, admins can see all)
CREATE POLICY "Anyone can insert quotations" ON quotations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own quotations" ON quotations
  FOR SELECT USING (true); -- Public read for tracking, filtered by app logic

-- Fixed infinite recursion by simplifying admin check
CREATE POLICY "Admins can manage quotations" ON quotations
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE is_active = true));

-- Quotation items policies
CREATE POLICY "Anyone can insert quotation items" ON quotation_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view quotation items" ON quotation_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage quotation items" ON quotation_items
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE is_active = true));

-- Orders policies (similar to quotations)
CREATE POLICY "Anyone can view orders" ON orders
  FOR SELECT USING (true); -- Public read for tracking, filtered by app logic

CREATE POLICY "Admins can manage orders" ON orders
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE is_active = true));

-- Order items policies
CREATE POLICY "Anyone can view order items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage order items" ON order_items
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE is_active = true));

-- Admin policies for managing products and categories
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE is_active = true));

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE is_active = true));

CREATE POLICY "Admins can manage product variants" ON product_variants
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE is_active = true));

-- Fixed profiles RLS to avoid recursion
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins can view all profiles" ON profiles
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'super_admin' AND is_active = true
    )
  );

CREATE POLICY "Admins can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger to auto-create profile for new admin users
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'role', 'admin')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin();
