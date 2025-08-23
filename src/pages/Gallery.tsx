import { useState, useEffect } from 'react';
import { Image, Grid, Eye } from 'lucide-react';
import { getGalleryImages, GalleryImage } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';

const Gallery = () => {
  const [photos, setPhotos] = useState<GalleryImage[]>([]);

  const { dataChanged } = useData();

  useEffect(() => {
    setPhotos(getGalleryImages());
  }, [dataChanged]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Image className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Photo Gallery</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Relive the memorable moments from our SABL activities through this curated collection of photos.
          </p>
        </div>

        {/* Gallery Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Image className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">{photos.length}</div>
            <div className="text-muted-foreground text-sm">Total Photos</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center col-span-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Grid className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">A Growing Collection</div>
            <div className="text-muted-foreground text-sm">New photos are added regularly</div>
          </div>
        </div>

        {/* Photo Grid */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                <div className="aspect-square bg-gradient-card relative overflow-hidden">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover"/>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-card-foreground text-sm mb-1 truncate">
                    {photo.caption}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Image className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Photos Found</h3>
            <p className="text-muted-foreground mb-4">
              The gallery is currently empty. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;