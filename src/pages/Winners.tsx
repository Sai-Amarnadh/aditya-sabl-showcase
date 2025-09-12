import { useState, useEffect } from 'react';
import WinnerCard from '@/components/WinnerCard';
import WinnerDetailsModal from '@/components/WinnerDetailsModal';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Trophy, Filter, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Confetti component
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

const ConfettiEffect = ({ show }: { show: boolean }) => {
  if (!show) return null;

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
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

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { dataChanged } = useData();

  const handleWinnerClick = (winner: Winner) => {
    setSelectedWinner(winner);
    setIsModalOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWinner(null);
  };

  useEffect(() => {
    const fetchWinners = async () => {
      setLoading(true);
      setError(null);
      try {
        const winnersData = await getWinners();
        setWinners(winnersData);
      } catch (err) {
        console.error('Error fetching winners:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWinners();
  }, [dataChanged]);

  const years = Array.from(new Set(winners.map(w => w.year))).sort().reverse();
  const events = Array.from(new Set(winners.map(w => w.event))).sort();

  const filteredWinners = winners.filter(winner => {
    const yearMatch = selectedYear === 'all' || winner.year === selectedYear;
    const eventMatch = selectedEvent === 'all' || winner.event === selectedEvent;
    return yearMatch && eventMatch;
  });

  const clearFilters = () => {
    setSelectedYear('all');
    setSelectedEvent('all');
  };

  return (
    <div className="min-h-screen bg-background vibrant-bg-1 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="page-decoration decoration-circle w-20 h-20 top-10 left-10 animate-float-simple"></div>
      <div className="page-decoration decoration-square w-16 h-16 top-20 right-20 animate-rotate-gentle"></div>
      <div className="page-decoration decoration-circle w-12 h-12 bottom-32 left-1/4 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      <div className="page-decoration decoration-triangle bottom-20 right-1/3" style={{ animationDelay: '2s' }}></div>
      <div className="page-decoration decoration-circle w-24 h-24 top-1/2 right-10 animate-pulse-soft"></div>
      <div className="page-decoration decoration-square w-8 h-8 bottom-1/4 left-16 animate-float-simple" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Hall of Fame</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the outstanding achievements of our students across various SABL activities and competitions.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-card mb-8 border border-purple-200 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-medium text-card-foreground">Filter Winners:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    {events.map(event => (
                      <SelectItem key={event} value={event}>{event}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 relative z-10">
          <p className="text-muted-foreground">
            Showing {filteredWinners.length} of {winners.length} winners
            {selectedYear !== 'all' && ` from ${selectedYear}`}
            {selectedEvent !== 'all' && ` in ${selectedEvent}`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-6 mb-8 text-center relative z-10">
            <h3 className="font-semibold mb-2">Failed to Load Winners</h3>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2 text-muted-foreground">
              This might be due to a network issue or a problem with the server. Please try again later.
            </p>
          </div>
        )}

        {/* Winners Grid */}
        <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-card animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-1"></div>
                    <div className="h-3 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredWinners.length > 0 ? (
          <>
            {/* Group winners by week and activity type for current week winners */}
            {filteredWinners.some(w => w.isThisWeekWinner) && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">🏆 Top Performers of the Week</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {['Activity 1', 'Activity 2'].map(activityType => {
                    const weekWinners = filteredWinners
                      .filter(w => w.isThisWeekWinner && w.activityType === activityType)
                      .sort((a, b) => (a.position || 1) - (b.position || 1));
                    
                    if (weekWinners.length === 0) return null;
                    
                    return (
                      <div key={activityType} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
                        <h4 className="text-lg font-semibold mb-4 text-center text-primary">{activityType}</h4>
                        <div className="space-y-3">
                          {weekWinners.map((winner) => (
                            <WinnerCard key={winner.id} winner={winner} featured={winner.position === 1} onClick={() => handleWinnerClick(winner)} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWinners.filter(w => !w.isThisWeekWinner).map((winner) => (
                <WinnerCard key={winner.id} winner={winner} onClick={() => handleWinnerClick(winner)} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Winners Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more results.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 relative z-10">
          <div className="interactive-card bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-lg p-6 text-white text-center animate-hover-lift">
            <Trophy className="h-8 w-8 mx-auto mb-3 animate-wiggle" />
            <div className="text-3xl font-bold mb-1">{winners.length}</div>
            <div className="text-white/90 text-sm">Total Winners</div>
          </div>

          <div className="interactive-card bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift" style={{ animationDelay: '0.2s' }}>
            <Award className="h-8 w-8 mx-auto mb-3 text-white animate-bounce-gentle" />
            <div className="text-3xl font-bold mb-1">{events.length}</div>
            <div className="text-white/90 text-sm">Different Events</div>
          </div>

          <div className="interactive-card bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-6 shadow-card text-center text-white animate-hover-lift" style={{ animationDelay: '0.4s' }}>
            <Calendar className="h-8 w-8 mx-auto mb-3 text-white animate-float-simple" />
            <div className="text-3xl font-bold mb-1">{years.length}</div>
            <div className="text-white/90 text-sm">Years of Excellence</div>
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16 interactive-card bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative z-10 animate-celebration-glow">
          <h2 className="text-2xl font-bold text-white mb-6 text-center animate-color-cycle">🏆 Achievement Highlights 🏆</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white animate-fade-in-up">🎯 Most Active Events</h3>
              {events.slice(0, 3).map(event => {
                const eventWinners = winners.filter(w => w.event === event);
                return (
                  <div key={event} className="flex justify-between items-center p-3 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm interactive-card animate-hover-lift">
                    <span className="text-white">{event}</span>
                    <span className="text-yellow-300 font-semibold animate-glow">{eventWinners.length} winners</span>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>⭐ Recent Achievements</h3>
              {winners
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map(winner => (
                  <div key={winner.id} className="flex justify-between items-center p-3 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm interactive-card animate-hover-lift">
                    <div>
                      <div className="text-white font-medium">{winner.name}</div>
                      <div className="text-white/80 text-sm">{winner.event}</div>
                    </div>
                    <div className="text-yellow-300 text-sm animate-pulse-soft">
                      {new Date(winner.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      
      <ConfettiEffect show={showConfetti} />
      <WinnerDetailsModal
        winner={selectedWinner}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Winners;