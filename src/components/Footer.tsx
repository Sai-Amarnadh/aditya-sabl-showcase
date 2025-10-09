import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary via-blue-700 to-primary text-white py-8 mt-auto border-t-4 border-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-white/90 font-medium">Made Possible by</span>
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          </div>

          <a
            href="https://ropebit.live"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/20"
          >
            <Heart className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-white group-hover:text-accent transition-colors">
              Team Ropebit
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>

          <div className="flex items-center gap-2 text-sm text-white/60 mt-2">
            <div className="h-px w-8 bg-white/30"></div>
            <span>Building Tomorrow's Technology Today</span>
            <div className="h-px w-8 bg-white/30"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;