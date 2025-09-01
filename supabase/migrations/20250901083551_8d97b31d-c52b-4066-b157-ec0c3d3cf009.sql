-- Fix gallery table structure
ALTER TABLE public.gallery 
DROP COLUMN IF EXISTS image_data,
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Fix previous_activities table structure  
ALTER TABLE public.previous_activities
DROP COLUMN IF EXISTS image_data,
ADD COLUMN IF NOT EXISTS poster_url TEXT,
ADD COLUMN IF NOT EXISTS photos TEXT[];

-- Fix upcoming_activities table structure
ALTER TABLE public.upcoming_activities
ADD COLUMN IF NOT EXISTS poster_url TEXT;