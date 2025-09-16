import { useState, useEffect } from 'react';
import WinnerCard from '@/components/WinnerCard';
import WinnerDetailsModal from '@/components/WinnerDetailsModal';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Trophy, Filter, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dataChanged } = useData();

  const handleWinnerClick = (winner: Winner) => {
    setSelectedWinner(winner);
    setIsModalOpen(true);
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
    <div className="page-bg-clean">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-yellow-500 mr-3 animate-float-gentle" />
            <h1 className="text-4xl font-bold text-gradient-rainbow">Hall of Fame</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the outstanding achievements of our students across various SABL activities and competitions.
          </p>
        </div>

        {/* Filters */}
        <div className="clean-card backdrop-blur-sm p-6 mb-8 border-teal-200 animate-slide-up rainbow-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-teal-500" />
              <span className="font-medium text-gradient-teal">Filter Winners:</span>
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
              
              <Button variant="outline" onClick={clearFilters} className="btn-navy-outline">
              <Button variant="outline" onClick={clearFilters} className="btn-outline-colorful">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredWinners.length} of {winners.length} winners
            {selectedYear !== 'all' && ` from ${selectedYear}`}
            {selectedEvent !== 'all' && ` in ${selectedEvent}`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-6 mb-8 text-center animate-slide-up">
            <h3 className="font-semibold mb-2">Failed to Load Winners</h3>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2 text-muted-foreground">
              This might be due to a network issue or a problem with the server. Please try again later.
            </p>
          </div>
        )}

        {/* Winners Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="clean-card p-6 animate-pulse">
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
                <h3 className="text-xl font-semibold mb-4 text-center text-gradient-rainbow">🏆 Top Performers of the Week</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {['Activity 1', 'Activity 2'].map(activityType => {
                    const weekWinners = filteredWinners
                      .filter(w => w.isThisWeekWinner && w.activityType === activityType)
                      .sort((a, b) => (a.position || 1) - (b.position || 1));
                    
                    if (weekWinners.length === 0) return null;
                    
                    return (
                      <div key={activityType} className="bg-gradient-to-br from-teal-50 to-orange-50 rounded-xl p-6 border border-teal-200 glow-effect">
                        <h4 className="text-lg font-semibold mb-4 text-center text-gradient-teal">{activityType}</h4>
                        <div className="space-y-3">
                          {weekWinners.map((winner, index) => (
                            <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                              <WinnerCard winner={winner} featured={winner.position === 1} onClick={() => handleWinnerClick(winner)} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWinners.filter(w => !w.isThisWeekWinner).map((winner, index) => (
                <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <WinnerCard winner={winner} onClick={() => handleWinnerClick(winner)} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float-gentle">
              <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gradient-rainbow mb-2">No Winners Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more results.
            </p>
            <Button onClick={clearFilters} className="btn-rainbow">Clear All Filters</Button>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="stats-card-yellow text-center animate-slide-up">
            <Trophy className="h-8 w-8 mx-auto mb-3 animate-float-gentle" />
            <div className="text-3xl font-bold mb-1">{winners.length}</div>
            <div className="text-sm opacity-90">Total Winners</div>
          </div>

          <div className="stats-card-light text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Award className="h-8 w-8 mx-auto mb-3 text-purple-500 animate-float-gentle" style={{ animationDelay: '0.5s' }} />
            <div className="text-3xl font-bold mb-1 text-gradient-purple">{events.length}</div>
            <div className="text-purple-600 text-sm">Different Events</div>
          </div>

          <div className="stats-card-pink text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Calendar className="h-8 w-8 mx-auto mb-3 text-white animate-float-gentle" style={{ animationDelay: '1s' }} />
            <div className="text-3xl font-bold mb-1">{years.length}</div>
            <div className="text-white/90 text-sm">Years of Excellence</div>
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16 stats-card-rainbow rounded-3xl p-8 text-white shadow-elevated animate-slide-up glow-effect">
          <h2 className="text-2xl font-bold text-center mb-6">Achievement Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Most Active Events</h3>
              {events.slice(0, 3).map(event => {
                const eventWinners = winners.filter(w => w.event === event);
                return (
                  <div key={event} className="flex justify-between items-center p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-soft">
                    <span className="text-white">{event}</span>
                    <span className="text-yellow-300 font-semibold">{eventWinners.length} winners</span>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recent Achievements</h3>
              {winners
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map(winner => (
                  <div key={winner.id} className="flex justify-between items-center p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-soft">
                    <div>
                      <div className="text-white font-medium">{winner.name}</div>
                      <div className="text-white/80 text-sm">{winner.event}</div>
                    </div>
                    <div className="text-yellow-300 text-sm">
                      {new Date(winner.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      
      <WinnerDetailsModal
        winner={selectedWinner}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Winners;