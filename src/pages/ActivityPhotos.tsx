import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivity } from '@/lib/data-service';
import { Activity } from '@/lib/data-service';

const ActivityPhotos = () => {
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
      <h1 className="text-4xl font-bold mb-4">{activity.name} - Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activity.photos?.map((photo, index) => (
          <div key={index} className="bg-card rounded-lg overflow-hidden shadow-card">
            <img src={photo} alt={`${activity.name} photo ${index + 1}`} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPhotos;
