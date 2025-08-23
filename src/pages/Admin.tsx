import { useState, useEffect, FormEvent } from 'react';
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

const Admin = () => {
  const { triggerDataChange } = useData();
  const [winners, setWinners] = useState<Winner[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // Form state for new winner
  const [newWinner, setNewWinner] = useState<Omit<Winner, 'id'>>({ name: '', event: '', date: '', photo: '', year: '', isThisWeekWinner: false });
  const [editingWinner, setEditingWinner] = useState<Winner | null>(null);

  // Form state for new activity
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id' | 'poster' | 'details' | 'photos'>>({ name: '', date: '', description: '', status: 'upcoming' });
  const [poster, setPoster] = useState('');
  const [details, setDetails] = useState('');
  const [photos, setPhotos] = useState('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Form state for new gallery image
  const [newGalleryImage, setNewGalleryImage] = useState<Omit<GalleryImage, 'id'>>({ url: '', caption: '' });
  const [editingGalleryImage, setEditingGalleryImage] = useState<GalleryImage | null>(null);

  const { dataChanged } = useData();

  useEffect(() => {
    setWinners(DataService.getWinners());
    setActivities(DataService.getActivities());
    setGalleryImages(DataService.getGalleryImages());
  }, [dataChanged]);

  const handleAddWinner = (e: FormEvent) => {
    e.preventDefault();
    if (editingWinner) {
      DataService.updateWinner({ ...newWinner, id: editingWinner.id });
      setEditingWinner(null);
    } else {
      DataService.addWinner(newWinner);
    }
    setNewWinner({ name: '', event: '', date: '', photo: '', year: '', isThisWeekWinner: false });
    triggerDataChange();
  };

  const handleEditWinner = (winner: Winner) => {
    setEditingWinner(winner);
    setNewWinner(winner);
  };

  const handleDeleteWinner = (id: string) => {
    DataService.deleteWinner(id);
    triggerDataChange();
  }

  const handleAddActivity = (e: FormEvent) => {
    e.preventDefault();
    const activityData = { ...newActivity, poster, details, photos: photos.split('\n').filter(p => p) };
    if (editingActivity) {
      DataService.updateActivity({ ...activityData, id: editingActivity.id });
      setEditingActivity(null);
    } else {
      DataService.addActivity(activityData);
    }
    setNewActivity({ name: '', date: '', description: '', status: 'upcoming' });
    setPoster('');
    setDetails('');
    setPhotos('');
    triggerDataChange();
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    const { poster, details, photos, ...rest } = activity;
    setNewActivity(rest);
    setPoster(poster || '');
    setDetails(details || '');
    setPhotos(photos?.join('\n') || '');
  };

  const handleDeleteActivity = (id: string) => {
    DataService.deleteActivity(id);
    triggerDataChange();
  }

  const handleAddGalleryImage = (e: FormEvent) => {
    e.preventDefault();
    if (editingGalleryImage) {
      DataService.updateGalleryImage({ ...newGalleryImage, id: editingGalleryImage.id });
      setEditingGalleryImage(null);
    } else {
      DataService.addGalleryImage(newGalleryImage);
    }
    setNewGalleryImage({ url: '', caption: '' });
    triggerDataChange();
  };

  const handleEditGalleryImage = (image: GalleryImage) => {
    setEditingGalleryImage(image);
    setNewGalleryImage(image);
  };

  const handleDeleteGalleryImage = (id: string) => {
    DataService.deleteGalleryImage(id);
    triggerDataChange();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Admin Panel</h1>
      <Tabs defaultValue="winners">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="winners">Manage Winners</TabsTrigger>
          <TabsTrigger value="activities">Manage Activities</TabsTrigger>
          <TabsTrigger value="gallery">Manage Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="winners">
          <Card>
            <CardHeader>
              <CardTitle>Winners</CardTitle>
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
                    <Label htmlFor="winner-photo">Photo URL</Label>
                    <Input id="winner-photo" value={newWinner.photo} onChange={e => setNewWinner({ ...newWinner, photo: e.target.value })} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isThisWeekWinner" checked={newWinner.isThisWeekWinner} onCheckedChange={checked => setNewWinner({ ...newWinner, isThisWeekWinner: !!checked })} />
                    <Label htmlFor="isThisWeekWinner">This Week's Winner</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit">{editingWinner ? 'Update Winner' : 'Add Winner'}</Button>
                    {editingWinner && (
                      <Button variant="outline" onClick={() => { setEditingWinner(null); setNewWinner({ name: '', event: '', date: '', photo: '', year: '', isThisWeekWinner: false }); }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Existing Winners</h3>
                {winners.map(winner => (
                  <div key={winner.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
                    <div>
                      <p className="font-bold">{winner.name}</p>
                      <p className="text-sm text-muted-foreground">{winner.event} - {winner.year}</p>
                    </div>
                    <div>
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
          <Card>
            <CardHeader>
              <CardTitle>Activities</CardTitle>
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
                    <Textarea id="activity-details" value={details} onChange={e => setDetails(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="activity-photos">Photo URLs (one per line)</Label>
                    <Textarea id="activity-photos" value={photos} onChange={e => setPhotos(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="activity-poster">Poster URL</Label>
                    <Input id="activity-poster" value={poster} onChange={e => setPoster(e.target.value)} />
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
                  <div className="flex space-x-2">
                    <Button type="submit">{editingActivity ? 'Update Activity' : 'Add Activity'}</Button>
                    {editingActivity && (
                      <Button variant="outline" onClick={() => { setEditingActivity(null); setNewActivity({ name: '', date: '', description: '', status: 'upcoming' }); setPoster(''); setDetails(''); setPhotos(''); }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Existing Activities</h3>
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
                    <div>
                      <p className="font-bold">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.status}</p>
                    </div>
                    <div>
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
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">{editingGalleryImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}</h3>
                <form onSubmit={handleAddGalleryImage} className="space-y-4">
                  <div>
                    <Label htmlFor="gallery-url">Image URL</Label>
                    <Input id="gallery-url" value={newGalleryImage.url} onChange={e => setNewGalleryImage({ ...newGalleryImage, url: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="gallery-caption">Caption</Label>
                    <Input id="gallery-caption" value={newGalleryImage.caption} onChange={e => setNewGalleryImage({ ...newGalleryImage, caption: e.target.value })} />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit">{editingGalleryImage ? 'Update Image' : 'Add Image'}</Button>
                    {editingGalleryImage && (
                      <Button variant="outline" onClick={() => { setEditingGalleryImage(null); setNewGalleryImage({ url: '', caption: '' }); }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Existing Gallery Images</h3>
                {galleryImages.map(image => (
                  <div key={image.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
                    <div className="flex items-center">
                      <img src={image.url} alt={image.caption} className="h-16 w-16 object-cover rounded-md mr-4"/>
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
    </div>
  );
};

export default Admin;
