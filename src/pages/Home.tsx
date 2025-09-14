import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import WinnerCard from '@/components/WinnerCard';
import WinnerDetailsModal from '@/components/WinnerDetailsModal';
import { getWinners, Winner } from '@/lib/data-service';
import { useData } from '@/contexts/DataContext';
import { Calendar, History, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Enhanced celebration effects
const CelebrationSparkle = ({ delay, color, size = 'small' }: { delay: number; color: string; size?: 'small' | 'large' }) => (
  <div
    className={`absolute rounded-full animate-winner-sparkle opacity-0 ${size === 'large' ? 'w-4 h-4' : 'w-2 h-2'}`}
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
    className="absolute text-3xl animate-bounce opacity-80 pointer-events-none"
    style={{
      animationDelay: `${delay}s`,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      animationDuration: '2s',
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
    setTimeout(() => setShowCelebration(false), 6000);
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
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden tech-bg-pattern">
        {/* Background Image with Tech Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-800/90 to-purple-700/85"></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Students collaborating" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        {/* Floating Tech Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-20 h-20 bg-blue-400/20 rounded-full animate-tech-glow"></div>
          <div className="absolute top-40 right-32 w-16 h-16 bg-indigo-400/30 rounded-full animate-celebration-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-purple-300/25 rounded-full animate-tech-glow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-tech-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">ADITYA</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">UNIVERSITY</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/95">
            Department of Computer Science and Engineering
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">SABL Activities</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/85 max-w-2xl mx-auto leading-relaxed">
            Fostering innovation, creativity, and excellence in computer science education through engaging activities and competitions.
          </p>
          <div className="animate-tech-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" asChild className="register-btn">
              <Link to="/upcoming">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Activities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* This Week's Winners Section */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Celebration Background Effects */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <CelebrationSparkle 
                key={i} 
                delay={i * 0.1} 
                color={['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'][i % 6]}
                size={i % 3 === 0 ? 'large' : 'small'}
              />
            ))}
            {['🎉', '🏆', '⭐', '🎊', '✨', '🚀', '💫'].map((emoji, i) => (
              <FloatingEmoji key={i} emoji={emoji} delay={i * 0.3} />
            ))}
          </div>
        )}
        
        <div className="container mx-auto relative z-20">
          <div className="text-center mb-12 animate-tech-slide-up">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-white animate-celebration-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              🏆 Top Performers of the Week
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Celebrating our outstanding students who have excelled in recent SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8 relative">
            {loading ? (
              // Enhanced loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full loading-shimmer"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2 loading-shimmer"></div>
                      <div className="h-3 bg-gray-200 rounded mb-1 loading-shimmer"></div>
                      <div className="h-3 bg-gray-200 rounded loading-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : thisWeekWinners.length > 0 ? (
              thisWeekWinners
                .sort((a, b) => (a.position || 1) - (b.position || 1))
                .map((winner, index) => (
                  <div 
                    key={winner.id} 
                    className="winner-card-enhanced animate-card-hover-lift animate-tech-slide-up relative"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Winner sparkles */}
                    <div className="winner-sparkle winner-sparkle-1 animate-winner-sparkle"></div>
                    <div className="winner-sparkle winner-sparkle-2 animate-winner-sparkle" style={{ animationDelay: '0.5s' }}></div>
                    <div className="winner-sparkle winner-sparkle-3 animate-winner-sparkle" style={{ animationDelay: '1s' }}></div>
                    <div className="winner-sparkle winner-sparkle-4 animate-winner-sparkle" style={{ animationDelay: '1.5s' }}></div>
                    
                    <WinnerCard 
                      winner={winner} 
                      featured={true} 
                      onClick={() => handleWinnerClick(winner)}
                    />
                  </div>
                ))
            ) : (
              <div className="col-span-3 text-center py-12 animate-tech-slide-up">
                <div className="relative inline-block">
                  <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-celebration-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-winner-sparkle"></div>
                </div>
                <p className="text-muted-foreground text-lg">No winners selected for this week yet.</p>
              </div>
            )}
          </div>
          
          <div className="text-center animate-tech-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button asChild className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-card-hover-lift">
              <Link to="/winners">
                View All Winners
                <Trophy className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto relative z-10">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl animate-tech-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">SABL Impact</h2>
              <p className="text-lg opacity-90">Measuring our success through student engagement and achievements</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 animate-card-hover-lift">
                <div className="text-4xl font-bold mb-2 text-yellow-300 animate-tech-glow">50+</div>
                <div className="text-sm opacity-80">Events Conducted</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 animate-card-hover-lift" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-bold mb-2 text-cyan-300 animate-celebration-pulse">500+</div>
                <div className="text-sm opacity-80">Student Participants</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 animate-card-hover-lift" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-bold mb-2 text-green-300 animate-tech-glow">100+</div>
                <div className="text-sm opacity-80">Winners Celebrated</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 animate-card-hover-lift" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl font-bold mb-2 text-pink-300 animate-celebration-pulse">25+</div>
                <div className="text-sm opacity-80">Industry Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 tech-bg-pattern">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 animate-tech-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Quick Navigation
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore different sections of our SABL activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/upcoming" className="group animate-tech-slide-up" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="activity-card bg-white rounded-2xl p-8 text-center border border-blue-100 hover:border-blue-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-tech-glow transition-all">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">Upcoming Activities</h3>
                <p className="text-muted-foreground">Discover exciting events and competitions coming soon</p>
              </div>
            </Link>
            
            <Link to="/previous" className="group animate-tech-slide-up" style={{ animationDelay: '0.2s' }} onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="activity-card bg-white rounded-2xl p-8 text-center border border-green-100 hover:border-green-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-celebration-pulse transition-all">
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Previous Activities</h3>
                <p className="text-muted-foreground">Browse through our successful past events and achievements</p>
              </div>
            </Link>
            
            <Link to="/winners" className="group animate-tech-slide-up" style={{ animationDelay: '0.4s' }} onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
              <div className="activity-card bg-white rounded-2xl p-8 text-center border border-yellow-100 hover:border-yellow-300">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-tech-glow transition-all">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">Hall of Fame</h3>
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