/*
  # Initial Schema Setup for E-commerce Platform

  1. New Tables
    - `products` - Stores product information
      - `id` (UUID, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `price` (numeric)
      - `description` (text)
      - `category` (text)
      - `image_url` (text, nullable)
      
  2. Security
    - Enable RLS on `products` table
    - Add policies for:
      - Public read access to products
      - Authenticated users can manage products (admin-only operations)
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view products
CREATE POLICY "Products are viewable by everyone" 
  ON products
  FOR SELECT
  USING (true);

-- Only authenticated users can insert, update, delete products
CREATE POLICY "Authenticated users can manage products" 
  ON products
  USING (auth.role() = 'authenticated');