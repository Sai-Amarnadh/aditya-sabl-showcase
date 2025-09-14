import { Winner } from '@/lib/data-service';
import { Trophy, Calendar, Medal, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WinnerCardProps {
  winner: Winner;
  featured?: boolean;
  onClick?: () => void;
}

const WinnerCard = ({ winner, featured = false, onClick }: WinnerCardProps) => {
  const getPositionIcon = (position?: number) => {
    if (position === 1) return <Trophy className="h-3 w-3 text-yellow-500" />;
    if (position === 2) return <Medal className="h-3 w-3 text-gray-400" />;
    if (position === 3) return <Medal className="h-3 w-3 text-amber-600" />;
    return null;
  };

  const getPositionText = (position?: number) => {
    if (position === 1) return '1st Place';
    if (position === 2) return '2nd Place';
    if (position === 3) return '3rd Place';
    return '';
  };

  return (
    <div 
      className={`modern-card modern-card-hover overflow-hidden group ${
        featured ? 'border-2 border-primary' : 'border border-gray-100/50'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {winner.photo ? (
              <img src={winner.photo} alt={winner.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 gradient-teal-mint rounded-full flex items-center justify-center text-white font-bold text-lg">
                {winner.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {featured && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                <Trophy className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {winner.name}
            </h3>
            {winner.rollNumber && (
              <p className="text-sm text-muted-foreground">{winner.rollNumber}</p>
            )}
            <p className="text-primary font-medium text-sm">{winner.event}</p>
            
            <div className="flex items-center justify-between text-xs mt-1">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(winner.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              {winner.position && (
                <div className="flex items-center text-primary font-medium">
                  {getPositionIcon(winner.position)}
                  <span className="ml-1">{getPositionText(winner.position)}</span>
                </div>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-1">
              {winner.activityType && winner.activityType !== 'General' && (
                <Link 
                  to="/previous"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-2 py-1 rounded-full transition-colors inline-flex items-center"
                >
                  {winner.activityType}
                  <ExternalLink className="h-2 w-2 ml-1" />
                </Link>
              )}
              {winner.weekNumber && (
                <Link 
                  to="/weekly-winners"
                  className="bg-coral-100 text-coral-700 hover:bg-coral-200 px-2 py-1 rounded-full transition-colors inline-flex items-center"
                >
                  Week {winner.weekNumber}
                  <ExternalLink className="h-2 w-2 ml-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;