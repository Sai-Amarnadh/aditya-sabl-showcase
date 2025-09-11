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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col card-hover">
      {activity.poster ? (
        <img key={activity.poster} src={activity.poster} alt={activity.name} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" />
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
          <span className="text-muted-foreground">No Poster</span>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {activity.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isUpcoming 
              ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700' 
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
            <Button asChild variant="default" size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
              <Link to={`/activity/${activity.id}`}>
                Learn More
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 animate-glow">
              <Link to={`/register/${activity.id}`}>
                Register
              </Link>
            </Button>
          </div>
        ) : (
          <Link to={`/activity/${activity.id}/photos`}>
            <Button
              variant="default"
              size="sm"
              className="w-full mt-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 hover:scale-105"
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