import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User, GraduationCap, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-navy border-b border-navy-light text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <div className="text-gold">
            <GraduationCap size={32} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight leading-none">
              GS <span className="text-white">NET</span>
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary tracking-widest mt-0.5">
              MOCK TEST SERIES
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gold transition-colors text-gold">All Tests</Link>
          
          {/* Dropdown placeholder */}
          <div className="flex items-center gap-1 hover:text-gold transition-colors cursor-pointer group relative">
            <span>UGC NET</span>
            <ChevronDown size={14} />
          </div>
          
          <Link to="/" className="hover:text-gold transition-colors">Paper 1</Link>
          <Link to="/" className="hover:text-gold transition-colors">Paper 2</Link>
          <Link to="/dashboard" className="hover:text-gold transition-colors text-white">Dashboard</Link>
          <Link to="/" className="hover:text-gold transition-colors">Blog</Link>
        </nav>

        {/* Right Actions (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-white hover:text-gold transition-colors" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button className="bg-gold/10 text-gold p-2 rounded-full hover:bg-gold/20 transition-colors" aria-label="User Profile">
            <User size={20} />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button 
          className="lg:hidden text-white hover:text-gold transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-light border-t border-navy px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
          <Link to="/" className="block text-gold font-medium" onClick={toggleMobileMenu}>All Tests</Link>
          <div className="block text-white font-medium">UGC NET</div>
          <Link to="/" className="block text-text-secondary pl-4" onClick={toggleMobileMenu}>Paper 1</Link>
          <Link to="/" className="block text-text-secondary pl-4" onClick={toggleMobileMenu}>Paper 2</Link>
          <Link to="/dashboard" className="block text-white font-medium" onClick={toggleMobileMenu}>Dashboard</Link>
          <Link to="/" className="block text-white font-medium" onClick={toggleMobileMenu}>Blog</Link>
          
          <div className="border-t border-navy pt-4 flex items-center gap-4">
            <button className="flex items-center gap-2 text-white hover:text-gold">
              <Bell size={20} /> Notifications
            </button>
            <button className="flex items-center gap-2 text-gold">
              <User size={20} /> Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
