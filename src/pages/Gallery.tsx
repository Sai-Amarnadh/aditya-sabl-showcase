import { useState } from 'react';
import { Image, Grid, Filter, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { activities } from '@/data/mockData';

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Get all photos from completed activities
  const allPhotos = activities
    .filter(activity => activity.status === 'completed' && activity.photos)
    .flatMap(activity => 
      activity.photos!.map((photo, index) => ({
        id: `${activity.id}-${index}`,
        url: photo,
        activity: activity.name,
        date: activity.date,
        year: new Date(activity.date).getFullYear().toString()
      }))
    );

  const events = Array.from(new Set(allPhotos.map(p => p.activity))).sort();
  const years = Array.from(new Set(allPhotos.map(p => p.year))).sort().reverse();

  const filteredPhotos = allPhotos.filter(photo => {
    const yearMatch = selectedYear === 'all' || photo.year === selectedYear;
    const eventMatch = selectedEvent === 'all' || photo.activity === selectedEvent;
    return yearMatch && eventMatch;
  });

  const clearFilters = () => {
    setSelectedEvent('all');
    setSelectedYear('all');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
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
            <div className="text-2xl font-bold text-card-foreground mb-1">{allPhotos.length}</div>
            <div className="text-muted-foreground text-sm">Total Photos</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Grid className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">{events.length}</div>
            <div className="text-muted-foreground text-sm">Events Covered</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">{years.length}</div>
            <div className="text-muted-foreground text-sm">Years Documented</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-medium text-card-foreground">Filter Photos:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    {events.map(event => (
                      <SelectItem key={event} value={event}>{event}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPhotos.length} of {allPhotos.length} photos
            {selectedYear !== 'all' && ` from ${selectedYear}`}
            {selectedEvent !== 'all' && ` from ${selectedEvent}`}
          </p>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                <div className="aspect-square bg-gradient-card relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="text-center">
                      <Image className="h-8 w-8 text-primary/60 mx-auto mb-2" />
                      <div className="text-primary/60 text-xs font-medium">Photo</div>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-card-foreground text-sm mb-1 truncate">
                    {photo.activity}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {new Date(photo.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
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
              Try adjusting your filters to see more photos.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}

        {/* Featured Collections */}
        <div className="mt-16 bg-gradient-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map(event => {
              const eventPhotos = allPhotos.filter(p => p.activity === event);
              return (
                <div key={event} className="bg-card rounded-lg p-6 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                      <Grid className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{event}</h3>
                      <p className="text-muted-foreground text-sm">{eventPhotos.length} photos</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedEvent(event)}
                    className="w-full"
                  >
                    View Collection
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;