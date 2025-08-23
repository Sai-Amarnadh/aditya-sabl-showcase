import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivity } from '@/lib/data-service';
import { Activity } from '@/lib/data-service';

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (id) {
      const allActivities = getActivity(id);
      setActivity(allActivities);
    }
  }, [id]);

  if (!activity) {
    return <div>Activity not found</div>;
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
