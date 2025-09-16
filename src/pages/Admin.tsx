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
import * as DataService from '@/lib/data-service';
import { Winner, Activity, GalleryImage } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import ActivityPhotoManager from '@/components/ActivityPhotoManager';

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
      }

      let photoUrls: string[] = editingActivity?.photos || [];
      if (newActivity.photos instanceof FileList) {
        const uploadPromises = Array.from(newActivity.photos).map(file => DataService.uploadImage(file, 'gallery_images'));
        const uploadedUrls = await Promise.all(uploadPromises);
        photoUrls = uploadedUrls.filter((url): url is string => url !== null);
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
      <div className="page-bg-clean">
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md mx-4 sm:mx-0 animate-slide-up clean-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@adityasabl.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-primary">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="1122"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                {error && <p className="text-red-500 text-sm text-center animate-shake">{error}</p>}
                <Button type="submit" className="w-full btn-navy-primary">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg-clean">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gradient-navy">Admin Panel</h1>
        <h1 className="text-4xl font-bold text-center mb-12 text-gradient-rainbow">Admin Panel</h1>
        <Tabs defaultValue="winners">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-soft">
            <TabsTrigger value="winners" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-teal-500 data-[state=active]:text-white">Manage Winners</TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-orange-500 data-[state=active]:text-white">Manage Activities</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">Manage Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="winners">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="text-gradient-teal">Winners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gradient-teal">{editingWinner ? 'Edit Winner' : 'Add New Winner'}</h3>
                  <form onSubmit={handleAddWinner} className="space-y-4">
                    <div>
                      <Label htmlFor="winner-name" className="text-gradient-teal">Name</Label>
                      <Input id="winner-name" value={newWinner.name} onChange={e => setNewWinner({ ...newWinner, name: e.target.value })} className="focus:ring-2 focus:ring-teal-400" />
                    </div>
                    <div>
                      <Label htmlFor="winner-rollNumber" className="text-primary">Roll Number</Label>
                      <Input id="winner-rollNumber" value={newWinner.rollNumber} onChange={e => setNewWinner({ ...newWinner, rollNumber: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="winner-event" className="text-primary">Event</Label>
                      <Input id="winner-event" value={newWinner.event} onChange={e => setNewWinner({ ...newWinner, event: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="winner-date" className="text-primary">Date</Label>
                      <Input id="winner-date" type="date" value={newWinner.date} onChange={e => setNewWinner({ ...newWinner, date: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="winner-year" className="text-primary">Year</Label>
                      <Input id="winner-year" value={newWinner.year} onChange={e => setNewWinner({ ...newWinner, year: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="winner-position" className="text-primary">Position</Label>
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
                      <Label htmlFor="winner-activityType" className="text-primary">Activity Type</Label>
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
                      <Label htmlFor="winner-weekNumber" className="text-primary">Week Number</Label>
                      <Input 
                        id="winner-weekNumber" 
                        type="number" 
                        placeholder="Enter week number" 
                        value={newWinner.weekNumber || ''} 
                        onChange={e => setNewWinner({ ...newWinner, weekNumber: e.target.value ? parseInt(e.target.value) : undefined })}
                        className="focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="winner-photo" className="text-primary">Photo</Label>
                      <Input id="winner-photo" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewWinner({ ...newWinner, photo: e.target.files ? e.target.files[0] : null })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isThisWeekWinner" checked={newWinner.isThisWeekWinner} onCheckedChange={(checked) => setNewWinner({ ...newWinner, isThisWeekWinner: !!checked })} />
                      <Label htmlFor="isThisWeekWinner" className="text-primary">This Week's Winner</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" disabled={winnerLoading} className="btn-teal">
                        {winnerLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editingWinner ? 'Update Winner' : 'Add Winner'}
                      </Button>
                      {editingWinner && (
                        <Button variant="outline" onClick={() => { setEditingWinner(null); setNewWinner(initialWinnerState); }} className="btn-outline-colorful">Cancel</Button>
                      )}
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gradient-teal">Existing Winners</h3>
                  {winners.map(winner => (
                    <div key={winner.id} className="flex items-center justify-between p-4 border rounded-xl mb-2 clean-card">
                      <div>
                        <p className="font-bold text-gradient-teal">{winner.name}</p>
                        <p className="text-sm text-muted-foreground">{winner.event} - {winner.year}</p>
                        <p className="text-xs text-muted-foreground">{winner.activityType} - {winner.position === 1 ? '1st' : winner.position === 2 ? '2nd' : '3rd'} Place - Week {winner.weekNumber}</p>
                      </div>
                      <div className="flex items-center">
                        {winner.photo && <img src={winner.photo} alt={winner.name} className="h-10 w-10 object-cover rounded-full mr-4" />}
                        <Button variant="outline" size="sm" className="mr-2 btn-outline-colorful" onClick={() => handleEditWinner(winner)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteWinner(winner.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activities">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="text-gradient-orange">Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gradient-orange">{editingActivity ? 'Edit Activity' : 'Add New Activity'}</h3>
                  <form onSubmit={handleAddActivity} className="space-y-4">
                    <div>
                      <Label htmlFor="activity-name" className="text-primary">Name</Label>
                      <Input id="activity-name" value={newActivity.name} onChange={e => setNewActivity({ ...newActivity, name: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="activity-date" className="text-primary">Date</Label>
                      <Input id="activity-date" type="date" value={newActivity.date} onChange={e => setNewActivity({ ...newActivity, date: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="activity-description" className="text-primary">Description</Label>
                      <Textarea id="activity-description" value={newActivity.description} onChange={e => setNewActivity({ ...newActivity, description: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="activity-details" className="text-primary">Details</Label>
                      <Textarea id="activity-details" value={newActivity.details || ''} onChange={e => setNewActivity({ ...newActivity, details: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="activity-photos" className="text-primary">Activity Photos</Label>
                      <Input id="activity-photos" type="file" multiple onChange={(e: ChangeEvent<HTMLInputElement>) => setNewActivity({ ...newActivity, photos: e.target.files })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="activity-poster" className="text-primary">Poster</Label>
                      <Input id="activity-poster" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewActivity({ ...newActivity, poster: e.target.files ? e.target.files[0] : null })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="activity-status" className="text-primary">Status</Label>
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
                      <Label htmlFor="activity-formLink" className="text-primary">Registration Form Link</Label>
                      <Input 
                        id="activity-formLink" 
                        type="url" 
                        placeholder="https://forms.google.com/..." 
                        value={newActivity.formLink || ''} 
                        onChange={e => setNewActivity({ ...newActivity, formLink: e.target.value })}
                        className="focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" disabled={activityLoading} className="btn-orange">
                        {activityLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editingActivity ? 'Update Activity' : 'Add Activity'}
                      </Button>
                      {editingActivity && (
                        <Button variant="outline" onClick={() => { setEditingActivity(null); setNewActivity(initialActivityState); }} className="btn-outline-colorful">Cancel</Button>
                      )}
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gradient-orange">Existing Activities</h3>
                  {activities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-xl mb-2 clean-card">
                      <div>
                        <p className="font-bold text-gradient-orange">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.status} - {activity.date}</p>
                      </div>
                      <div className="flex items-center">
                        {activity.poster && <img src={activity.poster} alt={activity.name} className="h-10 w-10 object-cover rounded mr-4" />}
                        <Button variant="outline" size="sm" className="mr-2 btn-outline-colorful" onClick={() => handleEditActivity(activity)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteActivity(activity.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gallery">
            <Card className="clean-card">
              <CardHeader>
                <CardTitle className="text-gradient-purple">Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gradient-purple">{editingGalleryImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}</h3>
                  <form onSubmit={handleAddGalleryImage} className="space-y-4">
                    <div>
                      <Label htmlFor="gallery-url" className="text-primary">Image</Label>
                      <Input id="gallery-url" type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewGalleryImage({ ...newGalleryImage, url: e.target.files ? e.target.files[0] : null })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="gallery-caption" className="text-primary">Caption</Label>
                      <Input id="gallery-caption" value={newGalleryImage.caption} onChange={e => setNewGalleryImage({ ...newGalleryImage, caption: e.target.value })} className="focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" disabled={galleryLoading} className="btn-purple">
                        {galleryLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editingGalleryImage ? 'Update Image' : 'Add Image'}
                      </Button>
                      {editingGalleryImage && (
                        <Button variant="outline" onClick={() => { setEditingGalleryImage(null); setNewGalleryImage(initialGalleryImageState); }} className="btn-outline-colorful">Cancel</Button>
                      )}
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gradient-purple">Existing Gallery Images</h3>
                  {galleryImages.map(image => (
                    <div key={image.id} className="flex items-center justify-between p-4 border rounded-xl mb-2 clean-card">
                      <div className="flex items-center">
                        {image.url && <img src={image.url} alt={image.caption} className="h-16 w-16 object-cover rounded-md mr-4"/>}
                        <p className="text-gradient-purple">{image.caption}</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" className="mr-2 btn-outline-colorful" onClick={() => handleEditGalleryImage(image)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteGalleryImage(image.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;