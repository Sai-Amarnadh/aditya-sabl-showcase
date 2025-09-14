import { Winner } from '@/lib/data-service';
import { Trophy, Calendar, Medal, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WinnerCardProps {
  winner: Winner;
  featured?: boolean;
  onClick?: () => void;
}

const WinnerCard = ({ winner, featured = false, onClick }: WinnerCardProps) => {
  const getPositionIcon = (position?: number) => {
    if (position === 1) return <Trophy className="h-4 w-4 text-yellow-500 animate-celebration-pulse" />;
    if (position === 2) return <Medal className="h-4 w-4 text-gray-400 animate-tech-glow" />;
    if (position === 3) return <Medal className="h-4 w-4 text-amber-600 animate-winner-sparkle" />;
    return null;
  };

  const getPositionText = (position?: number) => {
    if (position === 1) return '1st Place';
    if (position === 2) return '2nd Place';
    if (position === 3) return '3rd Place';
    return '';
  };

  const getPositionGradient = (position?: number) => {
    if (position === 1) return 'from-yellow-400 to-orange-500';
    if (position === 2) return 'from-gray-300 to-gray-500';
    if (position === 3) return 'from-amber-400 to-orange-500';
    return 'from-blue-500 to-indigo-600';
  };

  return (
    <div 
      className={`winner-card-enhanced animate-card-hover-lift relative group ${
        featured ? 'border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50' : ''
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {featured && (
        <>
          {/* Enhanced sparkle decorations */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-winner-sparkle"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-celebration-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-tech-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-winner-sparkle" style={{ animationDelay: '1.5s' }}></div>
        </>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {winner.photo ? (
              <img 
                src={winner.photo} 
                alt={winner.name} 
                className={`w-16 h-16 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                  featured ? 'border-4 border-gradient-to-r from-yellow-400 to-orange-500 animate-tech-glow' : 'border-2 border-blue-200'
                }`} 
              />
            ) : (
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                featured ? `bg-gradient-to-r ${getPositionGradient(winner.position)} animate-tech-glow` : 'bg-gradient-to-r from-blue-500 to-indigo-600'
              }`}>
                {winner.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {featured && winner.position === 1 && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 animate-celebration-pulse shadow-lg">
                <Trophy className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold text-lg transition-all duration-300 ${
              featured 
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent' 
                : 'text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent'
            }`}>
              {winner.name}
            </h3>
            {winner.rollNumber && (
              <p className="text-sm text-muted-foreground font-medium">{winner.rollNumber}</p>
            )}
            <p className={`font-medium text-sm mt-1 ${
              featured 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
            }`}>
              {winner.event}
            </p>
            
            <div className="flex items-center justify-between text-xs mt-2">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(winner.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              {winner.position && (
                <div className={`flex items-center font-semibold ${
                  featured 
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                }`}>
                  {getPositionIcon(winner.position)}
                  <span className="ml-1">{getPositionText(winner.position)}</span>
                </div>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-1">
              {winner.activityType && winner.activityType !== 'General' && (
                <Link 
                  to="/previous"
                  className={`px-2 py-1 rounded-full transition-all duration-200 inline-flex items-center hover:scale-105 ${
                    featured 
                      ? 'bg-gradient-to-r from-cyan-100 to-blue-100 hover:from-cyan-200 hover:to-blue-200 text-cyan-700' 
                      : 'bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-blue-700'
                  }`}
                >
                  {winner.activityType}
                  <ExternalLink className="h-2 w-2 ml-1" />
                </Link>
              )}
              {winner.weekNumber && (
                <Link 
                  to="/weekly-winners"
                  className={`px-2 py-1 rounded-full transition-all duration-200 inline-flex items-center hover:scale-105 ${
                    featured 
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200' 
                      : 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 hover:from-purple-200 hover:to-indigo-200'
                  }`}
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