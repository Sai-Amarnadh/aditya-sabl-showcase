import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Trophy, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Activity } from '@/lib/data-service';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

export default function ActivityCard({ activity, className }: ActivityCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isRegistrationOpen = () => {
    const activityDate = new Date(activity.date);
    const today = new Date();
    return activityDate > today && activity.status === 'upcoming';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { 
        color: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white', 
        icon: Clock 
      },
      completed: { 
        color: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white', 
        icon: CheckCircle 
      },
      cancelled: { 
        color: 'bg-gradient-to-r from-red-500 to-red-600 text-white', 
        icon: XCircle 
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
    const IconComponent = config.icon;
    
    return (
      <Badge className={cn('text-xs font-semibold px-3 py-1 flex items-center gap-1', config.color)}>
        <IconComponent className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const registrationOpen = isRegistrationOpen();

  return (
    <Card className={cn('activity-card group border-0 shadow-lg hover:shadow-2xl', className)}>
      {/* Activity Poster */}
      {activity.poster && (
        <div className="relative overflow-hidden rounded-t-xl">
          <img 
            src={activity.poster} 
            alt={activity.name}
            className="activity-poster"
          />
          <div className="activity-overlay"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              Click to view details
            </p>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {activity.name}
          </CardTitle>
          {getStatusBadge(activity.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(activity.date)}
        </div>
        
        {activity.description && (
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {activity.description}
          </p>
        )}

        {/* Photo Count for Previous Activities */}
        {activity.status === 'completed' && activity.photos && activity.photos.length > 0 && (
          <div className="flex items-center text-sm text-purple-600 bg-purple-50 p-2 rounded-lg">
            <Trophy className="w-4 h-4 mr-2" />
            {activity.photos.length} photos available
          </div>
        )}
        
        <div className="flex flex-col gap-3 pt-2">
          {/* View Details Button */}
          <Button asChild variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
            <Link to={`/activity/${activity.id}`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </Link>
          </Button>

          {/* Register Button for Upcoming Activities */}
          {activity.status === 'upcoming' && (
            <div className="relative">
              {registrationOpen && activity.formLink ? (
                <Button 
                  asChild 
                  className="register-btn w-full animate-register-pulse"
                >
                  <Link to={`/register/${activity.id}`} target="_blank">
                    ✨ Register Now ✨
                  </Link>
                </Button>
              ) : (
                <Button 
                  disabled 
                  className="register-btn-closed w-full"
                >
                  {!activity.formLink ? 'Registration Not Available' : 'Registration Closed'}
                </Button>
              )}
            </div>
          )}

          {/* View Photos Button for Previous Activities */}
          {activity.status === 'completed' && activity.photos && activity.photos.length > 0 && (
            <Button asChild variant="secondary" className="w-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 hover:from-purple-200 hover:to-indigo-200 border-purple-200">
              <Link to={`/activity/${activity.id}/photos`}>
                <Users className="w-4 h-4 mr-2" />
                View Photos ({activity.photos.length})
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}