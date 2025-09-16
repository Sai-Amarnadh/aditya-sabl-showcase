import { useState, useEffect } from 'react';
import { Image, Grid, Eye } from 'lucide-react';
import { getGalleryImages, GalleryImage } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Gallery = () => {
  const [photos, setPhotos] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const { dataChanged } = useData();

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const galleryData = await getGalleryImages();
        setPhotos(galleryData);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGallery();
  }, [dataChanged]);

  return (
    <div className="page-bg-clean">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center mb-4">
            <Image className="h-8 w-8 text-pink-500 mr-3 animate-float-gentle" />
            <h1 className="text-4xl font-bold text-gradient-rainbow">Photo Gallery</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Relive the memorable moments from our SABL activities through this curated collection of photos.
          </p>
        </div>

        {/* Photo Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="clean-card overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4">
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {photos.map((photo, index) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <div className="group relative clean-card clean-card-hover overflow-hidden cursor-pointer animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="aspect-square bg-gray-50 relative overflow-hidden">
                      <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover"/>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/60 to-purple-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gradient-teal text-sm mb-1 truncate">
                        {photo.caption}
                      </h3>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80vw]">
                  <DialogHeader>
                    <DialogTitle>{photo.caption}</DialogTitle>
                  </DialogHeader>
                  <img src={photo.url} alt={photo.caption} className="w-full h-auto object-contain rounded-xl"/>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float-gentle">
              <Image className="h-12 w-12 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold text-gradient-rainbow mb-2">No Photos Found</h3>
            <p className="text-muted-foreground mb-4">
              The gallery is currently empty. Check back later!
            </p>
          </div>
        )}

        {/* Gallery Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="stats-card-pink text-center animate-slide-up">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-float-gentle">
              <Image className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{photos.length}</div>
            <div className="text-white/90 text-sm">Total Photos</div>
          </div>

          <div className="stats-card-light text-center col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-float-gentle" style={{ animationDelay: '0.5s' }}>
              <Grid className="h-6 w-6 text-teal-500" />
            </div>
            <div className="text-2xl font-bold mb-1 text-gradient-teal">A Growing Collection</div>
            <div className="text-teal-600 text-sm">New photos are added regularly</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;