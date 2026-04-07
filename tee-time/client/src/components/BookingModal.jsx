import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { closeModal, showToast, selectSlot } from '../store/uiSlice';
import {
  createBooking,
  fetchSlots,
  selectCourse,
  selectDate,
  selectLoading,
  selectCourses,
} from '../store/bookingSlice';

export default function BookingModal() {
  const dispatch = useDispatch();

  // Get everything from Redux
  const slot    = useSelector(selectSlot);       // the tee time string e.g. "07:00"
  const course  = useSelector(selectCourse);     // course id e.g. "royal-cape"
  const date    = useSelector(selectDate);       // date string e.g. "2026-04-08"
  const loading = useSelector(selectLoading);
  const courses = useSelector(selectCourses);

  // Find the full course name for display
  const courseObj = courses.find(c => c.id === course);
  const courseName = courseObj ? courseObj.name : course;

  const [form, setForm]     = useState({ name: '', email: '', players: '1' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Make sure date is YYYY-MM-DD (no slashes)
    const cleanDate = date ? date.replace(/\//g, '-') : '';

    // Log what we are sending so you can verify in console
    console.log('Booking payload:', {
      courseId: course,
      date: cleanDate,
      time: slot,
      name: form.name.trim(),
      email: form.email.trim(),
      players: parseInt(form.players, 10),
    });

    const result = await dispatch(createBooking({
      courseId: course,
      date:     cleanDate,
      time:     slot,
      name:     form.name.trim(),
      email:    form.email.trim(),
      players:  parseInt(form.players, 10),
    }));

    if (createBooking.fulfilled.match(result)) {
      dispatch(closeModal());
      dispatch(showToast({ message: `Tee time ${slot} booked successfully!`, type: 'success' }));
      // Refresh available slots so the booked one disappears
      dispatch(fetchSlots({ course, date: cleanDate }));
    } else {
      // Show the server error message as a toast
      dispatch(showToast({
        message: result.payload || 'Booking failed. Please try again.',
        type: 'error'
      }));
    }
  };

  const inputStyle = (field) => ({
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
    // Overlay — click outside to close
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
      {/* Modal panel */}
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
              {slot} &nbsp;&bull;&nbsp; {date} &nbsp;&bull;&nbsp; {courseName}
            </p>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', flexShrink: 0 }}
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
              onChange={e => {
                setForm(p => ({ ...p, name: e.target.value }));
                setErrors(p => ({ ...p, name: '' }));
              }}
              placeholder='e.g. John Smith'
              style={inputStyle('name')}
            />
            {errors.name && (
              <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              value={form.email}
              onChange={e => {
                setForm(p => ({ ...p, email: e.target.value }));
                setErrors(p => ({ ...p, email: '' }));
              }}
              placeholder='john@example.com'
              type='email'
              style={inputStyle('email')}
            />
            {errors.email && (
              <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>
            )}
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
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n} style={{ background: '#0D3B1E' }}>
                  {n} Player{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '15px',
            borderRadius: '12px',
            background: loading
              ? 'rgba(201,168,76,0.5)'
              : 'linear-gradient(135deg, #C9A84C, #E8C87A)',
            color: '#0D3B1E',
            fontWeight: '700',
            fontSize: '16px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.5px',
            transition: 'opacity 0.2s',
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

 
