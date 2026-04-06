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
  const today = new Date().toISOString().split('T')[0]; // always YYYY-MM-DD

  useEffect(() => { dispatch(fetchCourses()); }, [dispatch]);

  useEffect(() => {
    if (course && date) {
      dispatch(fetchSlots({ course, date }));
    }
  }, [course, date, dispatch]);

  // Fix date format: browser may return YYYY/MM/DD — convert to YYYY-MM-DD
  const handleDateChange = (e) => {
    const raw = e.target.value; // e.g. "2026-04-07" or "2026/04/07"
    const formatted = raw.replace(/\//g, '-'); // replace any slashes with dashes
    dispatch(setDate(formatted));
  };

  const sectionStyle = {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '20px',
  };

  const labelStyle = {
    color: '#C9A84C',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '20px',
    display: 'block',
  };

  return (
    <div style={{ background: '#0D3B1E', minHeight: '100vh', paddingTop: '90px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '8px',
        }}>
          Book a Tee Time
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '36px', fontSize: '15px' }}>
          Select your course, choose a date, and pick your slot.
        </p>

        {/* Choose a Course */}
        <div style={sectionStyle}>
          <span style={labelStyle}>Choose a Course</span>

          {/* Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {courses.map(c => (
              <CourseCard
                key={c.id}
                course={c}
                compact
                selected={course === c.id}
              />
            ))}
          </div>
        </div>

        {/* Select a Date */}
        {course && (
          <div style={sectionStyle}>
            <span style={labelStyle}>Select a Date</span>
            <input
              type='date'
              min={today}
              value={date}
              onChange={handleDateChange}
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '300px',
                boxSizing: 'border-box',
                colorScheme: 'dark',
              }}
            />
            {date && (
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '8px' }}>
                Selected: {date}
              </p>
            )}
          </div>
        )}

        {/* Tee Time Slots */}
        {course && date && (
          <div style={sectionStyle}>
            <span style={labelStyle}>Pick a Tee Time</span>
            <SlotGrid />
          </div>
        )}

        {/* Helper prompts */}
        {!course && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '15px' }}>
            Select a course above to get started.
          </div>
        )}
        {course && !date && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '15px' }}>
            Choose a date to see available tee times.
          </div>
        )}
      </div>

      {modalOpen && <BookingModal />}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 480px) {
          input[type='date'] { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
}