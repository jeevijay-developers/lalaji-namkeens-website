-- Insert sample categories
INSERT INTO categories (name_en, name_hi, slug, display_order) VALUES
('Namkeen', 'नमकीन', 'namkeen', 1),
('Sweets', 'मिठाई', 'sweets', 2),
('Snacks', 'स्नैक्स', 'snacks', 3),
('Festival Special', 'त्योहार विशेष', 'festival-special', 4);

-- Insert sample products with Hindi names
-- Fixed INSERT to specify all columns including is_active
INSERT INTO products (category_id, name_en, name_hi, slug, description_en, description_hi, is_featured, is_active, display_order)
SELECT 
  c.id,
  'Bhujia',
  'भुजिया',
  'bhujia',
  'Crispy and spicy fried snack made from moth dal and spices',
  'मोठ दाल और मसालों से बना कुरकुरा और मसालेदार फ्राइड स्नैक',
  true,
  true,
  1
FROM categories c WHERE c.slug = 'namkeen';

INSERT INTO products (category_id, name_en, name_hi, slug, description_en, description_hi, is_featured, is_active, display_order)
SELECT 
  c.id,
  'Sev',
  'सेव',
  'sev',
  'Traditional thin crispy noodles made from gram flour',
  'बेसन से बने पारंपरिक पतले कुरकुरे नूडल्स',
  true,
  true,
  2
FROM categories c WHERE c.slug = 'namkeen';

INSERT INTO products (category_id, name_en, name_hi, slug, description_en, description_hi, is_featured, is_active, display_order)
SELECT 
  c.id,
  'Mixture',
  'मिक्सचर',
  'mixture',
  'Delicious blend of various crunchy ingredients and spices',
  'विभिन्न कुरकुरे सामग्री और मसालों का स्वादिष्ट मिश्रण',
  true,
  true,
  3
FROM categories c WHERE c.slug = 'namkeen';

INSERT INTO products (category_id, name_en, name_hi, slug, description_en, description_hi, is_featured, is_active, display_order)
SELECT 
  c.id,
  'Moong Dal',
  'मूंग दाल',
  'moong-dal',
  'Crispy fried split yellow moong dal snack',
  'कुरकुरी तली हुई पीली मूंग की दाल',
  false,
  true,
  4
FROM categories c WHERE c.slug = 'namkeen';

INSERT INTO products (category_id, name_en, name_hi, slug, description_en, description_hi, is_featured, is_active, display_order)
SELECT 
  c.id,
  'Chana Dal',
  'चना दाल',
  'chana-dal',
  'Roasted Bengal gram dal with spices',
  'मसालों के साथ भुनी हुई चना दाल',
  false,
  true,
  5
FROM categories c WHERE c.slug = 'namkeen';

INSERT INTO products (category_id, name_en, name_hi, slug, description_en, description_hi, is_featured, is_active, display_order)
SELECT 
  c.id,
  'Ladoo',
  'लड्डू',
  'ladoo',
  'Traditional sweet balls made with gram flour and jaggery',
  'बेसन और गुड़ से बने पारंपरिक मीठे लड्डू',
  true,
  true,
  1
FROM categories c WHERE c.slug = 'sweets';

INSERT INTO products (category_id, name_en, name_hi, slug, description_en, description_hi, is_featured, is_active, display_order)
SELECT 
  c.id,
  'Mathri',
  'मठरी',
  'mathri',
  'Crispy flaky biscuits perfect with tea',
  'चाय के साथ परफेक्ट कुरकुरी परतदार बिस्कुट',
  false,
  true,
  6
FROM categories c WHERE c.slug = 'snacks';

-- Insert product variants for each product
-- Specify all columns including is_active for variants
INSERT INTO product_variants (product_id, weight_grams, weight_label_en, weight_label_hi, is_active, display_order)
SELECT id, 250, '250g', '250 ग्राम', true, 1 FROM products;

INSERT INTO product_variants (product_id, weight_grams, weight_label_en, weight_label_hi, is_active, display_order)
SELECT id, 500, '500g', '500 ग्राम', true, 2 FROM products;

INSERT INTO product_variants (product_id, weight_grams, weight_label_en, weight_label_hi, is_active, display_order)
SELECT id, 1000, '1kg', '1 किलो', true, 3 FROM products;
