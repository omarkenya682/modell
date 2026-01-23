import React, { useState } from 'react';
import { Menu, X, Phone, Home, Map, MessageSquare, Users, PhoneCall, BookOpen } from 'lucide-react';
import { ViewState, SiteSettings } from '../types';
import Button from './Button';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  settings?: SiteSettings;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, settings }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoUrl = settings?.logoUrl;
  const contactPhone = settings?.contactPhone || "+254 794 132 637";
  
  const navLinks = [
    { label: 'Home', view: ViewState.HOME, icon: Home },
    { label: 'Our Projects', view: ViewState.PROJECTS, icon: Map },
    { label: 'Blog', view: ViewState.BLOG, icon: BookOpen },
    { label: 'Testimonials', view: ViewState.TESTIMONIALS, icon: MessageSquare },
    { label: 'About Us', view: ViewState.ABOUT, icon: Users },
    { label: 'Contact', view: ViewState.CONTACT, icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-green-900 text-white py-2 text-xs md:text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="hidden sm:inline">Mon - Sat: 8:00 AM - 5:00 PM</span>
            <span className="sm:hidden">Mon - Sat: 8am - 5pm</span>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <span className="text-green-200 text-xs uppercase tracking-wider font-semibold">COME WE GROW TOGETHER</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section - Magnified & With Text */}
          <div className="cursor-pointer flex items-center gap-3 md:gap-4" onClick={() => setView(ViewState.HOME)}>
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt="Model Land Investment" 
                className="h-20 md:h-32 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="flex flex-col justify-center -space-y-1">
              <h1 className="text-2xl md:text-5xl font-black text-green-800 leading-none tracking-tighter">
                MODEL LAND
              </h1>
              <h2 className="text-sm md:text-xl font-bold text-[#FF2C2C] uppercase tracking-[0.2em] md:tracking-[0.3em] leading-tight ml-0.5">
                INVESTMENT
              </h2>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setView(link.view)}
                className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors group ${
                  currentView === link.view ? 'text-green-700 border-b-4 border-green-700 pb-1' : 'text-gray-700 hover:text-green-700'
                }`}
              >
                <link.icon size={18} className={`transition-transform duration-300 group-hover:-translate-y-1 ${currentView === link.view ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600'}`} />
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
             <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="no-underline">
                <Button variant="primary" size="lg" className="gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <Phone size={20} />
                    <span>{contactPhone}</span>
                </Button>
             </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-800 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setView(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 text-left font-bold text-lg py-3 border-b border-gray-100 ${
                  currentView === link.view ? 'text-green-700' : 'text-gray-800'
                }`}
              >
                <link.icon size={20} className={currentView === link.view ? 'text-green-600' : 'text-gray-400'} />
                {link.label}
              </button>
            ))}
            <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="no-underline block">
                <Button variant="primary" fullWidth size="lg" className="justify-center gap-2 mt-4">
                <Phone size={20} /> Call Now
                </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;