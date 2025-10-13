import { Winner } from '@/lib/data-service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Medal, Award, User, BookOpen, X } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';

interface WinnerDetailsModalProps {
  winner: Winner | null;
  isOpen: boolean;
  onClose: () => void;
}

const WinnerDetailsModal = ({ winner, isOpen, onClose }: WinnerDetailsModalProps) => {
  const [showParticles, setShowParticles] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setShowParticles(true);
      timer = setTimeout(() => {
        setShowParticles(false);
      }, 6000);
    }
    return () => clearTimeout(timer);
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
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (position === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-primary';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95%] sm:max-w-lg rounded-2xl p-0 border-0 bg-transparent">
        {isOpen && showParticles && (
          <Particles
            id="tsparticles"
            options={{
              fullScreen: { enable: false },
              particles: {
                number: {
                  value: 0,
                },
                color: {
                  value: ["#FF5A86", "#953AFE", "#22C55E", "#3B82F6", "#F97316"]
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
              emitters: [
                {
                  direction: "top",
                  rate: {
                    quantity: 12,
                    delay: 0.08,
                  },
                  position: {
                    x: 25,
                    y: 100,
                  },
                  size: {
                    width: 0,
                    height: 0,
                  },
                },
                {
                  direction: "top",
                  rate: {
                    quantity: 12,
                    delay: 0.08,
                  },
                  position: {
                    x: 75,
                    y: 100,
                  },
                  size: {
                    width: 0,
                    height: 0,
                  },
                },
                {
                  direction: "top",
                  rate: {
                    quantity: 10,
                    delay: 0.1,
                  },
                  position: {
                    x: 50,
                    y: 100,
                  },
                  size: {
                    width: 0,
                    height: 0,
                  },
                },
              ],
            }}
            className="absolute inset-0 z-0"
          />
        )}
        <div className="relative z-10 bg-white rounded-2xl border-4 border-yellow-500 shadow-2xl animate-pulse-soft">
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Winner Details
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Winner Photo and Basic Info */}
              <div className="text-center">
                <div className="relative inline-block">
                  {winner.photo ? (
                    <img
                      src={winner.photo}
                      alt={winner.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto border-4 border-primary/20">
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

                <h3 className="text-xl font-bold text-foreground mt-4">{winner.name}</h3>

                {winner.position && (
                  <Badge variant="secondary" className="mt-2">
                    {getPositionText(winner.position)}
                  </Badge>
                )}
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                {winner.rollNumber && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Roll Number</p>
                      <p className="font-medium">{winner.rollNumber}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Event</p>
                    <p className="font-medium text-primary">{winner.event}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
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
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
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
                <div className="flex flex-wrap justify-center gap-2 pt-4 border-t">
                  {winner.activityType && winner.activityType !== 'General' && (
                    <Badge variant="outline" className="bg-secondary/50">
                      {winner.activityType}
                    </Badge>
                  )}
                  {winner.weekNumber && (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Week {winner.weekNumber}
                    </Badge>
                  )}
                  {winner.isThisWeekWinner && (
                    <Badge className="bg-gradient-primary">
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
  );
};

export default WinnerDetailsModal;