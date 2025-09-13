
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import * as DataService from '@/lib/data-service';
import { Winner, Activity, GalleryImage } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import ActivityPhotoManager from '@/components/ActivityPhotoManager';

// Mock participant data for activities
const mockParticipants = [
  { sno: 1, department: 'CSE', rollNo: 'CSE001', name: 'John Doe', award: '1st Place', college: 'Aditya University' },
  { sno: 2, department: 'CSE', rollNo: 'CSE002', name: 'Jane Smith', award: '2nd Place', college: 'Aditya University' },
  { sno: 3, department: 'ECE', rollNo: 'ECE001', name: 'Mike Johnson', award: '3rd Place', college: 'Aditya University' },
  { sno: 4, department: 'CSE', rollNo: 'CSE003', name: 'Sarah Wilson', award: 'Participation', college: 'Aditya University' },
  { sno: 5, department: 'IT', rollNo: 'IT001', name: 'David Brown', award: 'Participation', college: 'Aditya University' },
  { sno: 6, department: 'CSE', rollNo: 'CSE004', name: 'Emily Davis', award: 'Participation', college: 'Aditya University' },
  { sno: 7, department: 'ECE', rollNo: 'ECE002', name: 'Chris Miller', award: 'Participation', college: 'Aditya University' },
  { sno: 8, department: 'IT', rollNo: 'IT002', name: 'Lisa Garcia', award: 'Participation', college: 'Aditya University' },
];

// Participant form state
interface ParticipantFormState {
  department: string;
  rollNo: string;
  name: string;
  award: string;
  college: string;
}

