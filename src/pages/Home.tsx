import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import WinnerCard from '@/components/WinnerCard';
import WinnerDetailsModal from '@/components/WinnerDetailsModal';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Calendar, History, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Celebration effects components
const CelebrationSparkle = ({ delay, color }: { delay: number; color: string }) => (
  <div
    className="absolute w-2 h-2 rounded-full animate-sparkle opacity-0"
    style={{
      backgroundColor: color,
      animationDelay: `${delay}s`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
  />
);

const FloatingEmoji = ({ emoji, delay }: { emoji: string; delay: number }) => (
  <div
    className="absolute text-2xl animate-float-simple opacity-70"
    style={{
      animationDelay: `${delay}s`,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    }}
  >
    {emoji}
  </div>
);
const Home = () => {
  const [thisWeekWinners, setThisWeekWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const { dataChanged } = useData();

  const handleWinnerClick = (winner: Winner) => {
    setSelectedWinner(winner);
    setIsModalOpen(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 5000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWinner(null);
    setShowCelebration(false);
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
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
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
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400/30 rounded-full animate-bounce-custom"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-300/25 rounded-full animate-pulse-custom"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">ADITYA</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">UNIVERSITY</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
            Department of Computer Science and Engineering
            <br />
            SABL Activites
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
          </p>
          <div>
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
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        {/* Celebration Background Effects */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <CelebrationSparkle 
                key={i} 
                delay={i * 0.1} 
                color={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][i % 6]}
              />
            ))}
            {['🎉', '🏆', '⭐', '🎊', '✨'].map((emoji, i) => (
              <FloatingEmoji key={i} emoji={emoji} delay={i * 0.5} />
            ))}
          </div>
        )}
        
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-3 md:mb-4">
              🏆 Top Performers of the Week
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Celebrating our outstanding students who have excelled in recent SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-6 md:mb-8 px-2 md:px-0 relative">
            {/* Celebration Background Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-70"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-float opacity-70"></div>
            <div className="absolute -bottom-4 left-1/2 w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-60"></div>
            
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg animate-pulse border-2 border-transparent">
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
                  <div key={winner.id} className="celebration-winner-card rounded-xl relative overflow-hidden group">
                    {/* Animated border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-xl animate-color-cycle opacity-75"></div>
                    <div className="absolute inset-1 bg-white rounded-lg"></div>
                    
                    {/* Celebration sparkles */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-float"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-wiggle"></div>
                    
                    <div className="relative z-10">
                    <WinnerCard 
                      winner={winner} 
                      featured={true} 
                      onClick={() => handleWinnerClick(winner)}
                    />
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <div className="relative">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse-soft"></div>
                </div>
                <p className="text-muted-foreground">No winners selected for this week yet.</p>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
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
        <div className="container mx-auto relative z-10">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-xl md:rounded-2xl p-6 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">SABL Impact</h2>
              <p className="text-base md:text-lg opacity-90 px-4">Measuring our success through student engagement and achievements</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                <div className="text-4xl font-bold mb-2 text-yellow-300">50+</div>
                <div className="text-sm opacity-80">Events Conducted</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                <div className="text-4xl font-bold mb-2 text-cyan-300">500+</div>
                <div className="text-sm opacity-80">Student Participants</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                <div className="text-4xl font-bold mb-2 text-green-300">100+</div>
                <div className="text-sm opacity-80">Winners Celebrated</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                <div className="text-4xl font-bold mb-2 text-pink-300">25+</div>
                <div className="text-sm opacity-80">Industry Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-4">
              Quick Navigation
            </h2>
            <p className="text-muted-foreground text-base md:text-lg px-4">
              Explore different sections of our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-2 md:px-0">
            <Link to="/upcoming" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:scale-105 hover:-translate-y-2 border border-blue-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Upcoming Activities</h3>
                <p className="text-muted-foreground">Discover exciting events and competitions coming soon</p>
              </div>
            </Link>
            
            <Link to="/previous" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:scale-105 hover:-translate-y-2 border border-green-100">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-600 group-hover:to-emerald-700 transition-all">
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Previous Activities</h3>
                <p className="text-muted-foreground">Browse through our successful past events and achievements</p>
              </div>
            </Link>
            
            <Link to="/winners" className="group" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:scale-105 hover:-translate-y-2 border border-yellow-100">
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