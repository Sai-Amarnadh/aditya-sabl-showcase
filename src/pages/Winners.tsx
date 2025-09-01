import { useState, useEffect } from 'react';
import WinnerCard from '@/components/WinnerCard';
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

  const { dataChanged } = useData();

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Hall of Fame</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the outstanding achievements of our students across various SABL activities and competitions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground text-center">
            <Trophy className="h-8 w-8 mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{winners.length}</div>
            <div className="text-sm opacity-90">Total Winners</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold text-card-foreground mb-1">{events.length}</div>
            <div className="text-muted-foreground text-sm">Different Events</div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold text-card-foreground mb-1">{years.length}</div>
            <div className="text-muted-foreground text-sm">Years of Excellence</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 shadow-card mb-8">
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
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredWinners.length} of {winners.length} winners
            {selectedYear !== 'all' && ` from ${selectedYear}`}
            {selectedEvent !== 'all' && ` in ${selectedEvent}`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-6 mb-8 text-center">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWinners.map((winner) => (
              <WinnerCard key={winner.id} winner={winner} />
            ))}
          </div>
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

        {/* Achievement Highlights */}
        <div className="mt-16 bg-gradient-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Achievement Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Most Active Events</h3>
              {events.slice(0, 3).map(event => {
                const eventWinners = winners.filter(w => w.event === event);
                return (
                  <div key={event} className="flex justify-between items-center p-3 bg-card rounded-lg shadow-sm">
                    <span className="text-card-foreground">{event}</span>
                    <span className="text-primary font-semibold">{eventWinners.length} winners</span>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Recent Achievements</h3>
              {winners
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map(winner => (
                  <div key={winner.id} className="flex justify-between items-center p-3 bg-card rounded-lg shadow-sm">
                    <div>
                      <div className="text-card-foreground font-medium">{winner.name}</div>
                      <div className="text-muted-foreground text-sm">{winner.event}</div>
                    </div>
                    <div className="text-primary text-sm">
                      {new Date(winner.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Winners;