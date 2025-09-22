/*
  # Add missing columns to existing tables

  1. Updates to winners table
    - Add `position` column (integer, default 1)
    - Add `activity_type` column (text, default 'General')
    - Add `week_number` column (integer, nullable)

  2. Updates to upcoming_activities table
    - Add `form_link` column (text, nullable)
    - Add `image_url` column (text, nullable) if not exists

  3. Updates to previous_activities table
    - Add `form_link` column (text, nullable) if not exists

  4. Storage buckets
    - Create activity_posters bucket
    - Create gallery_images bucket
*/

-- Add missing columns to winners table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'winners' AND column_name = 'position'
  ) THEN
    ALTER TABLE winners ADD COLUMN position integer DEFAULT 1;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'winners' AND column_name = 'activity_type'
  ) THEN
    ALTER TABLE winners ADD COLUMN activity_type text DEFAULT 'General';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'winners' AND column_name = 'week_number'
  ) THEN
    ALTER TABLE winners ADD COLUMN week_number integer;
  END IF;
END $$;

-- Add missing columns to upcoming_activities table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'upcoming_activities' AND column_name = 'form_link'
  ) THEN
    ALTER TABLE upcoming_activities ADD COLUMN form_link text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'upcoming_activities' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE upcoming_activities ADD COLUMN image_url text;
  END IF;
END $$;

-- Add missing columns to previous_activities table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'previous_activities' AND column_name = 'form_link'
  ) THEN
    ALTER TABLE previous_activities ADD COLUMN form_link text;
  END IF;
END $$;

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('activity_posters', 'activity_posters', true),
  ('gallery_images', 'gallery_images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for activity_posters bucket
CREATE POLICY "Public read access for activity_posters"
ON storage.objects FOR SELECT
USING ( bucket_id = 'activity_posters' );

CREATE POLICY "Public insert for activity_posters"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'activity_posters' );

CREATE POLICY "Public update for activity_posters"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'activity_posters' );

CREATE POLICY "Public delete for activity_posters"
ON storage.objects FOR DELETE
USING ( bucket_id = 'activity_posters' );

-- Create storage policies for gallery_images bucket
CREATE POLICY "Public read access for gallery_images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery_images' );

CREATE POLICY "Public insert for gallery_images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery_images' );

CREATE POLICY "Public update for gallery_images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'gallery_images' );

CREATE POLICY "Public delete for gallery_images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'gallery_images' );