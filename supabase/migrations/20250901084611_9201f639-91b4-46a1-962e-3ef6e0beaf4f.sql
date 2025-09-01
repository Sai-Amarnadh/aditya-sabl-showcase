-- Add missing details column to previous_activities table
ALTER TABLE public.previous_activities 
ADD COLUMN IF NOT EXISTS details TEXT;