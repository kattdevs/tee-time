import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCourses, fetchSlots,
  selectCourses, selectCourse, selectDate,
  setCourse, setDate
} from '../store/bookingSlice';
import { selectModal } from '../store/uiSlice';
import CourseCard from '../components/CourseCard';
import SlotGrid from '../components/SlotGrid';
import BookingModal from '../components/BookingModal';

export default function Book() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const course = useSelector(selectCourse);
  const date = useSelector(selectDate);
  const modalOpen = useSelector(selectModal);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => { dispatch(fetchCourses()); }, [dispatch]);

  useEffect(() => {
    if (course && date) {
      // Always send YYYY-MM-DD to the API
      const cleanDate = date.replace(/\//g, '-');
      dispatch(fetchSlots({ course, date: cleanDate }));
    }
  }, [course, date, dispatch]);

  const handleDateChange = (e) => {
    // Convert any slashes to dashes before storing
    const clean = e.target.value.replace(/\//g, '-');
    dispatch(setDate(clean));
  };

  return (
    <div style={{ background: '#0D3B1E', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 80px' }}>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: '700',
          marginBottom: '6px',
        }}>
          Book a Tee Time
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '32px', fontSize: '15px' }}>
          Select your course, choose a date, and pick your slot.
        </p>

        {/* ── CHOOSE A COURSE ── */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
          <p style={{ color: '#C9A84C', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Choose a Course
          </p>

          {/* 1 col on mobile, 2 on tablet, 4 on desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '14px',
          }}>
            {courses.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', gridColumn: '1/-1' }}>
                Loading courses...
              </p>
            )}
            {courses.map(c => (
              <CourseCard key={c.id} course={c} compact selected={course === c.id} />
            ))}
          </div>
        </div>

        {/* ── SELECT A DATE ── */}
        {course && (
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <p style={{ color: '#C9A84C', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Select a Date
            </p>
            <input
              type='date'
              min={today}
              value={date}
              onChange={handleDateChange}
              style={{
                padding: '12px 18px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'white',
                fontSize: '15px',
                outline: 'none',
                cursor: 'pointer',
                colorScheme: 'dark',
                width: '100%',
                maxWidth: '260px',
                boxSizing: 'border-box',
              }}
            />
            {date && (
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '8px' }}>
                Showing tee times for: <span style={{ color: '#C9A84C' }}>{date}</span>
              </p>
            )}
          </div>
        )}

        {/* ── PICK A TEE TIME ── */}
        {course && date && (
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <p style={{ color: '#C9A84C', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Pick a Tee Time
            </p>
            <SlotGrid />
          </div>
        )}

        {/* Prompts */}
        {!course && (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', padding: '32px 0', fontSize: '14px' }}>
            Select a course above to get started.
          </p>
        )}
        {course && !date && (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', padding: '32px 0', fontSize: '14px' }}>
            Choose a date to see available tee times.
          </p>
        )}
      </div>

      {modalOpen && <BookingModal />}

      <style>{`
        @media (max-width: 600px) {
          input[type='date'] { max-width: 100% !important; font-size: 14px !important; }
        }
      `}</style>
    </div>
  );
}