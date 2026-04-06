import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../public/logo.jpeg';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/book', label: 'Book a Tee Time' },
    { to: '/my-bookings', label: 'My Bookings' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(13,59,30,0.97)' : 'rgba(13,59,30,0.45)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px', gap: '24px',
      }}>

        {/* Logo */}
        <Link to='/' style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}>
          <img src={logo} alt='Tee Time' style={{ width: '42px', height: '42px', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.5)', objectFit: 'cover' }} />
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: '700', color: '#C9A84C', letterSpacing: '2px', whiteSpace: 'nowrap' }}>
            TEE TIME
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center', flex: 1, justifyContent: 'center' }} className="nav-links">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} style={{
              color: loc.pathname === l.to ? '#C9A84C' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none', fontSize: '14px', fontWeight: '500',
              borderBottom: loc.pathname === l.to ? '2px solid #C9A84C' : '2px solid transparent',
              paddingBottom: '2px', transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Book Now CTA — desktop */}
        <Link to='/book' className="desktop-cta" style={{
          background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
          color: '#0D3B1E', padding: '10px 28px', borderRadius: '999px',
          fontWeight: '700', fontSize: '14px', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(201,168,76,0.35)', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          Book Now
        </Link>

        {/* Hamburger — mobile */}
        <button onClick={() => setOpen(!open)} className="mobile-btn"
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: 'rgba(13,59,30,0.98)', padding: '16px 24px 24px', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{
              display: 'block', color: loc.pathname === l.to ? '#C9A84C' : 'rgba(255,255,255,0.9)',
              padding: '14px 0', textDecoration: 'none', fontSize: '16px', fontWeight: '500',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              {l.label}
            </Link>
          ))}
          <Link to='/book' onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: '20px',
            background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
            color: '#0D3B1E', padding: '14px', borderRadius: '12px',
            fontWeight: '700', fontSize: '15px', textDecoration: 'none', textAlign: 'center',
          }}>
            Book Now
          </Link>
        </div>
      )}

      <style>{`
        .nav-links { display: flex !important; }
        .desktop-cta { display: block !important; }
        .mobile-btn { display: none !important; }
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
                