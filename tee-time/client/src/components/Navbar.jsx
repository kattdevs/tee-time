import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../public/logo.jpeg';

export default function Nvabar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen]         = useState(false);
    const loc = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { to: '/', lable: 'Home'},
        {to: '/book', label: 'Book a Tee Time'},
        {to: '/my-bookings', label: 'My Bookings'},
    ];
    return (
        <nav 
        style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            backgtound: scrolled
            ? 'rgba(13,59,30,0.96)'
            :'rgba(13,59,30,0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: scrolled? '1px solid rgba(201,168,78,0.3)' : '1px solid trannsparent',
            transition: 'all 0.3s ease',
            padding: '0 24px',
        }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', JustifyContent: 'space-between', height: '72px'}}>

                {/*Logo*/}
                <Link to='/' style={{display: 'flex', alignItems: 'center', gap:'12px', textDecoration: 'none'}}>
                <img src={logo} alt='Tee Time' style={{width: '44px', height:'44px', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.5)'}} />
                <span style={{fontFamily:'Playfair Display, serif', fontSize: '22px', fontWeight: '700', color: '#C9A84C', letterSpacing: '1px'}}>
                    TEE TIME
                </span>
                </Link>

                {/*Desktop links*/}
                <div style={{display: 'flex', gap:'32px'}} className='hidden md:flex'>
                    {navLinks.map(l => (
                        <Link key={l.to} to={l.to} style={{
                            color: loc.pathname === l.to ? '#C9A84C' : 'rgba(255,255,255,0.85)',
                            textDecoration: 'none', fontSize:'14px', fontWeight: '500',
                            borderBottom: loc.pathname === l.to ? '2px solid #C9AB4C' : '2px solid transparent',
                            paddingBottom: '2px', transition: 'all 0.2s',
                        }}>
                            {l.label}
                            </Link>
                    ))}
                </div>

                {/*Book now CTA*/}
                <Link to='/book' style={{
                    background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
                    color: '#0D3B1E', padding:'10px 24px', borderRadius: '999px',
                    fontWeight: '700', fontSize: '14px', textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                }} className='hidden md:block'>
                    Book Now
                </Link>

                {/*Hamburger (mobile*/}
                <button onClick={() => setOpen(!open)} style={{background:'none', border:'none', color:'white', cursor:'pointer'}} className='md:hidden'>
                {open ? <X size={24} /> : <Menu size={24} />}
                </button>
                </div>

                {/*Mobile Menu*/}
                {open && (
                    <div style={{ background: 'rgba(13,59,30,0.98)', padding:'16px 24px',
                        borderTop: '1px solid rgba(201,168,76,0.2)'}}>
                        {navLinks.map(l => (
                            <Link key={l.to} to={l.to} onClick={() => setOpen=(false)} style={{display: 'block', color: 'white', padding: '12px 0', textDecoration: 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
                                    {l.label}
                            </Link>
                        ))}
                    </div>
      )}
     </nav>
 );
}

                