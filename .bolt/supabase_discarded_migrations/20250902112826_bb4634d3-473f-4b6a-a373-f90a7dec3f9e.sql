-- Add new columns to winners table for weekly activity system
ALTER TABLE public.winners 
ADD COLUMN position INTEGER DEFAULT 1,
ADD COLUMN activity_type TEXT DEFAULT 'General',
ADD COLUMN week_number INTEGER;

-- Create index for efficient querying by week
CREATE INDEX idx_winners_week_activity ON public.winners(week_number, activity_type, position);

-- Update existing records to have default values
UPDATE public.winners 
SET position = 1, 
    activity_type = 'General',
    week_number = EXTRACT(WEEK FROM date)
WHERE position IS NULL;