/*
  # Add Default Products and Cart Tables

  1. New Tables
    - `cart_items` - Stores shopping cart items
      - `id` (UUID, primary key)
      - `user_id` (UUID) - Anonymous or authenticated user ID
      - `product_id` (UUID, references products.id)
      - `quantity` (integer)
      - `created_at` (timestamp)

  2. Default Data
    - Add initial set of electronic accessories products
    
  3. Security
    - Enable RLS on cart_items table
    - Add policies for cart management
*/

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Cart policies
CREATE POLICY "Users can manage their own cart items"
  ON cart_items
  USING (auth.uid() = user_id);

-- Insert default products
INSERT INTO products (name, price, description, category, image_url) VALUES
  (
    'Écouteurs Bluetooth Pro',
    79.99,
    'Écouteurs sans fil avec réduction active du bruit, autonomie de 24h et qualité audio exceptionnelle.',
    'Écouteurs',
    'earbuds-pro.jpg'
  ),
  (
    'Chargeur Rapide 65W',
    39.99,
    'Chargeur USB-C compatible avec tous les appareils, charge ultra-rapide et protection intégrée.',
    'Chargeurs',
    'fast-charger.jpg'
  ),
  (
    'Câble USB-C Premium',
    19.99,
    'Câble tressé en nylon de 2m, transfert rapide et charge optimale pour tous vos appareils.',
    'Câbles',
    'usb-cable.jpg'
  ),
  (
    'Support Téléphone Magnétique',
    24.99,
    'Support voiture magnétique avec fixation dashboard, compatible avec tous les smartphones.',
    'Supports',
    'phone-mount.jpg'
  ),
  (
    'Powerbank 20000mAh',
    49.99,
    'Batterie externe haute capacité avec charge rapide et 3 ports USB, parfaite pour vos voyages.',
    'Batteries',
    'powerbank.jpg'
  ),
  (
    'Coque Protection Premium',
    29.99,
    'Coque antichoc avec protection maximale et design élégant pour iPhone et Samsung.',
    'Protection',
    'phone-case.jpg'
  );