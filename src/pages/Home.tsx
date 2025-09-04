import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import WinnerCard from '@/components/WinnerCard';
import WinnerDetailsModal from '@/components/WinnerDetailsModal';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Calendar, History, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';

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
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40 animate-bounce" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-orange-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-30 animate-bounce" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse">
              ADITYA
            </span>{' '}
            <span className="animate-fade-in" style={{animationDelay: '0.5s'}}>
              UNIVERSITY
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 opacity-90 animate-fade-in" style={{animationDelay: '1s'}}>
            CSE Department SABL Activities
          </h2>
          
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '1.5s'}}>
            Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
          </p>
          
          <div className="animate-fade-in hover-scale" style={{animationDelay: '2s'}}>
            <Button size="lg" variant="secondary" asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/upcoming">
                Explore Activities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-20 h-20 border border-orange-400/20 rounded-full animate-pulse top-20 left-20" style={{animationDelay: '0s'}} />
          <div className="absolute w-16 h-16 border border-blue-400/20 rounded-full animate-pulse bottom-20 right-20" style={{animationDelay: '1.5s'}} />
          <div className="absolute w-12 h-12 border border-orange-300/30 rounded-full animate-pulse top-40 right-40" style={{animationDelay: '3s'}} />
        </div>
      </section>

      {/* This Week's Winners Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 animate-fade-in">
              🏆 This Week's Winners
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.3s'}}>
              Celebrating our outstanding students who have excelled in recent SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {loading ? (
              // Loading skeleton with animations
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-card rounded-lg p-6 shadow-card animate-pulse hover-scale" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-muted to-muted/50 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-muted to-muted/50 rounded mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-muted to-muted/50 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : thisWeekWinners.length > 0 ? (
              thisWeekWinners
                .sort((a, b) => (a.position || 1) - (b.position || 1))
                .map((winner, index) => (
                  <div key={winner.id} className="animate-fade-in hover-scale" style={{animationDelay: `${index * 0.2}s`}}>
                    <WinnerCard 
                      winner={winner} 
                      featured={true} 
                      onClick={() => handleWinnerClick(winner)}
                    />
                  </div>
                ))
            ) : (
              <div className="col-span-3 text-center py-8 animate-fade-in">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <p className="text-muted-foreground">No winners selected for this week yet.</p>
              </div>
            )}
          </div>
          
          <div className="text-center animate-fade-in" style={{animationDelay: '1s'}}>
            <Button variant="outline" asChild className="hover-scale">
              <Link to="/winners">
                View All Winners
                <Trophy className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden animate-fade-in">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-8 animate-fade-in">
                <h2 className="text-3xl font-bold mb-4">SABL Impact</h2>
                <p className="text-lg opacity-90">Measuring our success through student engagement and achievements</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="animate-fade-in hover-scale" style={{animationDelay: '0.2s'}}>
                  <div className="text-4xl font-bold mb-2 animate-pulse">50+</div>
                  <div className="text-sm opacity-80">Events Conducted</div>
                </div>
                <div className="animate-fade-in hover-scale" style={{animationDelay: '0.4s'}}>
                  <div className="text-4xl font-bold mb-2 animate-pulse">500+</div>
                  <div className="text-sm opacity-80">Student Participants</div>
                </div>
                <div className="animate-fade-in hover-scale" style={{animationDelay: '0.6s'}}>
                  <div className="text-4xl font-bold mb-2 animate-pulse">100+</div>
                  <div className="text-sm opacity-80">Winners Celebrated</div>
                </div>
                <div className="animate-fade-in hover-scale" style={{animationDelay: '0.8s'}}>
                  <div className="text-4xl font-bold mb-2 animate-pulse">25+</div>
                  <div className="text-sm opacity-80">Industry Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Quick Navigation
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore different sections of our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/upcoming" className="group animate-fade-in" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)} style={{animationDelay: '0.2s'}}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300 text-center group-hover:scale-105 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-900/20 dark:hover:to-orange-800/20">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-orange-400/30 group-hover:to-orange-600/30 transition-colors animate-pulse">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-orange-700">Upcoming Activities</h3>
                <p className="text-muted-foreground group-hover:text-orange-600/80">Discover exciting events and competitions coming soon</p>
              </div>
            </Link>
            
            <Link to="/previous" className="group animate-fade-in" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)} style={{animationDelay: '0.4s'}}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300 text-center group-hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-400/30 group-hover:to-blue-600/30 transition-colors animate-pulse" style={{animationDelay: '1s'}}>
                  <History className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-blue-700">Previous Activities</h3>
                <p className="text-muted-foreground group-hover:text-blue-600/80">Browse through our successful past events and achievements</p>
              </div>
            </Link>
            
            <Link to="/winners" className="group animate-fade-in" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)} style={{animationDelay: '0.6s'}}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300 text-center group-hover:scale-105 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100 dark:hover:from-yellow-900/20 dark:hover:to-yellow-800/20">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-yellow-400/30 group-hover:to-yellow-600/30 transition-colors animate-pulse" style={{animationDelay: '2s'}}>
                  <Trophy className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-yellow-700">Hall of Fame</h3>
                <p className="text-muted-foreground group-hover:text-yellow-600/80">Honor roll of all our winners and achievers</p>
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
