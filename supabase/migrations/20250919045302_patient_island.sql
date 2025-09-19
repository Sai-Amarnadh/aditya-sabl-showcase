/*
  # Create participants table for activities

  1. New Table
    - `participants`
      - `id` (bigint, primary key)
      - `activity_id` (bigint, references previous_activities)
      - `name` (text, required)
      - `roll_number` (text, required)
      - `department` (text, required)
      - `college` (text, required)
      - `award` (text, required - 1st Place, 2nd Place, 3rd Place, Participation)
      - `created_at` (timestamp, default now)

  2. Security
    - Enable RLS on participants table
    - Add policies for public read access
    - Add policies for public insert/update/delete (for admin panel)
*/

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id bigserial PRIMARY KEY,
  activity_id bigint NOT NULL REFERENCES previous_activities(id) ON DELETE CASCADE,
  name text NOT NULL,
  roll_number text NOT NULL,
  department text NOT NULL,
  college text NOT NULL DEFAULT 'Aditya University',
  award text NOT NULL CHECK (award IN ('1st Place', '2nd Place', '3rd Place', 'Participation')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for participants table
CREATE POLICY "Participants are viewable by everyone"
  ON participants
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on participants"
  ON participants
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update on participants"
  ON participants
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public delete on participants"
  ON participants
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create index for efficient querying
CREATE INDEX idx_participants_activity_id ON participants(activity_id);
CREATE INDEX idx_participants_award ON participants(award);