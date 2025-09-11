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
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden bg-pattern-dots">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-500/90">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Students collaborating" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        {/* Modern Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Modern Floating Elements */}
          <div className="absolute top-10 left-5 md:left-10 w-16 md:w-20 h-16 md:h-20 bg-blue-400/20 rounded-full animate-float"></div>
          <div className="absolute top-20 md:top-32 right-10 md:right-20 w-12 md:w-16 h-12 md:h-16 bg-purple-400/30 rounded-full animate-bounce-custom"></div>
          <div className="absolute bottom-20 left-1/4 w-20 md:w-24 h-20 md:h-24 bg-pink-300/25 rounded-full animate-pulse-custom"></div>
          <div className="absolute top-1/2 right-5 md:right-10 w-10 md:w-12 h-10 md:h-12 bg-blue-400/25 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          
          {/* Secondary Elements */}
          <div className="absolute top-1/3 left-10 md:left-20 w-8 md:w-10 h-8 md:h-10 bg-purple-400/20 rounded-full animate-bounce-custom" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-14 md:w-18 h-14 md:h-18 bg-blue-400/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-16 md:top-20 left-1/3 w-6 md:w-8 h-6 md:h-8 bg-pink-400/30 rotate-45 animate-rotate"></div>
          <div className="absolute bottom-24 md:bottom-32 right-1/3 w-8 md:w-10 h-8 md:h-10 bg-purple-400/25 rotate-12 animate-pulse-custom" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-16 md:left-20 w-4 md:w-6 h-4 md:h-6 bg-blue-400/35 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Large Gradient Orbs */}
          <div className="absolute top-8 md:top-16 right-1/4 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-8 md:bottom-16 left-1/3 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse-custom"></div>
          <div className="absolute top-1/2 left-1/2 w-28 md:w-36 h-28 md:h-36 bg-gradient-to-r from-blue-400/12 to-purple-400/12 rounded-full blur-2xl animate-bounce-custom" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">ADITYA</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">UNIVERSITY</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Department of Computer Science and Engineering
            <br />
            SABL Activites
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Link to="/upcoming">
                Explore Activities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* This Week's Winners Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">
              🏆 Top Performers of the Week
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Celebrating our outstanding students who have excelled in recent SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-6 md:mb-8 px-2 md:px-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
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
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
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
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-xl md:rounded-2xl p-6 md:p-12 text-white shadow-2xl animate-scale-in">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">SABL Impact</h2>
              <p className="text-base md:text-lg opacity-90 px-4">Measuring our success through student engagement and achievements</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <div className="text-4xl font-bold mb-2 animate-bounce-custom">50+</div>
                <div className="text-sm opacity-80">Events Conducted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 animate-bounce-custom" style={{ animationDelay: '0.5s' }}>500+</div>
                <div className="text-sm opacity-80">Student Participants</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 animate-bounce-custom" style={{ animationDelay: '1s' }}>100+</div>
                <div className="text-sm opacity-80">Winners Celebrated</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 animate-bounce-custom" style={{ animationDelay: '1.5s' }}>25+</div>
                <div className="text-sm opacity-80">Industry Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">
              Quick Navigation
            </h2>
            <p className="text-muted-foreground text-base md:text-lg px-4">
              Explore different sections of our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-2 md:px-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/upcoming" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center card-hover border border-blue-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Upcoming Activities</h3>
                <p className="text-muted-foreground">Discover exciting events and competitions coming soon</p>
              </div>
            </Link>
            
            <Link to="/previous" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center card-hover border border-green-100">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-600 group-hover:to-emerald-700 transition-all">
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Previous Activities</h3>
                <p className="text-muted-foreground">Browse through our successful past events and achievements</p>
              </div>
            </Link>
            
            <Link to="/winners" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center card-hover border border-yellow-100">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-yellow-600 group-hover:to-orange-700 transition-all">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">Hall of Fame</h3>
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