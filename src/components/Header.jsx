import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/perda-poupanca', label: 'Investimento', emoji: '📉' },
  { path: '/perda-cartao', label: 'Cartão', emoji: '💳' },
  { path: '/gastos-invisiveis', label: 'Gastos', emoji: '🚬' },
  { path: '/perda-inflacao', label: 'Inflação', emoji: '📊' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ 
      background: 'rgba(10, 10, 10, 0.8)', 
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline" onClick={() => setIsOpen(false)}>
          <span className="text-2xl" role="img" aria-hidden="true">💸</span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            QuantoPerdi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="px-3 py-2 rounded-lg text-sm font-medium no-underline transition-all duration-200"
              style={{
                color: location.pathname === link.path ? '#ef4444' : '#9ca3af',
                background: location.pathname === link.path ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
              }}
            >
              <span className="mr-1">{link.emoji}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-gray-300 rounded transition-transform duration-200"
            style={isOpen ? { transform: 'rotate(45deg) translate(3px, 3px)' } : {}} />
          <span className="block w-5 h-0.5 bg-gray-300 rounded transition-opacity duration-200"
            style={isOpen ? { opacity: 0 } : {}} />
          <span className="block w-5 h-0.5 bg-gray-300 rounded transition-transform duration-200"
            style={isOpen ? { transform: 'rotate(-45deg) translate(3px, -3px)' } : {}} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 animate-fade-in-up" style={{ background: 'rgba(10, 10, 10, 0.95)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium no-underline transition-colors"
              style={{
                color: location.pathname === link.path ? '#ef4444' : '#9ca3af',
                background: location.pathname === link.path ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
              }}
            >
              <span className="mr-2">{link.emoji}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
