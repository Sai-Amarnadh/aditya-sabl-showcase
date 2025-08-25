/*
  # Create SABL Activities Database Schema

  1. New Tables
    - `winners`
      - `id` (bigint, primary key)
      - `name` (text, required)
      - `roll_number` (text, optional)
      - `event` (text, required)
      - `date` (date, required)
      - `photo_url` (text, optional)
      - `year` (text, required)
      - `is_week_winner` (boolean, default false)
      - `created_at` (timestamp, default now)
    
    - `upcoming_activities`
      - `id` (bigint, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `activity_date` (date, required)
      - `poster_url` (text, optional)
      - `details` (text, optional)
      - `created_at` (timestamp, default now)
    
    - `previous_activities`
      - `id` (bigint, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `activity_date` (date, required)
      - `poster_url` (text, optional)
      - `details` (text, optional)
      - `photos` (text array, optional)
      - `created_at` (timestamp, default now)
    
    - `gallery`
      - `id` (bigint, primary key)
      - `title` (text, optional)
      - `image_url` (text, required)
      - `uploaded_at` (timestamp, default now)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated insert/update/delete
*/

-- Create winners table
CREATE TABLE IF NOT EXISTS winners (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  roll_number text,
  event text NOT NULL,
  date date NOT NULL,
  photo_url text,
  year text NOT NULL DEFAULT '2024',
  is_week_winner boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create upcoming_activities table
CREATE TABLE IF NOT EXISTS upcoming_activities (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text,
  activity_date date NOT NULL,
  poster_url text,
  details text,
  created_at timestamptz DEFAULT now()
);

-- Create previous_activities table
CREATE TABLE IF NOT EXISTS previous_activities (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text,
  activity_date date NOT NULL,
  poster_url text,
  details text,
  photos text[],
  created_at timestamptz DEFAULT now()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id bigserial PRIMARY KEY,
  title text,
  image_url text NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE upcoming_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE previous_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for winners table
CREATE POLICY "Winners are viewable by everyone"
  ON winners
  FOR SELECT
  USING (true);

CREATE POLICY "Winners can be inserted by authenticated users"
  ON winners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Winners can be updated by authenticated users"
  ON winners
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Winners can be deleted by authenticated users"
  ON winners
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for upcoming_activities table
CREATE POLICY "Upcoming activities are viewable by everyone"
  ON upcoming_activities
  FOR SELECT
  USING (true);

CREATE POLICY "Upcoming activities can be inserted by authenticated users"
  ON upcoming_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Upcoming activities can be updated by authenticated users"
  ON upcoming_activities
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Upcoming activities can be deleted by authenticated users"
  ON upcoming_activities
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for previous_activities table
CREATE POLICY "Previous activities are viewable by everyone"
  ON previous_activities
  FOR SELECT
  USING (true);

CREATE POLICY "Previous activities can be inserted by authenticated users"
  ON previous_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Previous activities can be updated by authenticated users"
  ON previous_activities
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Previous activities can be deleted by authenticated users"
  ON previous_activities
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for gallery table
CREATE POLICY "Gallery images are viewable by everyone"
  ON gallery
  FOR SELECT
  USING (true);

CREATE POLICY "Gallery images can be inserted by authenticated users"
  ON gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Gallery images can be updated by authenticated users"
  ON gallery
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Gallery images can be deleted by authenticated users"
  ON gallery
  FOR DELETE
  TO authenticated
  USING (true);