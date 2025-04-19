/*
  # Update Cart Items Policy

  1. Changes
    - Update RLS policy to allow anonymous users
    - Add policy for both authenticated and anonymous users

  2. Security
    - Users can only access their own cart items
    - Anonymous users can manage their cart using their anonymous ID
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Users can manage their own cart items" ON cart_items;

-- Create new policy that handles both authenticated and anonymous users
CREATE POLICY "Users can manage their cart items"
  ON cart_items
  USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN auth.uid() = user_id
      ELSE user_id = current_setting('app.anonymous_user_id', TRUE)::uuid
    END
  );