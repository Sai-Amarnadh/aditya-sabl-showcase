import { Activity } from '@/lib/data-service';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const isUpcoming = activity.status === 'upcoming';
  
  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group flex flex-col">
      {activity.poster ? (
        <img key={activity.poster} src={activity.poster} alt={activity.name} className="w-full h-auto" />
      ) : (
        <div className="h-48 bg-gradient-card flex items-center justify-center">
          <span className="text-muted-foreground">No Poster</span>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
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
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 h-20 flex-grow">
          {activity.description}
        </p>
        
        {activity.photos && (
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <Users className="h-4 w-4 mr-2" />
            {activity.photos.length} photos available
          </div>
        )}
        
        {isUpcoming ? (
          <div className="flex gap-2 mt-auto">
            <Button asChild variant="default" size="sm" className="flex-1">
              <Link to={`/activity/${activity.id}`}>
                Learn More
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="flex-1 register-button-highlight">
              <Link to={`/register/${activity.id}`}>
                Register
              </Link>
            </Button>
          </div>
        ) : (
          <Link to={`/activity/${activity.id}/photos`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-auto"
            >
              View Photos
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;