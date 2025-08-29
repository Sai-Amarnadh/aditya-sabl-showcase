-- Create storage buckets for images

-- Create winners_photos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('winners_photos', 'winners_photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create activity_posters bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('activity_posters', 'activity_posters', true)
ON CONFLICT (id) DO NOTHING;

-- Create gallery_images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery_images', 'gallery_images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the buckets to allow public access for reads
-- and authenticated access for inserts, updates, and deletes.
-- This assumes you have a policy for authenticated users.
-- If you want to allow anonymous uploads, you might need to adjust the policies.

-- Policies for winners_photos
CREATE POLICY "Public read access for winners_photos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'winners_photos' );

CREATE POLICY "Authenticated users can upload to winners_photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'winners_photos' );

CREATE POLICY "Authenticated users can update in winners_photos"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'winners_photos' );

CREATE POLICY "Authenticated users can delete from winners_photos"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'winners_photos' );

-- Policies for activity_posters
CREATE POLICY "Public read access for activity_posters"
ON storage.objects FOR SELECT
USING ( bucket_id = 'activity_posters' );

CREATE POLICY "Authenticated users can upload to activity_posters"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'activity_posters' );

CREATE POLICY "Authenticated users can update in activity_posters"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'activity_posters' );

CREATE POLICY "Authenticated users can delete from activity_posters"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'activity_posters' );

-- Policies for gallery_images
CREATE POLICY "Public read access for gallery_images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery_images' );

CREATE POLICY "Authenticated users can upload to gallery_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'gallery_images' );

CREATE POLICY "Authenticated users can update in gallery_images"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'gallery_images' );

CREATE POLICY "Authenticated users can delete from gallery_images"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'gallery_images' );
