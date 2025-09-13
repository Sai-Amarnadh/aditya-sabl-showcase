import { useState, useEffect } from 'react';
import ActivityCard from '@/components/ActivityCard';
import { getActivities, Activity } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 tech-bg-pattern">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-tech-slide-up">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
            <Calendar className="h-8 w-8 text-white animate-tech-glow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Upcoming Activities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay updated with our exciting upcoming SABL activities and competitions. Mark your calendars and get ready to participate!
          </p>
        </div>

        {/* Activities Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 animate-pulse overflow-hidden">
                  <div className="h-48 bg-gray-200 loading-shimmer"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3 loading-shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 loading-shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 loading-shimmer"></div>
                    <div className="h-10 bg-gray-200 rounded loading-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : upcomingActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingActivities
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="animate-tech-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ActivityCard activity={activity} />
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-tech-slide-up">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-12 w-12 text-blue-500 animate-celebration-pulse" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Upcoming Activities</h3>
              <p className="text-muted-foreground text-lg">Check back soon for new exciting events and competitions!</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-blue-100 animate-card-hover-lift animate-tech-slide-up">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-white animate-tech-glow" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
              {upcomingActivities.length}
            </div>
            <div className="text-muted-foreground text-sm">Upcoming Events</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-green-100 animate-card-hover-lift animate-tech-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white animate-celebration-pulse" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
              Next 30 Days
            </div>
            <div className="text-muted-foreground text-sm">Activity Window</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-purple-100 animate-card-hover-lift animate-tech-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-white animate-tech-glow" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
              CSE Campus
            </div>
            <div className="text-muted-foreground text-sm">Event Location</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-2xl animate-tech-slide-up">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-300 animate-winner-sparkle mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold">Don't Miss Out!</h2>
            <Sparkles className="h-8 w-8 text-yellow-300 animate-winner-sparkle ml-3" />
          </div>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Stay connected with us to get the latest updates on upcoming activities and registration details.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center text-sm opacity-90">
              <Calendar className="h-4 w-4 mr-2 animate-celebration-pulse" />
              Follow our event calendar
            </div>
            <div className="flex items-center text-sm opacity-90">
              <Clock className="h-4 w-4 mr-2 animate-tech-glow" />
              Register early for best spots
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingActivities;