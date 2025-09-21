-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id bigserial PRIMARY KEY,
  activity_id bigint NOT NULL,
  name text NOT NULL,
  roll_number text NOT NULL,
  department text NOT NULL,
  college text NOT NULL,
  award text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- NOTE: A foreign key constraint on 'activity_id' is not added here because activities
-- are split across two tables ('upcoming_activities' and 'previous_activities').
-- A better long-term solution is to merge these into a single 'activities' table.

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for participants table
CREATE POLICY "Participants are viewable by everyone"
  ON participants
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert participants"
  ON participants
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update participants"
  ON participants
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete participants"
  ON participants
  FOR DELETE
  USING (true);
