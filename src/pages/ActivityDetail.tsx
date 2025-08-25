import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivity } from '@/lib/data-service';
import { Activity } from '@/lib/data-service';

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        setLoading(true);
        try {
          const activityData = await getActivity(id);
          setActivity(activityData || null);
        } catch (error) {
          console.error('Error fetching activity:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded mb-8 w-1/3"></div>
          <div className="h-96 bg-muted rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
        <p className="text-muted-foreground">The activity you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{activity.name}</h1>
      <p className="text-lg text-muted-foreground mb-8">{new Date(activity.date).toLocaleDateString()}</p>
      {activity.poster && <img src={activity.poster} alt={activity.name} className="w-full h-96 object-cover rounded-lg mb-8" />}
      <div className="prose max-w-none">
        {activity.details}
      </div>
    </div>
  );
};

export default ActivityDetail;
