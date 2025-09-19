/*
  # Create participants table for activity registration

  1. New Tables
    - `participants`
      - `id` (bigint, primary key, auto-increment)
      - `activity_id` (bigint, foreign key to previous_activities)
      - `name` (text, required)
      - `roll_number` (text, required)
      - `department` (text, required)
      - `college` (text, required, default 'Aditya University')
      - `award` (text, required, default 'Participation')
      - `created_at` (timestamp, default now())

  2. Security
    - Enable RLS on `participants` table
    - Add policies for public access (read, insert, update, delete)

  3. Indexes
    - Index on activity_id for faster queries
    - Index on award for filtering
*/

-- Create participants table if it doesn't exist
CREATE TABLE IF NOT EXISTS participants (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  activity_id bigint NOT NULL,
  name text NOT NULL,
  roll_number text NOT NULL,
  department text NOT NULL,
  college text NOT NULL DEFAULT 'Aditya University',
  award text NOT NULL DEFAULT 'Participation',
  created_at timestamptz DEFAULT now()
);

-- Add foreign key constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'participants_activity_id_fkey'
  ) THEN
    ALTER TABLE participants 
    ADD CONSTRAINT participants_activity_id_fkey 
    FOREIGN KEY (activity_id) REFERENCES previous_activities(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY IF NOT EXISTS "Participants are viewable by everyone"
  ON participants
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public insert on participants"
  ON participants
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public update on participants"
  ON participants
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public delete on participants"
  ON participants
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_participants_activity_id ON participants(activity_id);
CREATE INDEX IF NOT EXISTS idx_participants_award ON participants(award);
CREATE INDEX IF NOT EXISTS idx_participants_department ON participants(department);