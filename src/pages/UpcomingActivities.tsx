import { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import { getActivities, Activity } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Calendar, Clock, MapPin } from 'lucide-react';

const UpcomingActivities = () => {
  const [upcomingActivities, setUpcomingActivities] = useState<Activity[]>([]);

  const { dataChanged } = useData();

  useEffect(() => {
    const allActivities = getActivities();
    setUpcomingActivities(allActivities.filter(activity => activity.status === 'upcoming'));
  }, [dataChanged]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Upcoming Activities</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our exciting upcoming SABL activities and competitions. Mark your calendars and get ready to participate!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">{upcomingActivities.length}</div>
            <div className="text-muted-foreground text-sm">Upcoming Events</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">Next 30 Days</div>
            <div className="text-muted-foreground text-sm">Activity Window</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">CSE Campus</div>
            <div className="text-muted-foreground text-sm">Event Location</div>
          </div>
        </div>

        {/* Activities Grid */}
        {upcomingActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Activities</h3>
            <p className="text-muted-foreground">Check back soon for new exciting events and competitions!</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-lg opacity-90 mb-6">
            Stay connected with us to get the latest updates on upcoming activities and registration details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center text-sm opacity-80">
              <Calendar className="h-4 w-4 mr-2" />
              Follow our event calendar
            </div>
            <div className="flex items-center text-sm opacity-80">
              <Clock className="h-4 w-4 mr-2" />
              Register early for best spots
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingActivities;