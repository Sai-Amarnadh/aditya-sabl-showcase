import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-white/90">
          Made Possible by{' '}
          <a
            href="https://ropebit.live"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium hover:underline"
          >
            Team Ropebit
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;