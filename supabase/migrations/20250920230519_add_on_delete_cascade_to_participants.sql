-- This migration updates the foreign key constraint on the 'participants' table.
-- It adds the ON DELETE CASCADE option, which means that if an activity
-- in 'previous_activities' is deleted, all corresponding participants will
-- also be automatically deleted.

-- Step 1: Drop the existing foreign key constraint, if it exists.
ALTER TABLE public.participants
DROP CONSTRAINT IF EXISTS participants_activity_id_fkey;

-- Step 2: Add the new foreign key constraint with ON DELETE CASCADE.
ALTER TABLE public.participants
ADD CONSTRAINT participants_activity_id_fkey
FOREIGN KEY (activity_id)
REFERENCES public.previous_activities (id)
ON DELETE CASCADE;
