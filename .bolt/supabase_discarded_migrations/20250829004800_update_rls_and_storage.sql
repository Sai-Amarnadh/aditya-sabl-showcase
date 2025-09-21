-- Create storage buckets for images

-- Create winners-photos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('winner-photos', 'winner-photos', true)
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
CREATE POLICY "Public read access for winner-photos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'winner-photos' );

CREATE POLICY "Public insert for winner-photos"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'winner-photos' );

CREATE POLICY "Public update for winner-photos"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'winner-photos' );

CREATE POLICY "Public delete for winner-photos"
ON storage.objects FOR DELETE
USING ( bucket_id = 'winner-photos' );

-- Policies for activity_posters
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

-- Policies for gallery_images
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


-- Update RLS policies for the 'winners' table to allow anonymous users to perform all operations.
-- This is necessary for the admin panel to function correctly without user authentication.

-- First, remove the old policies that restricted access to 'authenticated' users.
DROP POLICY IF EXISTS "Winners can be inserted by authenticated users" ON public.winners;
DROP POLICY IF EXISTS "Winners can be updated by authenticated users" ON public.winners;
DROP POLICY IF EXISTS "Winners can be deleted by authenticated users" ON public.winners;

-- Now, create new policies to allow public access for insert, update, and delete.
CREATE POLICY "Allow public insert on winners"
ON public.winners
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public update on winners"
ON public.winners
FOR UPDATE
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public delete on winners"
ON public.winners
FOR DELETE
TO anon, authenticated
USING (true);
