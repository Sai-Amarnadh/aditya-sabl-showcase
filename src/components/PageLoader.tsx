import { useState, useEffect } from 'react';

const motivatingThoughts = [
  "The secret of getting ahead is getting started.",
  "The best way to predict the future is to create it.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
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
