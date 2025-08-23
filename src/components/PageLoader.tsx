import { useState, useEffect } from 'react';

const motivatingThoughts = [
  "Dream big. Work hard.",
  "Stay focused and never give up.",
  "The future is bright.",
  "You are capable of amazing things.",
  "Believe in yourself.",
  "Every day is a new beginning.",
  "Keep moving forward.",
  "Success is a journey, not a destination.",
];

const PageLoader = () => {
  const [thought, setThought] = useState('');

  useEffect(() => {
    setThought(motivatingThoughts[Math.floor(Math.random() * motivatingThoughts.length)]);
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <p className="text-lg text-muted-foreground mt-4">{thought}</p>
    </div>
  );
};

export default PageLoader;
