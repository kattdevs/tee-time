
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, fetchSlots, selectCourses, selectCourse, selectDate, setCourse, setDate } from '../store/bookingSlice';
import { selectModal } from '../store/uiSlice';
import CourseCard from '../components/CourseCard';
import SlotGrid from '../components/SlotGrid';
import BookingModal from '../components/BookingModal';


export default function Book() {
  const dispatch   = useDispatch();
  const courses    = useSelector(selectCourses);
  const course     = useSelector(selectCourse);
  const date       = useSelector(selectDate);
  const modalOpen  = useSelector(selectModal);
  const today      = new Date().toISOString().split('T')[0];


  useEffect(() => { dispatch(fetchCourses()); }, []);
 
  // Auto-fetch slots when both course and date are selected
  useEffect(() => {
    if (course && date) dispatch(fetchSlots({ course, date }));
  }, [course, date]);
 
  const sectionStyle = { background: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '32px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' };
  const labelStyle   = { color: '#C9A84C', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', display: 'block' };
 
  return (
    <div style={{ background: '#0D3B1E', minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px' }}>
          Book a Tee Time
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>
          Select your course, choose a date, and pick your slot.
        </p>
 
        {/* Step 1 — Course */}
        <div style={sectionStyle}>
          <span style={labelStyle}>Step 1 — Choose a Course</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {courses.map(c => <CourseCard key={c.id} course={c} compact />)}
          </div>
        </div>
 
        {/* Step 2 — Date */}
        {course && (
          <div style={sectionStyle}>
            <span style={labelStyle}>Step 2 — Select a Date</span>
            <input type='date' min={today} value={date} onChange={e => dispatch(setDate(e.target.value))}
              style={{ padding: '14px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '16px', outline: 'none', cursor: 'pointer' }}
            />
          </div>
        )}
 
        {/* Step 3 — Tee time slots */}
        {course && date && (
          <div style={sectionStyle}>
            <span style={labelStyle}>Step 3 — Pick a Tee Time</span>
            <SlotGrid />
          </div>
        )}
      </div>

      
      {modalOpen && <BookingModal />}
    </div>
  );
}

