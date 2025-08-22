import { NavLink } from 'react-router-dom';
import { GraduationCap, Calendar, History, Trophy, Image } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: GraduationCap },
    { to: '/upcoming', label: 'Upcoming Activities', icon: Calendar },
    { to: '/previous', label: 'Previous Activities', icon: History },
    { to: '/winners', label: 'Winners', icon: Trophy },
    { to: '/gallery', label: 'Gallery', icon: Image },
  ];

  return (
    <nav className="bg-background border-b shadow-header sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">Aditya University</h1>
              <p className="text-sm text-muted-foreground">CSE Department SABL Activities</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-md font-bold text-primary">Aditya University</h1>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Simplified mobile menu for now */}
          <div className="lg:hidden">
            <div className="flex space-x-1">
              {navItems.slice(0, 3).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `p-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`
                  }
                  title={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;