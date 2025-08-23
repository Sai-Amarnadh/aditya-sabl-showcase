import { Winner } from '@/lib/data-service';
import { Trophy, Calendar } from 'lucide-react';

interface WinnerCardProps {
  winner: Winner;
  featured?: boolean;
}

const WinnerCard = ({ winner, featured = false }: WinnerCardProps) => {
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
            <p className="text-primary font-medium text-sm">{winner.event}</p>
            <div className="flex items-center text-muted-foreground text-xs mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(winner.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;