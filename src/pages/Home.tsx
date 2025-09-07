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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-accent">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Floating Elements */}
          <div className="absolute top-10 left-5 md:left-10 w-16 md:w-20 h-16 md:h-20 bg-white/10 rounded-full animate-float-simple"></div>
          <div className="absolute top-20 md:top-32 right-10 md:right-20 w-12 md:w-16 h-12 md:h-16 bg-orange-400/20 rounded-full animate-circle-drift"></div>
          <div className="absolute bottom-20 left-1/4 w-20 md:w-24 h-20 md:h-24 bg-yellow-300/15 rounded-full animate-pulse-soft"></div>
          <div className="absolute top-1/2 right-5 md:right-10 w-10 md:w-12 h-10 md:h-12 bg-white/20 rounded-full animate-float-simple" style={{ animationDelay: '1s' }}></div>
          
          {/* Secondary Floating Elements */}
          <div className="absolute top-1/3 left-10 md:left-20 w-8 md:w-10 h-8 md:h-10 bg-accent/15 rounded-full animate-bounce-gentle" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-14 md:w-18 h-14 md:h-18 bg-primary-light/20 rounded-full animate-float-simple" style={{ animationDelay: '3s' }}></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-16 md:top-20 left-1/3 w-6 md:w-8 h-6 md:h-8 bg-orange-400/25 rotate-45 animate-rotate-gentle"></div>
          <div className="absolute bottom-24 md:bottom-32 right-1/3 w-8 md:w-10 h-8 md:h-10 bg-yellow-300/20 rotate-12 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-16 md:left-20 w-4 md:w-6 h-4 md:h-6 bg-white/30 rotate-45 animate-float-simple" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Large Gradient Orbs */}
          <div className="absolute top-8 md:top-16 right-1/4 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-r from-orange-400/10 to-yellow-300/10 rounded-full blur-xl animate-circle-drift"></div>
          <div className="absolute bottom-8 md:bottom-16 left-1/3 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-r from-white/5 to-orange-400/5 rounded-full blur-2xl animate-pulse-soft"></div>
          <div className="absolute top-1/2 left-1/2 w-28 md:w-36 h-28 md:h-36 bg-gradient-to-r from-accent/8 to-primary-light/8 rounded-full blur-2xl animate-morph-gentle" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Animated Lines and Gradients */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
          
          {/* Sparkle Effects */}
          <div className="absolute top-12 left-1/2 w-2 h-2 bg-white/40 rounded-full animate-twinkle" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute bottom-16 left-1/5 w-1.5 h-1.5 bg-yellow-300/50 rounded-full animate-twinkle" style={{ animationDelay: '2.2s' }}></div>
          <div className="absolute top-1/3 right-1/5 w-2.5 h-2.5 bg-orange-400/40 rounded-full animate-twinkle" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span style={{ color: "#F2722C" }}>ADITYA</span> UNIVERSITY
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            CSE Department SABL Activities
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-all duration-300">
              <Link to="/upcoming">
                Explore Activities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* This Week's Winners Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
              🏆 This Week's Winners
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Celebrating our outstanding students who have excelled in recent SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-6 md:mb-8 px-2 md:px-0">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
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
              ))
            ) : thisWeekWinners.length > 0 ? (
              thisWeekWinners
                .sort((a, b) => (a.position || 1) - (b.position || 1))
                .map((winner) => (
                  <WinnerCard 
                    key={winner.id} 
                    winner={winner} 
                    featured={true} 
                    onClick={() => handleWinnerClick(winner)}
                  />
                ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No winners selected for this week yet.</p>
              </div>
            )}
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="outline" asChild className="hover:scale-105 transition-all duration-300">
              <Link to="/winners">
                View All Winners
                <Trophy className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-primary rounded-xl md:rounded-2xl p-6 md:p-12 text-primary-foreground animate-fade-in">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">SABL Impact</h2>
              <p className="text-base md:text-lg opacity-90 px-4">Measuring our success through student engagement and achievements</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-80">Events Conducted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-80">Student Participants</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-sm opacity-80">Winners Celebrated</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-sm opacity-80">Industry Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
              Quick Navigation
            </h2>
            <p className="text-muted-foreground text-base md:text-lg px-4">
              Explore different sections of our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-2 md:px-0">
            <Link to="/upcoming" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300 text-center group-hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Upcoming Activities</h3>
                <p className="text-muted-foreground">Discover exciting events and competitions coming soon</p>
              </div>
            </Link>
            
            <Link to="/previous" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300 text-center group-hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <History className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Previous Activities</h3>
                <p className="text-muted-foreground">Browse through our successful past events and achievements</p>
              </div>
            </Link>
            
            <Link to="/winners" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300 text-center group-hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Hall of Fame</h3>
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
