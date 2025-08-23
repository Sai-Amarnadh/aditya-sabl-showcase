import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, History, Trophy, Award, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const navLinks = [
  { to: 'upcoming-activities', text: 'Upcoming Activities', icon: Calendar },
  { to: 'previous-activities', text: 'Previous Activities', icon: History },
  { to: 'winners', text: 'Winners', icon: Trophy },
  { to: 'weekly-winners', text: 'Weekly Winners', icon: Award },
];

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <motion.div
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg md:hidden"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Admin Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="p-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              <span className="mx-4 font-medium">{link.text}</span>
            </NavLink>
          ))}
        </nav>
      </motion.div>
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>}


      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span className="mx-4 font-medium">{link.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
