import React from 'react';
import EntryForm from '@/components/EntryForm';

const WeeklyWinners: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Weekly Winner</h1>
      <EntryForm formTitle="New Weekly Winner" />
    </div>
  );
};

export default WeeklyWinners;
