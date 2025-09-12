import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
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

  const getStatusBadge = (status: string) => {
    const statusColors = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={cn('text-xs', statusColors[status as keyof typeof statusColors] || statusColors.upcoming)}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className={cn('hover:shadow-lg transition-shadow duration-200', className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {activity.name}
          </CardTitle>
          {getStatusBadge(activity.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(activity.date)}
        </div>
        
        {activity.location && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {activity.location}
          </div>
        )}
        
        {activity.participants && (
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {activity.participants} participants
          </div>
        )}
        
        {activity.description && (
          <p className="text-sm text-gray-700 line-clamp-3">
            {activity.description}
          </p>
        )}
        
        {activity.winner && (
          <div className="flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
            <Trophy className="w-4 h-4 mr-2" />
            Winner: {activity.winner}
          </div>
        )}
        
        <div className="pt-2">
          <Button asChild variant="outline" className="w-full">
            <Link to={`/activity/${activity.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}