import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getActivities, Activity } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Calendar, Clock, MapPin } from 'lucide-react';

const UpcomingActivities = () => {
  const [upcomingActivities, setUpcomingActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const { dataChanged } = useData();

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const allActivities = await getActivities();
        setUpcomingActivities(allActivities.filter(activity => activity.status === 'upcoming'));
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, [dataChanged]);

  return (
    <div className="min-h-screen bg-background vibrant-bg-2 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="page-decoration decoration-circle w-32 h-32 top-16 right-10 animate-float-simple"></div>
      <div className="page-decoration decoration-square w-20 h-20 top-32 left-16 animate-rotate-gentle"></div>
      <div className="page-decoration decoration-triangle bottom-40 right-1/4" style={{ animationDelay: '1s' }}></div>
      <div className="page-decoration decoration-circle w-16 h-16 bottom-20 left-1/3 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      <div className="page-decoration decoration-square w-12 h-12 top-1/2 right-1/3 animate-pulse-soft"></div>
      <div className="page-decoration decoration-circle w-28 h-28 bottom-32 right-20 animate-morph-gentle"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Upcoming Activities</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our exciting upcoming SABL activities and competitions. Mark your calendars and get ready to participate!
          </p>
        </div>

        {/* Activities Grid */}
        <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg shadow-card animate-pulse overflow-hidden">
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : upcomingActivities.length > 0 ? (
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
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 relative z-10">
          <div className="interactive-card bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-white animate-bounce-gentle" />
            </div>
            <div className="text-2xl font-bold mb-1">{upcomingActivities.length}</div>
            <div className="text-white/90 text-sm">Upcoming Events</div>
          </div>

          <div className="interactive-card bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-white animate-rotate-gentle" />
            </div>
            <div className="text-2xl font-bold mb-1">Next 30 Days</div>
            <div className="text-white/90 text-sm">Activity Window</div>
          </div>

          <div className="interactive-card bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift" style={{ animationDelay: '0.4s' }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-white animate-pulse-soft" />
            </div>
            <div className="text-2xl font-bold mb-1">CSE Campus</div>
            <div className="text-white/90 text-sm">Event Location</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 interactive-card bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-center text-white relative z-10 animate-celebration-glow">
          <h2 className="text-2xl font-bold mb-4 animate-wiggle">🎯 Don't Miss Out! 🎯</h2>
          <p className="text-lg opacity-90 mb-6">
            Stay connected with us to get the latest updates on upcoming activities and registration details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center text-sm opacity-80 animate-fade-in-up">
              <Calendar className="h-4 w-4 mr-2 animate-bounce-gentle" />
              Follow our event calendar
            </div>
            <div className="flex items-center text-sm opacity-80 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Clock className="h-4 w-4 mr-2 animate-rotate-gentle" />
              Register early for best spots
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingActivities;