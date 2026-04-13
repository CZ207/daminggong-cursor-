import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function TopNav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/architecture', label: '建筑群落' },
    { path: '/history', label: '历史长河' },
    { path: '/hanyuan', label: '数字含元殿' },
    { path: '/ai', label: 'AI+大明宫' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-sm text-white">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 border border-red-600 flex items-center justify-center text-red-600 font-bold text-sm">唐</div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest">AI+大明宫</span>
            <span className="text-[8px] md:text-[10px] tracking-widest opacity-70 uppercase">DIGITAL DAMING PALACE</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.label} to={link.path} className={cn("hover:text-red-500 transition-colors", location.pathname === link.path && "text-red-500")}>
              {link.label}
            </Link>
          ))}
          <Globe className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-red-500 transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-t border-white/10 flex flex-col py-4 px-6 space-y-4 shadow-2xl">
          {navLinks.map(link => (
            <Link 
              key={link.label} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn("text-lg tracking-widest hover:text-red-500 transition-colors", location.pathname === link.path && "text-red-500")}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
