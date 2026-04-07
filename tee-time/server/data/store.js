const { v4: uuidv4 } = require('uuid');

// ── In-memory booking store ──────────────────────────────────────────────
let bookings = [];

// ── All 4 golf courses ───────────────────────────────────────────────────
const COURSES = {
  'royal-cape': {
    name: 'Royal Cape Golf Club',
    description: "South Africa's oldest golf club — a true championship test.",
    slotMinutes: 300,
    openHour: 6, openMinute: 0,
    closeHour: 15, closeMinute: 0,
    image: '/images/royal-cape.jpg',
    holes: 18,
    par: 72,
  },
  'steenberg': {
    name: 'Steenberg Golf Club',
    description: 'Nestled beneath the Constantiaberg — a signature mountain course.',
    slotMinutes: 300,
    openHour: 7, openMinute: 0,
    closeHour: 14, closeMinute: 0,
    image: '/images/steenberg.jpg',
    holes: 18,
    par: 71,
  },
  'pearl-valley': {
    name: 'Pearl Valley Golf & Spa',
    description: 'A Jack Nicklaus Signature course in the Paarl wine valley.',
    slotMinutes: 150,
    openHour: 6, openMinute: 30,
    closeHour: 17, closeMinute: 0,
    image: '/images/pearl-valley.jpg',
    holes: 9,
    par: 36,
  },
  'driving-range': {
    name: 'The Practice Academy',
    description: 'State-of-the-art bays with TrackMan launch monitors.',
    slotMinutes: 60,
    openHour: 6, openMinute: 0,
    closeHour: 20, closeMinute: 0,
    image: '/images/driving-range.jpg',
    holes: null,
    par: null,
  },
};

// Generate all tee time slots for a course
function generateSlots(courseId) {
  const course = COURSES[courseId];
  if (!course) return [];
  const slots = [];
  let current = course.openHour * 60 + (course.openMinute || 0);
  const close = course.closeHour * 60 + (course.closeMinute || 0);
  while (current <= close) {
    const hh = String(Math.floor(current / 60)).padStart(2, '0');
    const mm = String(current % 60).padStart(2, '0');
    slots.push(`${hh}:${mm}`);
    current += course.slotMinutes;
  }
  return slots;
}

// Return only slots not already booked
function getAvailableSlots(courseId, date) {
  const all = generateSlots(courseId);
  const booked = bookings
    .filter(b => b.courseId === courseId && b.date === date)
    .map(b => b.time);
  return all.filter(s => !booked.includes(s));
}

// Create a new booking — returns null on conflict
function createBooking({ courseId, date, time, name, email, players }) {
  const conflict = bookings.find(
    b => b.courseId === courseId && b.date === date && b.time === time
  );
  if (conflict) return null;
  const booking = {
    id: uuidv4(),
    courseId,
    courseName: COURSES[courseId]?.name || courseId,
    date,
    time,
    name,
    email,
    players: players || 1,
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  return booking;
}

// Get all bookings for a date + course
function getBookings(date, courseId) {
  return bookings.filter(b => b.date === date && b.courseId === courseId);
}

// Cancel a booking by id
function cancelBooking(id) {
  const before = bookings.length;
  bookings = bookings.filter(b => b.id !== id);
  return bookings.length < before;
}

module.exports = { COURSES, getAvailableSlots, createBooking, getBookings, cancelBooking };