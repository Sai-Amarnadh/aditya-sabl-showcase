
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Types
export interface Winner {
  id: string;
  name: string;
  rollNumber?: string;
  event: string;
  date: string;
  photo: string;
  year: string;
  isThisWeekWinner?: boolean;
  position?: number;
  activityType?: string;
  weekNumber?: number;
}

export interface Activity {
  id: string;
  name: string;
  date: string;
  description: string;
  details?: string;
  poster?: string;
  photos?: string[];
  status: 'upcoming' | 'completed';
  formLink?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

type WinnerRow = Database['public']['Tables']['winners']['Row'];
type UpcomingActivityRow = Database['public']['Tables']['upcoming_activities']['Row'];
type PreviousActivityRow = Database['public']['Tables']['previous_activities']['Row'];
type GalleryRow = Database['public']['Tables']['gallery']['Row'];

// Helper function to transform database row to Winner
const transformWinnerFromDB = (row: WinnerRow): Winner => ({
  id: String(row.id || ''),
  name: row.name || 'Unknown Name',
  rollNumber: row.roll_number || undefined,
  event: row.event || 'Unknown Event',
  date: row.date || new Date().toISOString(),
  photo: row.photo_url || '',
  year: String(row.year || new Date().getFullYear()),
  isThisWeekWinner: row.is_week_winner || false,
  position: row.position || 1,
  activityType: row.activity_type || 'General',
  weekNumber: row.week_number || undefined,
});

// Helper function to transform Winner to database format
const transformWinnerToDB = (winner: Omit<Winner, 'id'>): Omit<Database['public']['Tables']['winners']['Insert'], 'id' | 'created_at'> => ({
  name: winner.name,
  roll_number: winner.rollNumber || '',
  event: winner.event,
  date: winner.date,
  photo_url: winner.photo,
  year: parseInt(winner.year) || new Date().getFullYear(),
  is_week_winner: winner.isThisWeekWinner || false,
  position: winner.position || 1,
  activity_type: winner.activityType || 'General',
  week_number: winner.weekNumber || null,
});

// Helper function to transform database row to Activity
const transformActivityFromDB = (row: UpcomingActivityRow | PreviousActivityRow, status: 'upcoming' | 'completed'): Activity => ({
  id: row.id.toString(),
  name: row.title,
  date: row.activity_date,
  description: row.description || '',
  details: ('details' in row ? row.details : undefined) || undefined,
  poster: row.poster_url || undefined,
  photos: 'photos' in row ? row.photos || [] : [],
  status,
  formLink: ('form_link' in row ? row.form_link : undefined) as string | undefined,
});

// Helper function to transform Activity to database format for upcoming activities
const transformActivityToUpcomingDB = (activity: Omit<Activity, 'id'>): Omit<Database['public']['Tables']['upcoming_activities']['Insert'], 'id' | 'created_at'> => ({
  title: activity.name,
  activity_date: activity.date,
  description: activity.description || null,
  details: activity.details || null,
  poster_url: activity.poster || null,
  form_link: activity.formLink || null,
});

// Helper function to transform Activity to database format for previous activities
const transformActivityToPreviousDB = (activity: Omit<Activity, 'id'>): Omit<Database['public']['Tables']['previous_activities']['Insert'], 'id' | 'created_at'> => ({
  title: activity.name,
  activity_date: activity.date,
  description: activity.description || null,
  details: activity.details || null,
  poster_url: activity.poster || null,
  photos: activity.photos || null,
  form_link: activity.formLink || null,
});

// Helper function to transform database row to GalleryImage
const transformGalleryFromDB = (row: GalleryRow): GalleryImage => ({
  id: row.id.toString(),
  url: row.image_url || '',
  caption: row.title || '',
});

// Helper function to transform GalleryImage to database format
const transformGalleryToDB = (image: Omit<GalleryImage, 'id'>): Omit<Database['public']['Tables']['gallery']['Insert'], 'id' | 'uploaded_at'> => ({
  image_url: image.url,
  title: image.caption || null,
});

// --- Winners ---
export const getWinners = async (): Promise<Winner[]> => {
  const { data, error } = await supabase
    .from('winners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching winners:', error);
    throw new Error(error.message);
  }

  return data?.map(transformWinnerFromDB).filter(winner => winner.id) || [];
};

export const addWinner = async (winner: Omit<Winner, 'id'>): Promise<Winner | null> => {
  try {
    const { data, error } = await supabase
      .from('winners')
      .insert([transformWinnerToDB(winner)])
      .select()
      .single();

    if (error) throw error;
    return data ? transformWinnerFromDB(data) : null;
  } catch (error) {
    console.error('Error adding winner:', error);
    return null;
  }
};

