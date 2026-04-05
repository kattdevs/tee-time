import {Link} from 'react-router-dom';
import {ChevronDown} from 'lucide-react';

export default function Hero() {
    return (
        <section style={{
            minHeight: '100vh', position: 'relative', display: 'flex',
            alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
        {/*Background image with dark overlay*/}
        <div style={{
            position: 'absolute', inset:0,
            backgroundImage: 'url(/images/hero-golf.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,59,30,0.7) 0%,rgba(13,59,30,0.7) 60%, rgba(13,59,30,0.9) 100% '}} />

        {/*Content*/}
        <div style={{position: 'relative', textAlign:'center', padding:'0 24px', maxWidth:'800px'}}>
        <p style={{color:'#C9AB4C', letterSpacing: '4px', fontSize: '13px', fontWeight:'600', marginBottom:'20px', textTransform:'uppercase'}}>
        Premium Golf Experiences
        </p>
        <h1 style={{fontFamily:'Playfair Display, serif', fontSize:'clamp(3rem, 8vw, 6rem)', fontWeight:'900', color:'white', lineHeight:1.1, marginBottom:'24px'}}>
        Your Perfect
        <span style={{display:'block', color:'#C9A84C'}}>Tee Time</span>
        Awaits
        </h1>
        <p style={{color:'rgba(255,255,255,0.8)', fontSize:'18px', lineHeight:1.7, marginBottom:'40px', maxWidth:'520px', margin:'0 auto 40px'}}>
        Book tee times at four of South Africa's most prestigious golf courses. Seemless, instant, elegant.
        </p>
        <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
        <Link to='/book' style={{
            background:'linear-gradient(135deg, #C9A84C, #E8C87A)',
            color: '#0D3B1E', padding:'16px 40px', borderRadius:'999px',
            fontWeight: '700', fontSize:'16px', textDecoration:'none',
            boxShadow:'0 8px 32px rgba(201,168,76,0.35)', letterSpacing:'0.5px',
        }}>
        Book a Tee Time 
        </Link>
        <Link to='/my-bookings' style={{
            background: 'rgba(255,255,255,0.1)', color:'white',
            padding: '16px 40px', borderRadius:'999px', fontWeight:'600',
            fontSize: '16px', textDecoration:'none', border:'1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(8px)',
        }}>
        My Bookings
        </Link>
     </div>
 </div>

 {/*Scroll indicator*/}
 <div style={{position:'absolute', bottom:'40px', left:'50%', transform:'transalteX(-50%)', animation:'bounce 2s infinite'}}>
 <ChevronDown size={32} color='rgba(201,168,76,0.8)' />
 </div>
 </section>
    );
}