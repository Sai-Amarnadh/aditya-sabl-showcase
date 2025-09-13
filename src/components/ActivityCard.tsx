import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Trophy, ExternalLink, Clock, CheckCircle, XCircle, Camera } from 'lucide-react';
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
        color: 'bg-primary/10 text-primary',
        icon: Clock 
      },
      completed: { 
        color: 'bg-green-500/10 text-green-600',
        icon: CheckCircle 
      },
      cancelled: { 
        color: 'bg-red-500/10 text-red-600',
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
    <Card className={cn('activity-card group border-2 border-blue-100/50 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] bg-gradient-to-br from-white to-blue-50/30', className)}>
      {/* Activity Poster */}
      {activity.poster && (
        <div className="relative overflow-hidden rounded-t-xl group-hover:rounded-t-2xl transition-all duration-300">
          <img 
            src={activity.poster} 
            alt={activity.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <p className="text-sm font-semibold bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              Click to view details
            </p>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
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
          <div className="flex items-center text-sm text-purple-600 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl border border-purple-100">
            <Trophy className="w-4 h-4 mr-2" />
            {activity.photos.length} photos available
          </div>
        )}
        
        <div className="flex flex-col gap-3 pt-2">
          {/* View Details Button */}
          <Button asChild variant="outline" className="w-full border-2 border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent hover:scale-105 transition-all duration-300 font-semibold">
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
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse"
                >
                  <Link to={`/register/${activity.id}`} target="_blank">
                    🚀 Register Now 🚀
                  </Link>
                </Button>
              ) : (
                <Button 
                  disabled 
                  className="w-full bg-gray-400 text-gray-600 cursor-not-allowed py-4 px-6 rounded-xl"
                >
                  {!activity.formLink ? 'Registration Not Available' : 'Registration Closed'}
                </Button>
              )}
            </div>
          )}

          {/* View Photos Button for Previous Activities */}
          {activity.status === 'completed' && activity.photos && activity.photos.length > 0 && (
            <Button asChild variant="secondary" className="w-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 hover:from-green-200 hover:to-emerald-200 border-2 border-green-200 hover:border-green-300 hover:scale-105 transition-all duration-300 font-semibold">
              <Link to={`/activity/${activity.id}/photos`}>
                <Camera className="w-4 h-4 mr-2" />
                View Photos ({activity.photos.length})
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}