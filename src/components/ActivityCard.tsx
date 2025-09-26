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
    <div className="dual-border-card clean-card-hover overflow-hidden group flex flex-col h-full">
      {activity.poster ? (
        <div className="w-full h-52 bg-secondary flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
          <img
            src={activity.poster}
            alt={activity.name}
            className="max-w-full max-h-full object-contain rounded-lg bg-background p-2 shadow-lg border-2 border-primary/20 relative z-10 group-hover:scale-105 transition-transform duration-300"
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
        <div className="h-52 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border-b-2 border-primary/20 flex-shrink-0 relative">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <span className="text-muted-foreground font-medium">No Poster Available</span>
          </div>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors flex-1 line-clamp-2 leading-tight">
            {activity.name}
          </h3>
          <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 ${
            isUpcoming 
              ? 'bg-primary/10 text-primary border-primary/30' 
              : 'bg-accent/10 text-accent border-accent/30'
          } flex-shrink-0 self-start`}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-4 bg-primary/5 px-3 py-2 rounded-lg">
          <Calendar className="h-4 w-4 mr-3 text-primary" />
          <span className="font-medium">{new Date(activity.date).toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {activity.description}
        </p>
        
        {activity.photos && activity.photos.length > 0 && (
          <div className="flex items-center text-accent text-sm mb-4 bg-accent/10 px-3 py-2 rounded-lg">
            <Camera className="h-4 w-4 mr-3" />
            <span className="font-medium">{activity.photos.length} photos available</span>
          </div>
        )}
        
        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          {isUpcoming ? (
            <>
              <Button asChild size="sm" className="w-full btn-navy-secondary text-sm font-medium py-3">
                <Link to={`/activity/${activity.id}`}>
                  Learn More
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full btn-orange-accent text-sm font-medium py-3">
                <Link to={`/register/${activity.id}`}>
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {onViewParticipants && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewParticipants(activity)}
                  className="w-full btn-navy-outline text-sm font-medium py-3"
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Participants
                </Button>
              )}
              <Button asChild variant="outline" size="sm" className="w-full btn-navy-outline text-sm font-medium py-3">
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