import { Winner } from '@/lib/data-service';
import { Trophy, Calendar, Medal } from 'lucide-react';

interface WinnerCardProps {
  winner: Winner;
  featured?: boolean;
}

const WinnerCard = ({ winner, featured = false }: WinnerCardProps) => {
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
    <div className={`bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden group ${
      featured ? 'border-2 border-primary/20' : ''
    }`}>
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {winner.photo ? (
              <img src={winner.photo} alt={winner.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                {winner.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {featured && (
              <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                <Trophy className="h-3 w-3 text-primary-foreground" />
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
            
            {(winner.activityType && winner.activityType !== 'General') || winner.weekNumber ? (
              <div className="text-xs text-muted-foreground mt-1">
                {winner.activityType && winner.activityType !== 'General' && (
                  <span className="bg-secondary/50 px-2 py-1 rounded mr-2">{winner.activityType}</span>
                )}
                {winner.weekNumber && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">Week {winner.weekNumber}</span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;