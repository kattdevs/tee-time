import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCourse } from '../store/bookingSlice';

export default function CourseCard({ course, compact = false, selected = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    e.stopPropagation();
    dispatch(setCourse(course.id));
    if (!compact) navigate('/book');
  };

  // Determine the badge text — always show something
  const getBadge = () => {
    if (course.par) return `Par ${course.par}`;
    if (course.holes) return `${course.holes} Holes`;
    return 'Practice Facility';
  };

  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      background: selected ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.05)',
      border: selected ? '2px solid #C9A84C' : '1px solid rgba(201,168,76,0.25)',
      boxShadow: selected
        ? '0 0 0 1px rgba(201,168,76,0.15), 0 8px 24px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.15)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',         // equal height in grid
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = selected
        ? '0 0 0 1px rgba(201,168,76,0.15), 0 8px 24px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.15)';
    }}
    >
      {/* Image — only on full (non-compact) cards */}
      {!compact && (
        <div style={{ height: '180px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
          <img
            src={course.image || ''}
            alt={course.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.src = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80';
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,59,30,0.85) 0%, transparent 60%)' }} />
          <span style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'rgba(201,168,76,0.92)', color: '#0D3B1E',
            padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '700',
          }}>
            {getBadge()}
          </span>
        </div>
      )}

      {/* Card body */}
      <div style={{
        padding: compact ? '16px' : '18px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,                // stretch to fill equal height
        gap: '6px',
      }}>

        {/* Course name */}
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: compact ? '14px' : '17px',
          fontWeight: '700',
          lineHeight: 1.3,
          margin: 0,
        }}>
          {course.name}
        </h3>

        {/* Description — full cards only */}
        {!compact && (
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}>
            {course.description || ''}
          </p>
        )}

        {/* Badge — compact cards show this inline */}
        <p style={{
          color: '#C9A84C',
          fontSize: '12px',
          fontWeight: '600',
          margin: 0,
          marginTop: compact ? 'auto' : '4px',   // pushes to bottom on compact
          paddingTop: '4px',
        }}>
          {getBadge()}
        </p>

        {/* Button — always at bottom, always same height */}
        <button
          onClick={handleSelect}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            background: selected
              ? 'linear-gradient(135deg, #C9A84C, #E8C87A)'
              : '#1A5C34',
            color: selected ? '#0D3B1E' : 'white',
            border: '1px solid rgba(201,168,76,0.3)',
            fontWeight: '700',
            fontSize: '13px',
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
          {selected ? '✓ Selected' : 'Select Course'}
        </button>
      </div>
    </div>
  );
}