import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import WinnerCard from '@/components/WinnerCard';
import WinnerDetailsModal from '@/components/WinnerDetailsModal';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Calendar, History, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [thisWeekWinners, setThisWeekWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
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
      try {
        const allWinners = await getWinners();
        setThisWeekWinners(allWinners.filter(w => w.isThisWeekWinner));
      } catch (error) {
        console.error('Error fetching winners:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWinners();
  }, [dataChanged]);

  return (
    <div className="page-bg-clean">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Colorful Hero Background */}
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-orange-400/20 to-purple-400/20 animate-pulse"></div>
        </div>
        
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/90 via-orange-500/90 to-purple-500/90">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Students collaborating" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-bounce-in">
            <span className="text-white animate-float-gentle">ADITYA</span> <span className="text-yellow-200">UNIVERSITY</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 opacity-90 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
            Department of Computer Science and Engineering
            <br />
            SABL Activities
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
            Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
          </p>
          <div className="animate-bounce-in" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" asChild className="btn-rainbow animate-pulse-colorful">
              <Link to="/upcoming">
                Explore Activities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* This Week's Winners Section */}
      <section className="section-clean">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-rainbow mb-4">
              🏆 Top Performers of the Week
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Celebrating our outstanding students who have excelled in recent SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
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
              ))
            ) : thisWeekWinners.length > 0 ? (
              thisWeekWinners
                .sort((a, b) => (a.position || 1) - (b.position || 1))
                .map((winner, index) => (
                  <div key={winner.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <WinnerCard 
                      winner={winner} 
                      featured={true} 
                      onClick={() => handleWinnerClick(winner)}
                    />
                  </div>
                ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No winners selected for this week yet.</p>
              </div>
            )}
          </div>
          
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="outline" asChild className="btn-outline-colorful">
              <Link to="/winners">
                View All Winners
                <Trophy className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-clean bg-gray-50">
        <div className="container mx-auto">
          <div className="stats-card-rainbow rounded-3xl p-8 md:p-12 text-white animate-slide-up shadow-elevated glow-effect">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">SABL Impact</h2>
              <p className="text-lg opacity-90">Measuring our success through student engagement and achievements</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-80">Events Conducted</div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-80">Student Participants</div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-sm opacity-80">Winners Celebrated</div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-sm opacity-80">Industry Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="section-clean">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-rainbow mb-4">
              Quick Navigation
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore different sections of our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/upcoming" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="clean-card clean-card-hover p-8 text-center border-teal-200 group-hover:border-teal-400 transition-all duration-300 hover:glow-effect">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 animate-float-gentle">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gradient-teal mb-2">Upcoming Activities</h3>
                <p className="text-muted-foreground">Discover exciting events and competitions coming soon</p>
              </div>
            </Link>
            
            <Link to="/previous" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="clean-card clean-card-hover p-8 text-center border-orange-200 group-hover:border-orange-400 transition-all duration-300 hover:glow-effect">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 animate-float-gentle" style={{ animationDelay: '0.5s' }}>
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gradient-orange mb-2">Previous Activities</h3>
                <p className="text-muted-foreground">Browse through our successful past events and achievements</p>
              </div>
            </Link>
            
            <Link to="/winners" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="clean-card clean-card-hover p-8 text-center border-purple-200 group-hover:border-purple-400 transition-all duration-300 hover:glow-effect">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 animate-float-gentle" style={{ animationDelay: '1s' }}>
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gradient-purple mb-2">Hall of Fame</h3>
                <p className="text-muted-foreground">Honor roll of all our winners and achievers</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Winner Details Modal */}
      <WinnerDetailsModal 
        winner={selectedWinner}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;