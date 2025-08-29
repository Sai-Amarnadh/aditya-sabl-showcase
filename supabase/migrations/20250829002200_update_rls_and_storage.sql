-- Create a new public bucket for winner photos.
INSERT INTO storage.buckets (id, name, public)
VALUES ('winner-photos', 'winner-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for the new 'winner-photos' bucket to allow public access.
-- This allows anyone to view, upload, update, and delete files in this bucket.
-- Note: This is for development/admin panel convenience. For production, you might want more restrictive policies.

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
