import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Activity } from '@/lib/data-service';

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
}

const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-purple-500"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {activity.title}
          </CardTitle>
          <Badge 
            variant={activity.status === 'upcoming' ? 'default' : 'secondary'}
            className={activity.status === 'upcoming' ? 'bg-green-100 text-green-800' : ''}
          >
            {activity.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-gray-600 text-sm line-clamp-2">
          {activity.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(activity.date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formatTime(activity.time)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{activity.venue}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{activity.maxParticipants} max</span>
          </div>
        </div>
        
        {activity.prizes && activity.prizes.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-1">Prizes:</p>
            <div className="flex flex-wrap gap-1">
              {activity.prizes.slice(0, 3).map((prize, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {prize}
                </Badge>
              ))}
              {activity.prizes.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{activity.prizes.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;