export const updateWinner = async (winner: Winner): Promise<Winner | null> => {
  try {
    const { data, error } = await supabase
      .from('winners')
      .update(transformWinnerToDB(winner))
      .eq('id', parseInt(winner.id))
      .select()
      .single();

    if (error) throw error;
    return data ? transformWinnerFromDB(data) : null;
  } catch (error) {
    console.error('Error updating winner:', error);
    return null;
  }
};

export const deleteWinner = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('winners')
      .delete()
      .eq('id', parseInt(id));

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting winner:', error);
    return false;
  }
};

// --- Storage ---
export const uploadImage = async (file: File, bucket: string): Promise<string | null> => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// --- Activities ---
export const getActivities = async (): Promise<Activity[]> => {
  try {
    const [upcomingResult, previousResult] = await Promise.all([
      supabase
        .from('upcoming_activities')
        .select('*')
        .order('activity_date', { ascending: true }),
      supabase
        .from('previous_activities')
        .select('*')
        .order('activity_date', { ascending: false })
    ]);

    const upcoming = upcomingResult.data?.map(row => transformActivityFromDB(row, 'upcoming')) || [];
    const previous = previousResult.data?.map(row => transformActivityFromDB(row, 'completed')) || [];

    return [...upcoming, ...previous];
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};

export const getActivity = async (id: string): Promise<Activity | undefined> => {
  try {
    // Try upcoming activities first
    const { data: upcomingData } = await supabase
      .from('upcoming_activities')
      .select('*')
      .eq('id', parseInt(id))
      .maybeSingle();

    if (upcomingData) {
      return transformActivityFromDB(upcomingData, 'upcoming');
    }

    // Try previous activities
    const { data: previousData } = await supabase
      .from('previous_activities')
      .select('*')
      .eq('id', parseInt(id))
      .maybeSingle();

    if (previousData) {
      return transformActivityFromDB(previousData, 'completed');
    }

    return undefined;
  } catch (error) {
    console.error('Error fetching activity:', error);
    return undefined;
  }
};

export const addActivity = async (activity: Omit<Activity, 'id'>): Promise<Activity | null> => {
  try {
    if (activity.status === 'upcoming') {
      const { data, error } = await supabase
        .from('upcoming_activities')
        .insert([transformActivityToUpcomingDB(activity)])
        .select()
        .single();

      if (error) throw error;
      return data ? transformActivityFromDB(data, 'upcoming') : null;
    } else {
      const { data, error } = await supabase
        .from('previous_activities')
        .insert([transformActivityToPreviousDB(activity)])
        .select()
        .single();

      if (error) throw error;
      return data ? transformActivityFromDB(data, 'completed') : null;
    }
  } catch (error) {
    console.error('Error adding activity:', error);
    return null;
  }
};

export const updateActivity = async (activity: Activity): Promise<Activity | null> => {
  try {
    if (activity.status === 'upcoming') {
      const { data, error } = await supabase
        .from('upcoming_activities')
        .update(transformActivityToUpcomingDB(activity))
        .eq('id', parseInt(activity.id))
        .select()
        .single();

      if (error) throw error;
      return data ? transformActivityFromDB(data, 'upcoming') : null;
    } else {
      const { data, error } = await supabase
        .from('previous_activities')
        .update(transformActivityToPreviousDB(activity))
        .eq('id', parseInt(activity.id))
        .select()
        .single();

      if (error) throw error;
      return data ? transformActivityFromDB(data, 'completed') : null;
    }
  } catch (error) {
    console.error('Error updating activity:', error);
    return null;
  }
};

export const deleteActivity = async (id: string): Promise<boolean> => {
  try {
    // Try deleting from upcoming activities first
    const { error: upcomingError } = await supabase
      .from('upcoming_activities')
      .delete()
      .eq('id', parseInt(id));

    if (!upcomingError) return true;

    // Try deleting from previous activities
    const { error: previousError } = await supabase
      .from('previous_activities')
      .delete()
      .eq('id', parseInt(id));

    if (previousError) throw previousError;
    return true;
  } catch (error) {
    console.error('Error deleting activity:', error);
    return false;
  }
};

// --- Gallery ---
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data?.map(transformGalleryFromDB) || [];
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
};

export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage | null> => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([transformGalleryToDB(image)])
      .select()
      .single();

    if (error) throw error;
    return data ? transformGalleryFromDB(data) : null;
  } catch (error) {
    console.error('Error adding gallery image:', error);
    return null;
  }
};

export const updateGalleryImage = async (image: GalleryImage): Promise<GalleryImage | null> => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .update(transformGalleryToDB(image))
      .eq('id', parseInt(image.id))
      .select()
      .single();

    if (error) throw error;
    return data ? transformGalleryFromDB(data) : null;
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return null;
  }
};

export const deleteGalleryImage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', parseInt(id));

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return false;
  }
};
