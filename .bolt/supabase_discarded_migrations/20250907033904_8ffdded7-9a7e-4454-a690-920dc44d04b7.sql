-- Add form_link column to upcoming_activities table
ALTER TABLE public.upcoming_activities 
ADD COLUMN form_link text;

-- Add form_link column to previous_activities table  
ALTER TABLE public.previous_activities 
ADD COLUMN form_link text;