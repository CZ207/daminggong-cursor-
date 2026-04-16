import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

function PalaceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 cursor-pointer transition-colors hover:text-red-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10.5L12 4l9 6.5" />
      <path d="M5 10.5V19.5" />
      <path d="M19 10.5V19.5" />
      <path d="M8 10.5V19.5" />
      <path d="M16 10.5V19.5" />
      <path d="M10.25 19.5V15h3.5v4.5" />
      <path d="M2.5 19.5h19" />
      <path d="M6.5 8.2h11" />
      <path d="M12 4V2.6" />
    </svg>
  );
}

export default function TopNav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/architecture', label: '含元殿' },
    { path: '/history', label: '历史长河' },
    { path: '/hanyuan', label: '数字含元殿' },
    { path: '/ai', label: 'AI+大明宫' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 px-6 py-4 text-white backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center border border-red-600 text-sm font-bold text-red-600">唐</div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-widest md:text-xl">AI+大明宫</span>
            <span className="text-[8px] uppercase tracking-widest opacity-70 md:text-[10px]">DIGITAL DAMING PALACE</span>
          </div>
        </Link>

        <div className="hidden items-center space-x-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={cn('transition-colors hover:text-red-500', location.pathname === link.path && 'text-red-500')}
            >
              {link.label}
            </Link>
          ))}
          <PalaceIcon />
        </div>

        <div className="flex items-center md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white transition-colors hover:text-red-500">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full flex flex-col space-y-4 border-t border-white/10 bg-black/95 px-6 py-4 shadow-2xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn('text-lg tracking-widest transition-colors hover:text-red-500', location.pathname === link.path && 'text-red-500')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
