-- Create students table for storing all student details
CREATE TABLE IF NOT EXISTS public.students (
  id bigserial PRIMARY KEY,
  pin text UNIQUE NOT NULL,
  name text NOT NULL,
  branch text NOT NULL,
  year text NOT NULL,
  section text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policies for students table
CREATE POLICY "Students are viewable by everyone"
  ON public.students
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on students"
  ON public.students
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update on students"
  ON public.students
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public delete on students"
  ON public.students
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Add student_pin and marks columns to participants table
ALTER TABLE public.participants
ADD COLUMN IF NOT EXISTS student_pin text,
ADD COLUMN IF NOT EXISTS marks integer DEFAULT 2;

-- Create index for efficient PIN lookups
CREATE INDEX IF NOT EXISTS idx_students_pin ON public.students(pin);
CREATE INDEX IF NOT EXISTS idx_participants_student_pin ON public.participants(student_pin);