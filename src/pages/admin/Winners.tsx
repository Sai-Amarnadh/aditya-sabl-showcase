import React from 'react';
import EntryForm from '@/components/EntryForm';

const Winners: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Winner</h1>
      <EntryForm formTitle="New Winner" />
    </div>
  );
};

export default Winners;
