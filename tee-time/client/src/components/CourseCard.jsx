import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCourse } from '../store/bookingSlice';

export default function CourseCard({ course, compact = false, selected = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = () => {
    dispatch(setCourse(course.id));
    if (!compact) navigate('/book');
  };

  return (
    <div
      onClick={compact ? handleSelect : undefined}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: selected ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: selected ? '2px solid #C9A84C' : '1px solid rgba(201,168,76,0.3)',
        boxShadow: selected ? '0 0 0 2px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = selected
          ? '0 0 0 2px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.2)'
          : '0 4px 20px rgba(0,0,0,0.15)';
      }}
    >
      {/* Course image — only on full cards */}
      {!compact && (
        <div style={{ height: '180px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
          <img
            src={course.image || '/images/placeholder.jpg'}
            alt={course.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80'; }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(13,59,30,0.9), transparent)' }} />
          {course.holes && (
            <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(201,168,76,0.92)', color: '#0D3B1E', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>
              {course.holes} Holes
            </span>
          )}
        </div>
      )}

      {/* Card body — flex column so button always sits at bottom */}
      <div style={{ padding: compact ? '16px' : '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>

        {/* Course name */}
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: compact ? '15px' : '18px',
          fontWeight: '700',
          lineHeight: 1.3,
          margin: 0,
        }}>
          {course.name}
        </h3>

        {/* Description — only on full cards */}
        {!compact && (
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.6, margin: 0, flex: 1 }}>
            {course.description || '\u00A0'}
          </p>
        )}

        {/* Par badge — always show, show dash if not available */}
        <p style={{ color: '#C9A84C', fontSize: '13px', fontWeight: '600', margin: 0 }}>
          {course.par ? `Par ${course.par}` : course.holes ? `${course.holes} Holes` : 'Practice Facility'}
        </p>

        {/* Select button — always at the bottom, always same style */}
        <button
          onClick={handleSelect}
          style={{
            marginTop: '8px',
            width: '100%',
            padding: '11px',
            borderRadius: '10px',
            background: selected ? 'linear-gradient(135deg, #C9A84C, #E8C87A)' : '#1A5C34',
            color: selected ? '#0D3B1E' : 'white',
            border: '1px solid rgba(201,168,76,0.4)',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            letterSpacing: '0.3px',
          }}
          onMouseEnter={e => {
            if (!selected) {
              e.target.style.background = 'linear-gradient(135deg, #C9A84C, #E8C87A)';
              e.target.style.color = '#0D3B1E';
            }
          }}
          onMouseLeave={e => {
            if (!selected) {
              e.target.style.background = '#1A5C34';
              e.target.style.color = 'white';
            }
          }}
        >
          {selected ? 'Selected' : 'Select Course'}
        </button>
      </div>
    </div>
  );
}