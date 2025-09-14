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
    <div className="min-h-screen page-bg-modern">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/90 via-blue-500/90 to-purple-500/90">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Students collaborating" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Floating Elements */}
          <div className="absolute top-10 left-5 md:left-10 w-16 md:w-20 h-16 md:h-20 decoration-modern decoration-coral animate-float-gentle"></div>
          <div className="absolute top-20 md:top-32 right-10 md:right-20 w-12 md:w-16 h-12 md:h-16 decoration-modern decoration-yellow animate-float-gentle" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 md:w-24 h-20 md:h-24 decoration-modern decoration-mint animate-pulse-soft"></div>
          <div className="absolute top-1/2 right-5 md:right-10 w-10 md:w-12 h-10 md:h-12 decoration-modern decoration-purple animate-float-gentle" style={{ animationDelay: '1s' }}></div>
          
          {/* Secondary Floating Elements */}
          <div className="absolute top-1/3 left-10 md:left-20 w-8 md:w-10 h-8 md:h-10 decoration-modern decoration-teal animate-bounce-gentle" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-14 md:w-18 h-14 md:h-18 decoration-modern decoration-blue animate-float-gentle" style={{ animationDelay: '3s' }}></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-16 md:top-20 left-1/3 w-6 md:w-8 h-6 md:h-8 decoration-coral rotate-45 animate-rotate-slow"></div>
          <div className="absolute bottom-24 md:bottom-32 right-1/3 w-8 md:w-10 h-8 md:h-10 decoration-mint rotate-12 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-16 md:left-20 w-4 md:w-6 h-4 md:h-6 decoration-yellow rotate-45 animate-float-gentle" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Large Gradient Orbs */}
          <div className="absolute top-8 md:top-16 right-1/4 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-r from-coral-400/15 to-pink-400/15 rounded-full blur-xl animate-float-gentle"></div>
          <div className="absolute bottom-8 md:bottom-16 left-1/3 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse-soft"></div>
          <div className="absolute top-1/2 left-1/2 w-28 md:w-36 h-28 md:h-36 bg-gradient-to-r from-teal-400/12 to-mint-400/12 rounded-full blur-2xl animate-float-gentle" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Animated Lines and Gradients */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-coral-400/25 to-transparent animate-pulse-soft"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint-400/25 to-transparent animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-pulse-soft" style={{ animationDelay: '3s' }}></div>
          
          {/* Sparkle Effects */}
          <div className="absolute top-12 left-1/2 w-2 h-2 bg-yellow-300/50 rounded-full animate-pulse-soft" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute bottom-16 left-1/5 w-1.5 h-1.5 bg-coral-400/60 rounded-full animate-pulse-soft" style={{ animationDelay: '2.2s' }}></div>
          <div className="absolute top-1/3 right-1/5 w-2.5 h-2.5 bg-teal-400/50 rounded-full animate-pulse-soft" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="text-white">ADITYA</span> <span className="text-white">UNIVERSITY</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Department of Computer Science and Engineering
            <br />
            SABL Activites
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" asChild className="btn-modern-primary">
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
          <div className="text-center mb-8 md:mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
              🏆 Top Performers of the Week
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Celebrating our outstanding students who have excelled in recent SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-6 md:mb-8 px-2 md:px-0">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="modern-card p-6 animate-pulse">
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
          
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="outline" asChild className="btn-modern-secondary">
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
          <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-2xl p-6 md:p-12 text-white animate-slide-up shadow-elevated">
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
      <section className="py-12 md:py-16 bg-gradient-to-r from-teal-50/50 to-mint-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
              Quick Navigation
            </h2>
            <p className="text-muted-foreground text-base md:text-lg px-4">
              Explore different sections of our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-2 md:px-0">
            <Link to="/upcoming" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="modern-card modern-card-hover p-8 text-center border-teal-200">
                <div className="w-16 h-16 gradient-teal-mint rounded-full flex items-center justify-center mx-auto mb-4 transition-all">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Upcoming Activities</h3>
                <p className="text-muted-foreground">Discover exciting events and competitions coming soon</p>
              </div>
            </Link>
            
            <Link to="/previous" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="modern-card modern-card-hover p-8 text-center border-mint-200">
                <div className="w-16 h-16 gradient-mint-teal rounded-full flex items-center justify-center mx-auto mb-4 transition-all">
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Previous Activities</h3>
                <p className="text-muted-foreground">Browse through our successful past events and achievements</p>
              </div>
            </Link>
            
            <Link to="/winners" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="modern-card modern-card-hover p-8 text-center border-coral-200">
                <div className="w-16 h-16 gradient-coral-yellow rounded-full flex items-center justify-center mx-auto mb-4 transition-all">
                  <Trophy className="h-8 w-8 text-white" />
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