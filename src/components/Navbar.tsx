import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Calendar, History, Trophy, Image, Settings, X, Info } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav className="navbar-modern sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img src="/aditya-removebg-preview (1).png" alt="Aditya Logo" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">
  <span className="navbar-title">ADITYA</span>{' '}
  <span className="text-gradient-primary">UNIVERSITY</span></h1>
              <p className="text-sm text-muted-foreground">Department of Computer Science and Engineering SABL Activites</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold">
                <span className="navbar-title">ADITYA</span>{' '}
                <span className="text-gradient-primary">UNIVERSITY</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-4 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'text-teal-600 active-nav-link animate-bounce-once'
                      : 'text-muted-foreground hover:text-teal-600'
                  }`
                }
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
              className="text-muted-foreground hover:text-teal-600 p-2 transition-colors duration-300 hover:bg-teal-50 rounded-xl"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : (
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-teal-50 to-mint-50 border-t border-teal-200">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center space-x-2 px-4 py-3 text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-teal-600 active-nav-link animate-bounce-once'
                      : 'text-muted-foreground hover:text-teal-600'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
