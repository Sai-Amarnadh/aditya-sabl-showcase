import React from 'react';
import EntryForm from '@/components/EntryForm';

const UpcomingActivities: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Upcoming Activity</h1>
      <EntryForm formTitle="New Upcoming Activity" />
    </div>
  );
};

export default UpcomingActivities;
