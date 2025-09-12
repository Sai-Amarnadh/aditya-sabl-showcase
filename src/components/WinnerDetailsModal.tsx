import { Winner } from '@/lib/data-service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Medal, Award, User, BookOpen, X } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

// Confetti component for celebration effect
const ConfettiPiece = ({ color, left, delay }: { color: string; left: number; delay: number }) => (
  <div
    className="confetti-piece"
    style={{
      backgroundColor: color,
      left: `${left}%`,
      animationDelay: `${delay}s`,
    }}
  />
);

const FireworkEffect = ({ show }: { show: boolean }) => {
  if (!show) return null;

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#fd79a8', '#00b894', '#e17055'];
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          color={piece.color}
          left={piece.left}
          delay={piece.delay}
        />
      ))}
      {/* Additional celebration sparkles */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce-custom opacity-80"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-float-simple opacity-80" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-cyan-400 rounded-full animate-pulse-soft opacity-80" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-wiggle opacity-80" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

interface WinnerDetailsModalProps {
  winner: Winner | null;
  isOpen: boolean;
  onClose: () => void;
}

const WinnerDetailsModal = ({ winner, isOpen, onClose }: WinnerDetailsModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    let confettiTimer: NodeJS.Timeout;
    if (isOpen) {
      setShowConfetti(true);
      
      confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000); // Stop confetti after 4 seconds
    }
    return () => {
      clearTimeout(confettiTimer);
    };
  }, [isOpen]);

  if (!winner) return null;

  const getPositionIcon = (position?: number) => {
    if (position === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (position === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (position === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <Award className="h-5 w-5 text-primary" />;
  };

  const getPositionText = (position?: number) => {
    if (position === 1) return '1st Place Champion';
    if (position === 2) return '2nd Place Runner-up';
    if (position === 3) return '3rd Place';
    return `Position ${position}`;
  };

  const getPositionColor = (position?: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 animate-celebration-glow';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 animate-pulse-custom shadow-lg';
    if (position === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 animate-bounce-custom shadow-lg';
    return 'bg-gradient-to-r from-blue-500 to-purple-600';
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-[95%] sm:max-w-lg rounded-2xl p-0 border-0 bg-transparent animate-scale-in relative overflow-hidden">
        {/* Celebration Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl animate-pulse-soft"></div>
        
        <div className="relative z-10 bg-white rounded-2xl border-4 border-transparent shadow-2xl animate-fade-in-up overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-2xl animate-color-cycle opacity-50"></div>
          <div className="absolute inset-1 bg-white rounded-xl"></div>
          
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="p-6 relative z-10">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500 animate-bounce-custom" />
                <span className="gradient-text-vibrant">🎉 Winner Details 🎉</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Winner Photo and Basic Info */}
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative inline-block">
                  {winner.photo ? (
                    <img
                      src={winner.photo}
                      alt={winner.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gradient-to-r from-yellow-400 to-orange-500 shadow-lg hover:scale-105 transition-transform duration-300 animate-rainbow-border"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto border-4 border-yellow-300 shadow-lg animate-color-cycle">
                      {winner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}

                  {/* Position Badge */}
                  {winner.position && (
                    <div className={`absolute -bottom-2 -right-2 ${getPositionColor(winner.position)} text-white rounded-full p-2 shadow-lg animate-wiggle`}>
                      {getPositionIcon(winner.position)}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold gradient-text-vibrant mt-4 animate-color-cycle">{winner.name}</h3>

                {winner.position && (
                  <Badge variant="secondary" className="mt-2 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 text-orange-700 animate-celebration-glow border-2 border-yellow-300">
                    {getPositionText(winner.position)}
                  </Badge>
                )}
              </div>

              {/* Details Grid */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {winner.rollNumber && (
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300 border border-cyan-200 animate-hover-lift">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Roll Number</p>
                      <p className="font-medium">{winner.rollNumber}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 rounded-lg hover:shadow-md transition-all duration-300 border border-pink-200 animate-hover-lift">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Event</p>
                    <p className="font-medium gradient-text-vibrant">{winner.event}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-lg hover:shadow-md transition-all duration-300 border border-green-200 animate-hover-lift">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                    <p className="font-medium">
                      {new Date(winner.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {winner.year && (
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 via-yellow-50 to-red-50 rounded-lg hover:shadow-md transition-all duration-300 border border-orange-200 animate-hover-lift">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Academic Year</p>
                      <p className="font-medium">{winner.year}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Type and Week */}
              {(winner.activityType || winner.weekNumber) && (
                <div className="flex flex-wrap justify-center gap-2 pt-4 border-t animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  {winner.activityType && winner.activityType !== 'General' && (
                    <Badge variant="outline" className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-cyan-300 hover:scale-105 transition-transform duration-200 animate-glow">
                      {winner.activityType}
                    </Badge>
                  )}
                  {winner.weekNumber && (
                    <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300 hover:scale-105 transition-transform duration-200 animate-pulse-soft">
                      Week {winner.weekNumber}
                    </Badge>
                  )}
                  {winner.isThisWeekWinner && (
                    <Badge className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white animate-celebration-glow border-2 border-green-300">
                      This Week's Winner
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <ConfettiEffect show={showConfetti} />
    </>
  );
};

export default WinnerDetailsModal;