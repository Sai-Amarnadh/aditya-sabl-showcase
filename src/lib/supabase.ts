import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      winners: {
        Row: {
          id: number;
          name: string;
          roll_number: string | null;
          event: string;
          date: string;
          photo_data: string | null;
          year: string;
          is_week_winner: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          roll_number?: string | null;
          event: string;
          date: string;
          photo_data?: string | null;
          year?: string;
          is_week_winner?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          roll_number?: string | null;
          event?: string;
          date?: string;
          photo_data?: string | null;
          year?: string;
          is_week_winner?: boolean | null;
          created_at?: string | null;
        };
      };
      upcoming_activities: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          activity_date: string;
          poster_data: string | null;
          details: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          activity_date: string;
          poster_data?: string | null;
          details?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          activity_date?: string;
          poster_data?: string | null;
          details?: string | null;
          created_at?: string | null;
        };
      };
      previous_activities: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          activity_date: string;
          poster_data: string | null;
          details: string | null;
          photos_data: string[] | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          activity_date: string;
          poster_data?: string | null;
          details?: string | null;
          photos_data?: string[] | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          activity_date?: string;
          poster_data?: string | null;
          details?: string | null;
          photos_data?: string[] | null;
          created_at?: string | null;
        };
      };
      gallery: {
        Row: {
          id: number;
          title: string | null;
          image_data: string;
          uploaded_at: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
          image_data: string;
          uploaded_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
          image_data?: string;
          uploaded_at?: string | null;
        };
      };
    };
  };
}