// Define new types for form state to handle file uploads
type WinnerFormState = Omit<Winner, 'id' | 'photo'> & { photo: File | string | null };
type ActivityFormState = Omit<Activity, 'id' | 'poster' | 'photos'> & { poster: File | string | null; photos: FileList | string[] | null };
type GalleryImageFormState = Omit<GalleryImage, 'id' | 'url'> & { url: File | string | null };

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [winnerLoading, setWinnerLoading] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [selectedActivityForParticipants, setSelectedActivityForParticipants] = useState<Activity | null>(null);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState<ParticipantFormState>({
    department: '',
    rollNo: '',
    name: '',
    award: '',
    college: 'Aditya University'
  });

  const { triggerDataChange } = useData();
  const [winners, setWinners] = useState<Winner[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // Form state for new winner
  const initialWinnerState: WinnerFormState = { name: '', rollNumber: '', event: '', date: '', photo: null, year: '', isThisWeekWinner: false, position: 1, activityType: 'Activity 1', weekNumber: undefined };
  const [newWinner, setNewWinner] = useState<WinnerFormState>(initialWinnerState);
  const [editingWinner, setEditingWinner] = useState<Winner | null>(null);

  // Form state for new activity
  const initialActivityState: ActivityFormState = { name: '', date: '', description: '', status: 'upcoming', details: '', poster: null, photos: null, formLink: '' };
  const [newActivity, setNewActivity] = useState<ActivityFormState>(initialActivityState);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Form state for new gallery image
  const initialGalleryImageState: GalleryImageFormState = { url: null, caption: '' };
  const [newGalleryImage, setNewGalleryImage] = useState<GalleryImageFormState>(initialGalleryImageState);
  const [editingGalleryImage, setEditingGalleryImage] = useState<GalleryImage | null>(null);

  const { dataChanged } = useData();

  const handleViewParticipants = (activity: Activity) => {
    setSelectedActivityForParticipants(activity);
    setIsParticipantsModalOpen(true);
  };

  const handleAddParticipant = () => {
    // In a real app, this would save to database
    console.log('Adding participant:', newParticipant);
    setNewParticipant({
      department: '',
      rollNo: '',
      name: '',
      award: '',
      college: 'Aditya University'
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const [winnersData, activitiesData, galleryImagesData] = await Promise.all([
            DataService.getWinners(),
            DataService.getActivities(),
            DataService.getGalleryImages(),
          ]);
          setWinners(winnersData);
          setActivities(activitiesData);
          setGalleryImages(galleryImagesData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [isAuthenticated, dataChanged]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email === 'admin@adityasabl.com' && password === '1122') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleAddWinner = async (e: FormEvent) => {
    e.preventDefault();
    setWinnerLoading(true);
    try {
      let photoUrl = editingWinner?.photo || '';

      if (newWinner.photo && newWinner.photo instanceof File) {
        const uploadedUrl = await DataService.uploadImage(newWinner.photo, 'winner-photos');
        if (!uploadedUrl) throw new Error('Image upload failed');
        photoUrl = uploadedUrl;
      } else if (typeof newWinner.photo === 'string') {
        photoUrl = newWinner.photo;
      }

      const winnerData = { ...newWinner, photo: photoUrl };

      if (editingWinner) {
        await DataService.updateWinner({ ...winnerData, id: editingWinner.id });
        setEditingWinner(null);
      } else {
        await DataService.addWinner(winnerData);
      }
      setNewWinner(initialWinnerState);
      triggerDataChange();
    } catch (error) {
      console.error('Error saving winner:', error);
    } finally {
      setWinnerLoading(false);
    }
  };

  const handleEditWinner = (winner: Winner) => {
    setEditingWinner(winner);
    setNewWinner({ 
      ...winner, 
      photo: winner.photo, 
      year: winner.year,
      position: winner.position || 1,
      activityType: winner.activityType || 'Activity 1',
      weekNumber: winner.weekNumber
    });
  };

  const handleDeleteWinner = async (id: string) => {
    setWinnerLoading(true);
    try {
      await DataService.deleteWinner(id);
      triggerDataChange();
    } catch (error) {
      console.error('Error deleting winner:', error);
    } finally {
      setWinnerLoading(false);
    }
  };

  const handleAddActivity = async (e: FormEvent) => {
    e.preventDefault();
    setActivityLoading(true);
    try {
      let posterUrl = editingActivity?.poster || '';
      if (newActivity.poster instanceof File) {
        const uploadedUrl = await DataService.uploadImage(newActivity.poster, 'activity_posters');
        if (!uploadedUrl) throw new Error("Poster image upload failed");
        posterUrl = uploadedUrl;
      } else if (typeof newActivity.poster === 'string') {
        posterUrl = newActivity.poster;
      }

      let photoUrls: string[] = editingActivity?.photos || [];
      if (newActivity.photos instanceof FileList) {
        const uploadPromises = Array.from(newActivity.photos).map(file => DataService.uploadImage(file, 'gallery_images'));
        const uploadedUrls = await Promise.all(uploadPromises);
        photoUrls = uploadedUrls.filter((url): url is string => url !== null);
      } else if (Array.isArray(newActivity.photos)) {
        photoUrls = newActivity.photos;
      }

      const activityData = { 
        ...newActivity, 
        poster: posterUrl || undefined, 
        details: newActivity.details || undefined, 
        photos: photoUrls.length > 0 ? photoUrls : undefined 
      };

      if (editingActivity) {
        await DataService.updateActivity({ ...activityData, id: editingActivity.id });
        setEditingActivity(null);
      } else {
        await DataService.addActivity(activityData);
      }
      setNewActivity(initialActivityState);
      triggerDataChange();
    } catch (error) {
      console.error('Error saving activity:', error);
    } finally {
      setActivityLoading(false);
    }
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setNewActivity({ 
      ...activity, 
      poster: activity.poster || null, 
      photos: activity.photos || [], 
      details: activity.details || '',
      formLink: activity.formLink || ''
    });
  };

  const handleDeleteActivity = async (id: string) => {
    setActivityLoading(true);
    try {
      await DataService.deleteActivity(id);
      triggerDataChange();
    } catch (error) {
      console.error('Error deleting activity:', error);
    } finally {
      setActivityLoading(false);
    }
  };

  const handleAddGalleryImage = async (e: FormEvent) => {
    e.preventDefault();
    setGalleryLoading(true);
    try {
      let imageUrl = editingGalleryImage?.url || '';
      if (newGalleryImage.url instanceof File) {
        const uploadedUrl = await DataService.uploadImage(newGalleryImage.url, 'gallery_images');
        if (!uploadedUrl) throw new Error('Image upload failed');
        imageUrl = uploadedUrl;
      } else if (typeof newGalleryImage.url === 'string') {
        imageUrl = newGalleryImage.url;
      }

      const galleryImageData = { ...newGalleryImage, url: imageUrl };

      if (editingGalleryImage) {
        await DataService.updateGalleryImage({ ...galleryImageData, id: editingGalleryImage.id });
        setEditingGalleryImage(null);
      } else {
        await DataService.addGalleryImage(galleryImageData);
      }
      setNewGalleryImage(initialGalleryImageState);
      triggerDataChange();
    } catch (error) {
      console.error('Error saving gallery image:', error);
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleEditGalleryImage = (image: GalleryImage) => {
    setEditingGalleryImage(image);
    setNewGalleryImage({ ...image, url: image.url });
  };

  const handleDeleteGalleryImage = async (id: string) => {
    setGalleryLoading(true);
    try {
      await DataService.deleteGalleryImage(id);
      triggerDataChange();
    } catch (error) {
      console.error('Error deleting gallery image:', error);
    } finally {
      setGalleryLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="w-full max-w-md mx-4 sm:mx-0 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@adityasabl.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="1122"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Panel</h1>
      <Tabs defaultValue="winners">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
          <TabsTrigger value="winners">Manage Winners</TabsTrigger>
          <TabsTrigger value="activities">Manage Activities</TabsTrigger>
          <TabsTrigger value="gallery">Manage Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="winners">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Winners Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">{editingWinner ? 'Edit Winner' : 'Add New Winner'}</h3>
                <form onSubmit={handleAddWinner} className="space-y-4">
                  <div>
                    <Label htmlFor="winner-name">Name</Label>
                    <Input id="winner-name" value={newWinner.name} onChange={e => setNewWinner({ ...newWinner, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="winner-rollNumber">Roll Number</Label>
                    <Input id="winner-rollNumber" value={newWinner.rollNumber} onChange={e => setNewWinner({ ...newWinner, rollNumber: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="winner-event">Event</Label>
                    <Input id="winner-event" value={newWinner.event} onChange={e => setNewWinner({ ...newWinner, event: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="winner-date">Date</Label>
                    <Input id="winner-date" type="date" value={newWinner.date} onChange={e => setNewWinner({ ...newWinner, date: e.target.value })} />
                  </div>
                   <div>
                    <Label htmlFor="winner-year">Year</Label>
                    <Input id="winner-year" value={newWinner.year} onChange={e => setNewWinner({ ...newWinner, year: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="winner-position">Position</Label>
                    <Select value={String(newWinner.position)} onValueChange={(value) => setNewWinner({ ...newWinner, position: parseInt(value) })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Place</SelectItem>
                        <SelectItem value="2">2nd Place</SelectItem>
                        <SelectItem value="3">3rd Place</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="winner-activityType">Activity Type</Label>
                    <Select value={newWinner.activityType} onValueChange={(value) => setNewWinner({ ...newWinner, activityType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activity 1">Activity 1</SelectItem>
                        <SelectItem value="Activity 2">Activity 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="winner-weekNumber">Week Number</Label>
                    <Input 
                      id="winner-weekNumber" 
                      type="number" 
                      placeholder="Enter week number" 
                      value={newWinner.weekNumber || ''} 
                      onChange={e => setNewWinner({ ...newWinner, weekNumber: e.target.value ? parseInt(e.target.value) : undefined })} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="winner-photo">Photo</Label>
                    <Input id="winner-photo" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewWinner({ ...newWinner, photo: e.target.files ? e.target.files[0] : null })} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isThisWeekWinner" checked={newWinner.isThisWeekWinner} onCheckedChange={(checked) => setNewWinner({ ...newWinner, isThisWeekWinner: !!checked })} />
                    <Label htmlFor="isThisWeekWinner">This Week's Winner</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={winnerLoading} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      {winnerLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingWinner ? 'Update Winner' : 'Add Winner'}
                    </Button>
                    {editingWinner && (
                      <Button variant="outline" onClick={() => { setEditingWinner(null); setNewWinner(initialWinnerState); }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Existing Winners</h3>
                {winners.map(winner => (
                  <div key={winner.id} className="flex items-center justify-between p-4 border rounded-lg mb-2 bg-white/50 hover:bg-white/80 transition-all duration-200">
                    <div>
                       <p className="font-bold">{winner.name}</p>
                       <p className="text-sm text-muted-foreground">{winner.event} - {winner.year}</p>
                       <p className="text-xs text-muted-foreground">{winner.activityType} - {winner.position === 1 ? '1st' : winner.position === 2 ? '2nd' : '3rd'} Place - Week {winner.weekNumber}</p>
                     </div>
                    <div className="flex items-center">
                      {winner.photo && <img src={winner.photo} alt={winner.name} className="h-10 w-10 object-cover rounded-full mr-4" />}
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditWinner(winner)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteWinner(winner.id)}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Activities Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">{editingActivity ? 'Edit Activity' : 'Add New Activity'}</h3>
                <form onSubmit={handleAddActivity} className="space-y-4">
                  <div>
                    <Label htmlFor="activity-name">Name</Label>
                    <Input id="activity-name" value={newActivity.name} onChange={e => setNewActivity({ ...newActivity, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="activity-date">Date</Label>
                    <Input id="activity-date" type="date" value={newActivity.date} onChange={e => setNewActivity({ ...newActivity, date: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="activity-description">Description</Label>
                    <Textarea id="activity-description" value={newActivity.description} onChange={e => setNewActivity({ ...newActivity, description: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="activity-details">Details</Label>
                    <Textarea id="activity-details" value={newActivity.details || ''} onChange={e => setNewActivity({ ...newActivity, details: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="activity-photos">Activity Photos</Label>
                    <Input id="activity-photos" type="file" multiple onChange={(e: ChangeEvent<HTMLInputElement>) => setNewActivity({ ...newActivity, photos: e.target.files })} />
                  </div>
                  <div>
                    <Label htmlFor="activity-poster">Poster</Label>
                    <Input id="activity-poster" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewActivity({ ...newActivity, poster: e.target.files ? e.target.files[0] : null })} />
                  </div>
                  <div>
                    <Label htmlFor="activity-status">Status</Label>
                    <Select value={newActivity.status} onValueChange={(value: 'upcoming' | 'completed') => setNewActivity({ ...newActivity, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="activity-formLink">Registration Form Link</Label>
                    <Input 
                      id="activity-formLink" 
                      type="url" 
                      placeholder="https://forms.google.com/..." 
                      value={newActivity.formLink || ''} 
                      onChange={e => setNewActivity({ ...newActivity, formLink: e.target.value })} 
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={activityLoading} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      {activityLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingActivity ? 'Update Activity' : 'Add Activity'}
                    </Button>
                    {editingActivity && (
                      <Button variant="outline" onClick={() => { setEditingActivity(null); setNewActivity(initialActivityState); }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Existing Activities</h3>
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg mb-2 bg-white/50 hover:bg-white/80 transition-all duration-200">
                    <div>
                      <p className="font-bold">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.status} - {activity.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.poster && <img src={activity.poster} alt={activity.name} className="h-10 w-10 object-cover rounded mr-4" />}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewParticipants(activity)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none hover:from-cyan-600 hover:to-blue-700"
                      >
                        Participants
                      </Button>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditActivity(activity)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteActivity(activity.id)}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gallery">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Gallery Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">{editingGalleryImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}</h3>
                <form onSubmit={handleAddGalleryImage} className="space-y-4">
                  <div>
                    <Label htmlFor="gallery-url">Image</Label>
                    <Input id="gallery-url" type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewGalleryImage({ ...newGalleryImage, url: e.target.files ? e.target.files[0] : null })} />
                  </div>
                  <div>
                    <Label htmlFor="gallery-caption">Caption</Label>
                    <Input id="gallery-caption" value={newGalleryImage.caption} onChange={e => setNewGalleryImage({ ...newGalleryImage, caption: e.target.value })} />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={galleryLoading} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                      {galleryLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingGalleryImage ? 'Update Image' : 'Add Image'}
                    </Button>
                    {editingGalleryImage && (
                      <Button variant="outline" onClick={() => { setEditingGalleryImage(null); setNewGalleryImage(initialGalleryImageState); }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Existing Gallery Images</h3>
                {galleryImages.map(image => (
                  <div key={image.id} className="flex items-center justify-between p-4 border rounded-lg mb-2 bg-white/50 hover:bg-white/80 transition-all duration-200">
                    <div className="flex items-center">
                      {image.url && <img src={image.url} alt={image.caption} className="h-16 w-16 object-cover rounded-md mr-4"/>}
                      <p>{image.caption}</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditGalleryImage(image)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteGalleryImage(image.id)}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Participants Modal */}
      <Dialog open={isParticipantsModalOpen} onOpenChange={setIsParticipantsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              👥 Participants - {selectedActivityForParticipants?.name}
            </DialogTitle>
          </DialogHeader>
          
          {/* Add Participant Form */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-semibold mb-3">Add New Participant</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <Input 
                placeholder="Department" 
                value={newParticipant.department}
                onChange={e => setNewParticipant({...newParticipant, department: e.target.value})}
              />
              <Input 
                placeholder="Roll No" 
                value={newParticipant.rollNo}
                onChange={e => setNewParticipant({...newParticipant, rollNo: e.target.value})}
              />
              <Input 
                placeholder="Name" 
                value={newParticipant.name}
                onChange={e => setNewParticipant({...newParticipant, name: e.target.value})}
              />
              <Select value={newParticipant.award} onValueChange={(value) => setNewParticipant({...newParticipant, award: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Award" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Place">1st Place</SelectItem>
                  <SelectItem value="2nd Place">2nd Place</SelectItem>
                  <SelectItem value="3rd Place">3rd Place</SelectItem>
                  <SelectItem value="Participation">Participation</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddParticipant} className="bg-gradient-to-r from-green-500 to-emerald-600">
                Add
              </Button>
            </div>
          </div>
          
          {/* Participants Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <TableHead className="font-semibold">S.No</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Roll No</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Award/Participation</TableHead>
                  <TableHead className="font-semibold">College</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockParticipants.map((participant) => (
                  <TableRow key={participant.sno} className="hover:bg-gray-50">
                    <TableCell>{participant.sno}</TableCell>
                    <TableCell>{participant.department}</TableCell>
                    <TableCell>{participant.rollNo}</TableCell>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        participant.award === '1st Place' ? 'bg-yellow-100 text-yellow-800' :
                        participant.award === '2nd Place' ? 'bg-gray-100 text-gray-800' :
                        participant.award === '3rd Place' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {participant.award}
                      </span>
                    </TableCell>
                    <TableCell>{participant.college}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default Admin;
