import { winners as mockWinners, activities as mockActivities, Winner, Activity } from '@/data/mockData';

export type { Winner, Activity };

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

const WINNERS_KEY = 'winners';
const ACTIVITIES_KEY = 'activities';
const GALLERY_KEY = 'gallery';

// --- Initialization ---
const initializeData = () => {
  if (!localStorage.getItem(WINNERS_KEY)) {
    localStorage.setItem(WINNERS_KEY, JSON.stringify(mockWinners));
  }
  if (!localStorage.getItem(ACTIVITIES_KEY)) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(mockActivities));
  }
  if (!localStorage.getItem(GALLERY_KEY)) {
    localStorage.setItem(GALLERY_KEY, JSON.stringify([])); // Start with an empty gallery
  }
};

initializeData();

// --- Generic Functions ---
const getData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveData = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const addItem = <T extends { id: string }>(key: string, item: Omit<T, 'id'>): T => {
  const items = getData<T>(key);
  const newItem = { ...item, id: new Date().toISOString() } as T;
  const updatedItems = [...items, newItem];
  saveData(key, updatedItems);
  return newItem;
};

const updateItem = <T extends { id: string }>(key: string, updatedItem: T): T => {
  const items = getData<T>(key);
  const updatedItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item));
  saveData(key, updatedItems);
  return updatedItem;
};

const deleteItem = <T extends { id: string }>(key: string, id: string): void => {
  const items = getData<T>(key);
  const updatedItems = items.filter(item => item.id !== id);
  saveData(key, updatedItems);
};

// --- Winners ---
export const getWinners = (): Winner[] => getData<Winner>(WINNERS_KEY);
export const addWinner = (winner: Omit<Winner, 'id'>) => addItem<Winner>(WINNERS_KEY, winner);
export const updateWinner = (winner: Winner) => updateItem<Winner>(WINNERS_KEY, winner);
export const deleteWinner = (id: string) => deleteItem<Winner>(WINNERS_KEY, id);

// --- Activities ---
export const getActivities = (): Activity[] => getData<Activity>(ACTIVITIES_KEY);
export const getActivity = (id: string): Activity | undefined => getData<Activity>(ACTIVITIES_KEY).find(a => a.id === id);
export const addActivity = (activity: Omit<Activity, 'id'>) => addItem<Activity>(ACTIVITIES_KEY, activity);
export const updateActivity = (activity: Activity) => updateItem<Activity>(ACTIVITIES_KEY, activity);
export const deleteActivity = (id: string) => deleteItem<Activity>(ACTIVITIES_KEY, id);

// --- Gallery ---
export const getGalleryImages = (): GalleryImage[] => getData<GalleryImage>(GALLERY_KEY);
export const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => addItem<GalleryImage>(GALLERY_KEY, image);
export const updateGalleryImage = (image: GalleryImage) => updateItem<GalleryImage>(GALLERY_KEY, image);
export const deleteGalleryImage = (id: string) => deleteItem<GalleryImage>(GALLERY_KEY, id);
