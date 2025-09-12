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
    <nav className="bg-white/98 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img src="/aditya-removebg-preview (1).png" alt="Aditya Logo" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">
                <span className="text-orange-600">ADITYA</span>{' '}
                <span className="text-blue-600">UNIVERSITY</span>
              </h1>
              <p className="text-xs text-gray-600">CSE Department - SABL Activities</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold">
                <span className="text-orange-600">ADITYA</span>{' '}
                <span className="text-blue-600">UNIVERSITY</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `navbar-item flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-600 active'
                      : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            </div>
          </div>

          {/* Mobile hamburger menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 transition-colors duration-200 hover:bg-gray-50 rounded-md"
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
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `navbar-item flex items-center space-x-2 px-4 py-3 rounded-md text-base font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 active'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
