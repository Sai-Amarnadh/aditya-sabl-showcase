import { Activity } from '@/lib/data-service';
import { Link } from 'react-router-dom';
import { Calendar, Users, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivityCardProps {
  activity: Activity;
  onViewParticipants?: (activity: Activity) => void;
}

const ActivityCard = ({ activity, onViewParticipants }: ActivityCardProps) => {
  const isUpcoming = activity.status === 'upcoming';
  
  return (
    <div className="clean-card clean-card-hover overflow-hidden group flex flex-col h-full">
      {activity.poster ? (
        <div className="w-full h-48 bg-secondary flex items-center justify-center flex-shrink-0">
          <img
            src={activity.poster}
            alt={activity.name}
            className="max-w-full max-h-full object-contain rounded-md bg-background p-1 shadow-sm border"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<span class="text-muted-foreground">Poster not available</span>';
              }
            }}
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-50 flex items-center justify-center border-b flex-shrink-0">
          <span className="text-muted-foreground">No Poster</span>
        </div>
      )}
      
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary group-hover:text-blue-600 transition-colors flex-1 line-clamp-2">
            {activity.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isUpcoming 
              ? 'bg-primary/10 text-primary' 
              : 'bg-gray-100 text-gray-600'
          } flex-shrink-0 self-start`}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-xs sm:text-sm mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-xs sm:text-sm">{new Date(activity.date).toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-3 flex-grow">
          {activity.description}
        </p>
        
        {activity.photos && activity.photos.length > 0 && (
          <div className="flex items-center text-muted-foreground text-xs sm:text-sm mb-4">
            <Camera className="h-4 w-4 mr-2" />
            {activity.photos.length} photos available
          </div>
        )}
        
        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          {isUpcoming ? (
            <>
              <Button asChild size="sm" className="w-full btn-navy-secondary text-xs sm:text-sm">
                <Link to={`/activity/${activity.id}`}>
                  Learn More
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full btn-orange-accent text-xs sm:text-sm">
                <Link to={`/register/${activity.id}`}>
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {onViewParticipants && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewParticipants(activity)}
                  className="w-full btn-navy-outline text-xs sm:text-sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Participants
                </Button>
              )}
              <Button asChild variant="outline" size="sm" className="w-full btn-navy-outline text-xs sm:text-sm">
                <Link to={`/activity/${activity.id}/photos`}>
                  <Camera className="h-4 w-4 mr-2" />
                  View Photos
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;