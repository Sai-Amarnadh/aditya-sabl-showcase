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
  const [newPhotos1, setNewPhotos1] = useState<FileList | null>(null);
  const [newPhotos2, setNewPhotos2] = useState<FileList | null>(null);
  const [newPhotos3, setNewPhotos3] = useState<FileList | null>(null);
  const [newPhotos4, setNewPhotos4] = useState<FileList | null>(null);
  const { toast } = useToast();

  const handleAddPhotos = async (photoSet: FileList | null, setPhotoSet: (files: FileList | null) => void, inputId: string) => {
    if (!photoSet || photoSet.length === 0) {
      toast({
        title: "No photos selected",
        description: "Please select photos to upload",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const uploadPromises = Array.from(photoSet).map(file => uploadImage(file, 'gallery_images'));
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
      setPhotoSet(null);
      // Reset the file input
      const fileInput = document.getElementById(inputId) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error adding photos:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload photos. Please try again.",
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

          {/* Add New Photos - 4 Separate Upload Options */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-4">Add New Photos (4 Upload Options)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upload Option 1 */}
              <div className="space-y-2">
                <Label htmlFor={`photos1-${activity.id}`}>Upload Set 1</Label>
                <div className="flex items-end gap-2">
                  <Input
                    id={`photos1-${activity.id}`}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPhotos1(e.target.files)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleAddPhotos(newPhotos1, setNewPhotos1, `photos1-${activity.id}`)}
                    disabled={isLoading || !newPhotos1 || newPhotos1.length === 0}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newPhotos1 && newPhotos1.length > 0 && (
                  <p className="text-xs text-muted-foreground">{newPhotos1.length} photo(s) selected</p>
                )}
              </div>

              {/* Upload Option 2 */}
              <div className="space-y-2">
                <Label htmlFor={`photos2-${activity.id}`}>Upload Set 2</Label>
                <div className="flex items-end gap-2">
                  <Input
                    id={`photos2-${activity.id}`}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPhotos2(e.target.files)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleAddPhotos(newPhotos2, setNewPhotos2, `photos2-${activity.id}`)}
                    disabled={isLoading || !newPhotos2 || newPhotos2.length === 0}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newPhotos2 && newPhotos2.length > 0 && (
                  <p className="text-xs text-muted-foreground">{newPhotos2.length} photo(s) selected</p>
                )}
              </div>

              {/* Upload Option 3 */}
              <div className="space-y-2">
                <Label htmlFor={`photos3-${activity.id}`}>Upload Set 3</Label>
                <div className="flex items-end gap-2">
                  <Input
                    id={`photos3-${activity.id}`}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPhotos3(e.target.files)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleAddPhotos(newPhotos3, setNewPhotos3, `photos3-${activity.id}`)}
                    disabled={isLoading || !newPhotos3 || newPhotos3.length === 0}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newPhotos3 && newPhotos3.length > 0 && (
                  <p className="text-xs text-muted-foreground">{newPhotos3.length} photo(s) selected</p>
                )}
              </div>

              {/* Upload Option 4 */}
              <div className="space-y-2">
                <Label htmlFor={`photos4-${activity.id}`}>Upload Set 4</Label>
                <div className="flex items-end gap-2">
                  <Input
                    id={`photos4-${activity.id}`}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPhotos4(e.target.files)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleAddPhotos(newPhotos4, setNewPhotos4, `photos4-${activity.id}`)}
                    disabled={isLoading || !newPhotos4 || newPhotos4.length === 0}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newPhotos4 && newPhotos4.length > 0 && (
                  <p className="text-xs text-muted-foreground">{newPhotos4.length} photo(s) selected</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityPhotoManager;