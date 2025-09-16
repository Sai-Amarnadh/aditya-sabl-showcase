import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Calendar, History, Trophy, Image, Settings, X, Info, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Home', icon: GraduationCap },
    { to: '/upcoming', label: 'Upcoming Activities', icon: Calendar },
    { to: '/previous', label: 'Previous Activities', icon: History },
    { to: '/winners', label: 'Winners', icon: Trophy },
    { to: '/gallery', label: 'Gallery', icon: Image },
    { to: '/about', label: 'About', icon: Info },
    { to: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <>
      {/* Animated Background */}
      <div className="animated-background"></div>
      <div className="floating-particles">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <nav className={`navbar-clean sticky top-0 z-50 transition-all duration-300 navbar-slide-down ${
        isScrolled ? 'shadow-elevated' : 'shadow-header'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 flex-shrink-0 animate-slide-in-left">
              <img src="/aditya-removebg-preview(1).png" alt="Aditya Logo" className="h-10 w-10 object-contain" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold">
                  <span className="navbar-title">ADITYA</span>{' '}
                  <span className="text-gradient-navy">UNIVERSITY</span>
                </h1>
                <p className="text-sm text-muted-foreground">Department of Computer Science and Engineering SABL Activities</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold">
                  <span className="navbar-title">ADITYA</span>{' '}
                  <span className="text-gradient-navy">UNIVERSITY</span>
                </h1>
              </div>
            </div>
            
            <div className="hidden lg:flex space-x-6 items-center animate-slide-in-right">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `navbar-link flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isActive ? 'active' : ''
                    }`
                  }
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile hamburger menu */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="navbar-link p-2 transition-all duration-300 hover:bg-gray-100 rounded-lg hover:scale-110"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 mobile-menu-enter">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `navbar-link flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-gray-50 ${
                      isActive ? 'active bg-gray-50' : ''
                    }`
                  }
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;