import { Winner } from '@/lib/data-service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Medal, Award, User, BookOpen, X } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';

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

  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];
  const pieces = Array.from({ length: 30 }, (_, i) => ({
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
    </div>
  );
};

interface WinnerDetailsModalProps {
  winner: Winner | null;
  isOpen: boolean;
  onClose: () => void;
}

const WinnerDetailsModal = ({ winner, isOpen, onClose }: WinnerDetailsModalProps) => {
  const [showParticles, setShowParticles] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let fireworkTimer: NodeJS.Timeout;
    if (isOpen) {
      setShowParticles(true);
      setShowFireworks(true);
      
      timer = setTimeout(() => {
        setShowParticles(false);
      }, 4000); // Stop emitting particles after 4 seconds
      
      fireworkTimer = setTimeout(() => {
        setShowFireworks(false);
      }, 3000); // Stop fireworks after 3 seconds
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(fireworkTimer);
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
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 animate-glow';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 animate-pulse-custom';
    if (position === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 animate-bounce-custom';
    return 'bg-gradient-to-r from-blue-500 to-purple-600';
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95%] sm:max-w-lg rounded-2xl p-0 border-0 bg-transparent animate-scale-in">
        {isOpen && showParticles && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              particles: {
                number: {
                  value: 0,
                },
                color: {
                  value: ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"]
                },
                shape: {
                  type: ["circle", "square", "triangle", "polygon"],
                  options: {
                    polygon: {
                      sides: 6,
                    },
                  },
                },
                opacity: {
                  value: { min: 0.4, max: 0.9 },
                  animation: {
                    enable: true,
                    speed: 1,
                    startValue: "max",
                    destroy: "min",
                  },
                },
                size: {
                  value: { min: 3, max: 7 },
                },
                life: {
                  duration: {
                    sync: true,
                    value: 5,
                  },
                  count: 1,
                },
                move: {
                  enable: true,
                  gravity: {
                    enable: true,
                    acceleration: 20
                  },
                  speed: { min: 10, max: 30 },
                  decay: 0.05,
                  direction: "top",
                  random: false,
                  straight: false,
                  outModes: {
                    default: "destroy",
                    top: "none",
                  },
                },
                rotate: {
                  value: {
                    min: 0,
                    max: 360,
                  },
                  direction: "random",
                  animation: {
                    enable: true,
                    speed: 60,
                  },
                },
              },
              emitters: {
                direction: "top",
                rate: {
                  quantity: 8,
                  delay: 0.1,
                },
                position: {
                  x: 50,
                  y: 100,
                },
                size: {
                  width: 100,
                  height: 0,
                },
              },
            }}
            className="absolute inset-0 z-0"
          />
        )}
        <div className="relative z-10 bg-white rounded-2xl border shadow-2xl animate-fade-in-up">
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-500 animate-bounce-custom" />
                Winner Details
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
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-200 shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto border-4 border-blue-200 shadow-lg">
                      {winner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}

                  {/* Position Badge */}
                  {winner.position && (
                    <div className={`absolute -bottom-2 -right-2 ${getPositionColor(winner.position)} text-white rounded-full p-2 shadow-lg`}>
                      {getPositionIcon(winner.position)}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-4">{winner.name}</h3>

                {winner.position && (
                  <Badge variant="secondary" className="mt-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 animate-pulse-custom">
                    {getPositionText(winner.position)}
                  </Badge>
                )}
              </div>

              {/* Details Grid */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {winner.rollNumber && (
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Roll Number</p>
                      <p className="font-medium">{winner.rollNumber}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Event</p>
                    <p className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{winner.event}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300">
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
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300">
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
                    <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 hover:scale-105 transition-transform duration-200">
                      {winner.activityType}
                    </Badge>
                  )}
                  {winner.weekNumber && (
                    <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 hover:scale-105 transition-transform duration-200">
                      Week {winner.weekNumber}
                    </Badge>
                  )}
                  {winner.isThisWeekWinner && (
                    <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white animate-glow">
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
    <FireworkEffect show={showFireworks} />
    </>
  );
};

export default WinnerDetailsModal;