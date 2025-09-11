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
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group card-hover relative ${
        featured ? 'border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50' : ''
      } ${onClick ? 'cursor-pointer hover:scale-105 hover:-translate-y-2' : ''}`}
      onClick={onClick}
    >
      {featured && (
        <>
          {/* Celebration sparkles for featured winners */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse-soft"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-float-simple" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-wiggle" style={{ animationDelay: '1.5s' }}></div>
        </>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {winner.photo ? (
              <img src={winner.photo} alt={winner.name} className={`w-16 h-16 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform duration-300 ${featured ? 'border-4 border-gradient-to-r from-yellow-400 to-orange-500 animate-rainbow-border' : 'border-2 border-blue-200'}`} />
            ) : (
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300 ${featured ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-color-cycle' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
                {winner.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {featured && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-1 animate-bounce-custom shadow-lg">
                <Trophy className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold transition-all duration-300 ${featured ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-color-cycle' : 'text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent'}`}>
              {winner.name}
            </h3>
            {winner.rollNumber && (
              <p className="text-sm text-muted-foreground">{winner.rollNumber}</p>
            )}
            <p className={`font-medium text-sm ${featured ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-shimmer' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'}`}>{winner.event}</p>
            
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
                <div className={`flex items-center font-medium ${featured ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-glow' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'}`}>
                  {getPositionIcon(winner.position)}
                  <span className="ml-1">{getPositionText(winner.position)}</span>
                </div>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-1">
              {winner.activityType && winner.activityType !== 'General' && (
                <Link 
                  to="/previous"
                  className={`px-2 py-1 rounded transition-all duration-200 inline-flex items-center hover:scale-105 ${featured ? 'bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 text-orange-700 animate-glow' : 'bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-700'}`}
                >
                  {winner.activityType}
                  <ExternalLink className="h-2 w-2 ml-1" />
                </Link>
              )}
              {winner.weekNumber && (
                <Link 
                  to="/weekly-winners"
                  className={`px-2 py-1 rounded transition-all duration-200 inline-flex items-center hover:scale-105 ${featured ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 hover:from-pink-200 hover:to-purple-200 animate-pulse-soft' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200'}`}
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