import { useState, ChangeEvent } from 'react';
import { Activity, uploadImage, updateActivity } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityPhotoManagerProps {
  activity: Activity;
  onUpdate: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ActivityPhotoManager = ({ activity, onUpdate, isLoading, setIsLoading }: ActivityPhotoManagerProps) => {
  const [newPhotos, setNewPhotos] = useState<FileList | null>(null);
  const { toast } = useToast();

  const handleAddPhotos = async () => {
    if (!newPhotos || newPhotos.length === 0) {
      toast({
        title: "No photos selected",
        description: "Please select photos to upload",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const uploadPromises = Array.from(newPhotos).map(file => uploadImage(file, 'gallery_images'));
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter((url): url is string => url !== null);

      if (validUrls.length === 0) {
        throw new Error('Failed to upload any photos');
      }

      const updatedPhotos = [...(activity.photos || []), ...validUrls];
      await updateActivity({ ...activity, photos: updatedPhotos });
      
      toast({
        title: "Photos added successfully",
        description: `Added ${validUrls.length} photos to ${activity.name}`,
      });
      
      onUpdate();
      setNewPhotos(null);
      // Reset the file input
      const fileInput = document.getElementById(`photos-${activity.id}`) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error adding photos:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload photos. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePhoto = async (photoIndex: number) => {
    setIsLoading(true);
    try {
      const updatedPhotos = activity.photos?.filter((_, index) => index !== photoIndex) || [];
      await updateActivity({ ...activity, photos: updatedPhotos });
      
      toast({
        title: "Photo removed",
        description: "Photo removed successfully",
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error removing photo:', error);
      toast({
        title: "Remove failed",
        description: "Failed to remove photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ImageIcon className="h-5 w-5 mr-2" />
          {activity.name}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({activity.photos?.length || 0} photos)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Photos */}
          {activity.photos && activity.photos.length > 0 ? (
            <div>
              <h4 className="font-medium mb-3">Current Photos:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activity.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={photo} 
                      alt={`${activity.name} photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemovePhoto(index)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No photos uploaded yet</p>
            </div>
          )}

          {/* Add New Photos */}
          <div className="border-t pt-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor={`photos-${activity.id}`}>Add New Photos</Label>
                <Input
                  id={`photos-${activity.id}`}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPhotos(e.target.files)}
                  disabled={isLoading}
                />
              </div>
              <Button 
                onClick={handleAddPhotos}
                disabled={isLoading || !newPhotos || newPhotos.length === 0}
                className="shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isLoading ? 'Uploading...' : 'Add Photos'}
              </Button>
            </div>
            {newPhotos && newPhotos.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {newPhotos.length} photo(s) selected
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityPhotoManager;