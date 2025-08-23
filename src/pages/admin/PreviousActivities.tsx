import React from 'react';
import EntryForm from '@/components/EntryForm';

const PreviousActivities: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Previous Activity</h1>
      <EntryForm formTitle="New Previous Activity" />
    </div>
  );
};

export default PreviousActivities;
