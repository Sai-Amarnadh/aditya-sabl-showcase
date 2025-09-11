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
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group card-hover ${
        featured ? 'border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50' : ''
      } ${onClick ? 'cursor-pointer hover:scale-105 hover:-translate-y-2' : ''}`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {winner.photo ? (
              <img src={winner.photo} alt={winner.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 shadow-md group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                {winner.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {featured && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-1 animate-bounce-custom">
                <Trophy className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {winner.name}
            </h3>
            {winner.rollNumber && (
              <p className="text-sm text-muted-foreground">{winner.rollNumber}</p>
            )}
            <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium text-sm">{winner.event}</p>
            
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
                <div className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  {getPositionIcon(winner.position)}
                  <span className="ml-1">{getPositionText(winner.position)}</span>
                </div>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-1">
              {winner.activityType && winner.activityType !== 'General' && (
                <Link 
                  to="/previous"
                  className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-700 px-2 py-1 rounded transition-all duration-200 inline-flex items-center hover:scale-105"
                >
                  {winner.activityType}
                  <ExternalLink className="h-2 w-2 ml-1" />
                </Link>
              )}
              {winner.weekNumber && (
                <Link 
                  to="/weekly-winners"
                  className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 px-2 py-1 rounded transition-all duration-200 inline-flex items-center hover:scale-105"
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