import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../store/uiSlice';
import { selectSlots, selectLoading, selectError } from '../store/bookingSlice';

export default function SlotGrid() {
  const dispatch = useDispatch();
  const slots = useSelector(selectSlots);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#C9A84C' }}>
        <div style={{ fontSize: '28px', marginBottom: '12px' }}>⛳</div>
        <p style={{ fontSize: '15px', fontWeight: '500' }}>Loading tee times...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.3)' }}>
        <p style={{ color: '#EF4444', fontSize: '14px', fontWeight: '600' }}>
          Could not load tee times: {error}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '6px' }}>
          Make sure the server is running on port 4000.
        </p>
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div style={{
        padding: '32px',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📅</div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', fontWeight: '600' }}>
          No tee times available for this date.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '6px' }}>
          Try a different date or course.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p style={{
        color: '#C9A84C',
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        {slots.length} Tee {slots.length === 1 ? 'Time' : 'Times'} Available — click to book
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {slots.map(slot => (
          <button
            key={slot}
            onClick={() => dispatch(openModal(slot))}
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              background: '#1A5C34',
              color: 'white',
              border: '1px solid rgba(201,168,76,0.35)',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '80px',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(135deg, #C9A84C, #E8C87A)';
              e.target.style.color = '#0D3B1E';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(201,168,76,0.35)';
            }}
            onMouseLeave={e => {
              e.target.style.background = '#1A5C34';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}