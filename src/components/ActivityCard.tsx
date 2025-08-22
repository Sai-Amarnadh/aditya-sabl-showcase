import { Activity } from '@/data/mockData';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const isUpcoming = activity.status === 'upcoming';
  
  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group">
      {activity.poster && (
        <div className="h-48 bg-gradient-card relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="text-primary/60 text-sm font-medium">Event Poster</div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {activity.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isUpcoming 
              ? 'bg-primary/10 text-primary' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(activity.date).toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {activity.description}
        </p>
        
        {activity.photos && (
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <Users className="h-4 w-4 mr-2" />
            {activity.photos.length} photos available
          </div>
        )}
        
        <Button 
          variant={isUpcoming ? "default" : "outline"} 
          size="sm" 
          className="w-full"
        >
          {isUpcoming ? 'Learn More' : 'View Photos'}
        </Button>
      </div>
    </div>
  );
};

export default ActivityCard;