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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full animate-float-simple"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-indigo-400/30 rounded-full animate-tech-glow"></div>
      <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-purple-300/25 rounded-full animate-celebration-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-pink-400/30 rounded-full animate-bounce-gentle"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-tech-slide-up relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8 shadow-2xl">
            <Calendar className="h-10 w-10 text-white animate-tech-glow" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight">
            Upcoming Activities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Stay updated with our exciting upcoming SABL activities and competitions. Mark your calendars and get ready to participate!
          </p>
        </div>

        {/* Activities Grid */}
        <div className="mb-16 relative z-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 animate-pulse overflow-hidden">
                  <div className="h-56 bg-gradient-to-r from-blue-100 to-indigo-100 loading-shimmer"></div>
                  <div className="p-6">
                    <div className="h-6 bg-blue-100 rounded-lg mb-3 loading-shimmer"></div>
                    <div className="h-4 bg-indigo-100 rounded-lg mb-2 loading-shimmer"></div>
                    <div className="h-4 bg-purple-100 rounded-lg mb-4 loading-shimmer"></div>
                    <div className="h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl loading-shimmer"></div>
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
            <div className="text-center py-20 animate-tech-slide-up">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Calendar className="h-16 w-16 text-blue-500 animate-celebration-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Upcoming Activities</h3>
              <p className="text-gray-600 text-xl">Check back soon for new exciting events and competitions!</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-2 border-blue-100 hover:border-blue-200 animate-card-hover-lift animate-tech-slide-up">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Calendar className="h-8 w-8 text-white animate-tech-glow" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {upcomingActivities.length}
            </div>
            <div className="text-gray-600 font-medium">Upcoming Events</div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-2 border-green-100 hover:border-green-200 animate-card-hover-lift animate-tech-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Clock className="h-8 w-8 text-white animate-celebration-pulse" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Next 30 Days
            </div>
            <div className="text-gray-600 font-medium">Activity Window</div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center border-2 border-purple-100 hover:border-purple-200 animate-card-hover-lift animate-tech-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MapPin className="h-8 w-8 text-white animate-tech-glow" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              CSE Campus
            </div>
            <div className="text-gray-600 font-medium">Event Location</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl animate-tech-slide-up relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-10 w-10 text-yellow-300 animate-winner-sparkle mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold">Don't Miss Out!</h2>
            <Sparkles className="h-10 w-10 text-yellow-300 animate-winner-sparkle ml-4" />
          </div>
          <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay connected with us to get the latest updates on upcoming activities and registration details.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="flex items-center text-base opacity-95 font-medium">
              <Calendar className="h-5 w-5 mr-3 animate-celebration-pulse" />
              Follow our event calendar
            </div>
            <div className="flex items-center text-base opacity-95 font-medium">
              <Clock className="h-5 w-5 mr-3 animate-tech-glow" />
              Register early for best spots
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingActivities;