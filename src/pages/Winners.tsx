import { useState, useEffect } from 'react';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import WinnerCard from '@/components/WinnerCard';
import WinnerDetailsModal from '@/components/WinnerDetailsModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, Award, Medal } from 'lucide-react';
import PageLoader from '@/components/PageLoader';

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
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
      try {
        setLoading(true);
        const data = await getWinners();
        setWinners(data);
        setError(null);
      } catch (err) {
        setError('Failed to load winners');
        console.error('Error fetching winners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [dataChanged]);

  // Get unique years and activities for filtering
  const years = Array.from(new Set(winners.map(w => w.year))).sort((a, b) => b.localeCompare(a));
  const activities = Array.from(new Set(winners.filter(w => w.activityType).map(w => w.activityType!)))
    .filter(a => a !== 'General');

  // Filter winners based on selections
  const filteredWinners = winners.filter(winner => {
    const yearMatch = selectedYear === 'all' || winner.year === selectedYear;
    const activityMatch = selectedActivity === 'all' || winner.activityType === selectedActivity;
    return yearMatch && activityMatch;
  });

  // Group winners by position for display
  const championWinners = filteredWinners.filter(w => w.position === 1);
  const runnerUpWinners = filteredWinners.filter(w => w.position === 2);
  const thirdPlaceWinners = filteredWinners.filter(w => w.position === 3);
  const otherWinners = filteredWinners.filter(w => !w.position || w.position > 3);

  const clearFilters = () => {
    setSelectedYear('all');
    setSelectedActivity('all');
  };

  if (loading) return <PageLoader />;

  if (error) {
    return (
      <div className="page-bg-clean">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg-clean">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-6 animate-float-gentle" />
          <h1 className="text-4xl font-bold mb-4 text-gradient-rainbow">Hall of Fame</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Celebrating the outstanding achievements of our students across various SABL activities and competitions.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="clean-card animate-slide-up">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-teal-500 mx-auto mb-2 animate-float-gentle" />
              <p className="text-2xl font-bold text-gradient-teal">{filteredWinners.length}</p>
              <p className="text-sm text-muted-foreground">Total Winners</p>
            </CardContent>
          </Card>
          <Card className="clean-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2 animate-float-gentle" style={{ animationDelay: '0.5s' }} />
              <p className="text-2xl font-bold text-gradient-rainbow">{championWinners.length}</p>
              <p className="text-sm text-muted-foreground">Champions</p>
            </CardContent>
          </Card>
          <Card className="clean-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-orange-500 mx-auto mb-2 animate-float-gentle" style={{ animationDelay: '1s' }} />
              <p className="text-2xl font-bold text-gradient-orange">{years.length}</p>
              <p className="text-sm text-muted-foreground">Years</p>
            </CardContent>
          </Card>
          <Card className="clean-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2 animate-float-gentle" style={{ animationDelay: '1.5s' }} />
              <p className="text-2xl font-bold text-gradient-purple">{activities.length + 1}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 clean-card animate-slide-up rainbow-border">
          <CardHeader>
            <CardTitle className="text-gradient-teal">Filter Winners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block text-gradient-teal">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block text-gradient-orange">Activity</label>
                <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    {activities.map(activity => (
                      <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={clearFilters} className="btn-outline-colorful">
                Clear Filters
              </Button>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredWinners.length} winner{filteredWinners.length !== 1 ? 's' : ''}
              {selectedYear !== 'all' && ` from ${selectedYear}`}
              {selectedActivity !== 'all' && ` in ${selectedActivity}`}
            </div>
          </CardContent>
        </Card>

        {/* Winners Display */}
        {filteredWinners.length === 0 ? (
          <Card className="clean-card">
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4 animate-float-gentle" />
              <h3 className="text-xl font-semibold mb-2 text-gradient-rainbow">No Winners Found</h3>
              <p className="text-muted-foreground">
                No winners match the current filter criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Champions Section */}
            {championWinners.length > 0 && (
              <Card className="clean-card animate-slide-up glow-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gradient-rainbow">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    Champions (1st Place)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {championWinners.map((winner, index) => (
                      <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <WinnerCard 
                          winner={winner} 
                          featured={true}
                          onClick={() => handleWinnerClick(winner)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Runner-ups Section */}
            {runnerUpWinners.length > 0 && (
              <Card className="clean-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gradient-teal">
                    <Medal className="h-6 w-6 text-gray-400" />
                    Runner-ups (2nd Place)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {runnerUpWinners.map((winner, index) => (
                      <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <WinnerCard 
                          winner={winner}
                          onClick={() => handleWinnerClick(winner)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Third Place Section */}
            {thirdPlaceWinners.length > 0 && (
              <Card className="clean-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gradient-orange">
                    <Medal className="h-6 w-6 text-amber-600" />
                    Third Place
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {thirdPlaceWinners.map((winner, index) => (
                      <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <WinnerCard 
                          winner={winner}
                          onClick={() => handleWinnerClick(winner)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other Winners Section */}
            {otherWinners.length > 0 && (
              <Card className="clean-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gradient-purple">
                    <Award className="h-6 w-6 text-purple-500" />
                    Other Winners & Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherWinners.map((winner, index) => (
                      <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <WinnerCard 
                          winner={winner}
                          onClick={() => handleWinnerClick(winner)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Achievement Summary */}
        <div className="mt-16 stats-card-rainbow rounded-3xl p-8 text-white shadow-elevated animate-slide-up glow-effect">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Achievement Summary</h2>
            <p className="text-white/90">
              Recognizing excellence across all our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
              <Trophy className="h-12 w-12 text-yellow-300 mx-auto mb-4 animate-float-gentle" />
              <h3 className="font-semibold text-white mb-2">{championWinners.length} Champions</h3>
              <p className="text-white/80 text-sm">
                First place winners leading by example
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
              <Medal className="h-12 w-12 text-gray-300 mx-auto mb-4 animate-float-gentle" style={{ animationDelay: '0.5s' }} />
              <h3 className="font-semibold text-white mb-2">{runnerUpWinners.length + thirdPlaceWinners.length} Medalists</h3>
              <p className="text-white/80 text-sm">
                Second and third place achievers
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
              <Award className="h-12 w-12 text-purple-300 mx-auto mb-4 animate-float-gentle" style={{ animationDelay: '1s' }} />
              <h3 className="font-semibold text-white mb-2">{otherWinners.length} Participants</h3>
              <p className="text-white/80 text-sm">
                Active contributors to our community
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Winner Details Modal */}
      <WinnerDetailsModal 
        winner={selectedWinner}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Winners;