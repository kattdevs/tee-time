
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Calendar, Clock, Users } from 'lucide-react';
import { fetchCourses, fetchReservations, cancelBooking, setCourse, setDate, selectCourses, selectCourse, selectDate, selectReservations } from '../store/bookingSlice';
import { showToast } from '../store/uiSlice';
 
export default function MyBookings() {
  const dispatch      = useDispatch();
  const courses       = useSelector(selectCourses);
  const course        = useSelector(selectCourse);
  const date          = useSelector(selectDate);
  const reservations  = useSelector(selectReservations);
  const today         = new Date().toISOString().split('T')[0];
 
  useEffect(() => { dispatch(fetchCourses()); }, []);
  useEffect(() => { if (course && date) dispatch(fetchReservations({ date, course })); }, [course, date]);
 
  const handleCancel = async id => {
    const res = await dispatch(cancelBooking(id));
    if (cancelBooking.fulfilled.match(res)) dispatch(showToast({ message: 'Booking cancelled.', type: 'success' }));
  };
 
  return (
    <div style={{ background: '#0D3B1E', minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>
          My Bookings
        </h1>
 
        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <select value={course || ''} onChange={e => dispatch(setCourse(e.target.value))}
            style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '14px', cursor: 'pointer', flex: 1, minWidth: '200px' }}>
            <option value=''>Select a course</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type='date' min={today} value={date} onChange={e => dispatch(setDate(e.target.value))}
            style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '14px', flex: 1 }}
          />
        </div>
 
        {/* Reservation list */}
        {reservations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>No reservations found.</p>
          </div>
        ) : reservations.map(r => (
          <div key={r.id} className='gold-border' style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px 24px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: 'white', fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>{r.name}</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ color: '#C9A84C', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} />{r.time}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} />{r.date}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} />{r.players} player{r.players > 1 ? 's' : ''}</span>
              </div>
            </div>
            <button onClick={() => handleCancel(r.id)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#EF4444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
              <Trash2 size={14} /> Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}




