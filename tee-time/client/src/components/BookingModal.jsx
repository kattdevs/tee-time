import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { closeModal, showToast } from '../store/uiSlice';
import {
  createBooking,
  fetchSlots,
  selectCourse,
  selectCourses,
  selectDate,
  selectLoading,
  selectSlots,
  setSlot,
  selectSlot,
} from '../store/bookingSlice';

export default function BookingModal() {
  const dispatch = useDispatch();

  // Redux state
  const slot = useSelector(selectSlot);
  const slots = useSelector(selectSlots);
  const course = useSelector(selectCourse);
  const date = useSelector(selectDate);
  const loading = useSelector(selectLoading);
  const courses = useSelector(selectCourses);

  const courseObj = courses.find(c => c.id === course);
  const courseName = courseObj ? courseObj.name : course;

  // Local form state
  const [form, setForm] = useState({ name: '', email: '', players: '1' });
  const [errors, setErrors] = useState({});

  // Fetch slots when course/date changes
  useEffect(() => {
    if (course && date) {
      dispatch(fetchSlots({ course, date }));
    }
  }, [course, date]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!slot) {
      dispatch(showToast({ message: 'Please select a tee time slot', type: 'error' }));
      return;
    }

    const cleanDate = date ? date.replace(/\//g, '-') : '';

    const payload = {
      courseId: course,
      date: cleanDate,
      time: slot,
      name: form.name.trim(),
      email: form.email.trim(),
      players: parseInt(form.players, 10),
    };

    console.log('Booking payload:', payload);

    const result = await dispatch(createBooking(payload));

    if (createBooking.fulfilled.match(result)) {
      dispatch(closeModal());
      dispatch(showToast({ message: `Tee time ${slot} booked successfully!`, type: 'success' }));
      dispatch(fetchSlots({ course, date: cleanDate }));
    } else {
      dispatch(showToast({
        message: result.payload || 'Booking failed. Please try again.',
        type: 'error',
      }));
    }
  };

  const inputStyle = field => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.08)',
    border: errors[field] ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.15)',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  });

  return (
    <div
      onClick={() => dispatch(closeModal())}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, padding: '16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(13,59,30,0.97)',
          borderRadius: '24px',
          padding: '32px',
          width: '100%',
          maxWidth: '460px',
          border: '1px solid rgba(201,168,76,0.4)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '22px', fontWeight: '700', margin: 0 }}>
              Confirm Booking
            </h2>
            <p style={{ color: '#C9A84C', fontSize: '14px', marginTop: '6px' }}>
              {slot || '--:--'} &nbsp;&bull;&nbsp; {date} &nbsp;&bull;&nbsp; {courseName}
            </p>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white', flexShrink: 0
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              value={form.name}
              onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
              placeholder='e.g. John Smith'
              style={inputStyle('name')}
            />
            {errors.name && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              value={form.email}
              onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
              placeholder='john@example.com'
              type='email'
              style={inputStyle('email')}
            />
            {errors.email && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
          </div>

          {/* Number of Players */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Number of Players
            </label>
            <select
              value={form.players}
              onChange={e => setForm(p => ({ ...p, players: e.target.value }))}
              style={{ ...inputStyle('players'), cursor: 'pointer' }}
            >
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} Player{n>1?'s':''}</option>)}
            </select>
          </div>

          {/* Slot Selection */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Select Tee Time
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {slots.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>No slots available</p>
              ) : slots.map(s => (
                <button
                  key={s}
                  onClick={() => dispatch(setSlot(s))}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: slot === s ? '2px solid #C9A84C' : '1px solid rgba(255,255,255,0.2)',
                    background: slot === s ? '#0D3B1E' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !slot}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '15px',
            borderRadius: '12px',
            background: loading ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #C9A84C, #E8C87A)',
            color: '#0D3B1E',
            fontWeight: '700',
            fontSize: '16px',
            border: 'none',
            cursor: loading || !slot ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Booking...' : 'Confirm Tee Time'}
        </button>

        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', textAlign: 'center', marginTop: '12px' }}>
          Your tee time will be confirmed instantly.
        </p>
      </div>
    </div>
  );
}
 
