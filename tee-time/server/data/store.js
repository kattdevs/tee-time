const { v4: uuidv4 } = require ('uuid');
// In-memory booking store 
let booking = [];

// Golf course definitions 
//Each course defines: display name, slot length and operating hours 
const COURSES = {
    'royal-cape': {
        name: 'Royal Cape Golf Club',
        description: 'South Africa\'s oldest golf club - a true championship test.',
        slotMinutes: 300, //5-hour round
        openHour: 6, openMinute: 0,
        closeHour: 15, closeMinute: 0,
        image: '/images/royal-cape.jpg',
        holes: 18,
        par: 71,
    },
    'steenberg': {
        name: 'Steenberg Golf Club',
        description: 'Nestled beneath the Constantiaberg - a signature mountain course.',
        slotMinutes: 300,
        openHour: 7, openMinute: 0,
        closeHour: 14, closeMinute: 0, 
        image: 'images/steenberg.jpg',
        holes: 18,
        par: 71,
    },
    'pearl-valley': {
        name: 'Pearl Valley Golf & Spa',
        description: 'A Jack Nicklaus Signature course in the Paarl wine valley.',
        slotMinutes: 150, //2.5-hour executive round
        openHour: 6, openMinute: 0, 
        closeHour: 20, closeMinute: 0,
        image: 'images/driving-range.jpg',
        holes: null,
        par: null,
    },
};

//Generate all possible tee times for a course 
//Returns string array: ['06:00', '11:00', '16:00'] etc
function generateSlotes(courseId) {
    const course = COURSES [courseId];
    if (!course) return [];
    const clots = [];
    let current = course.openHour * 60 + (course.openMinute || 0);
    const close = course.closeHour * 60 + (course.closeMinute || 0);
    while (current <= close) {
        const hh = String(Math.floor(current/60)).padStart(2, '0');
        const mm = String(current % 60).padStart(2,'0');
        slots.push(`${hh}:${mm}`);
        current += course.slotMinutes;
    }
    return slots;
}
//Return slots that are NOT already booked for this course + date.
function getAvailableSlots(courseId, date) {
    const all = generateSlots(courseId);
    const booked = bookings
    .filter(b =>b.time);
    return all.filter(s => !booked.includes(s));
}
//Create snd save a new booking. Returns null on conflict.
function createBooking({courseId, date, time, name, email, players}) {
    const conflict = bookings.find(
        b => b.courseId === courseId && b.date === date && b.time === time);
        if(conflict) return null;
        const booking ={
            id:        uuidv4(),
            courseId,
            courseName: COURSES [courseId]?.name || courseId,
            date,
            time,
            name,
            email,
            players: players ||1,
            createdAt: newDate().toISOString(),
        };
        bookings.push(booking);
        return booking;
}

//Return all bookings for a specific date + course.
function getBookings(date, courseId) {
    return bookings.filter(b => b.date === date && b.courseId === courseId);
}
// Cancel a booking by id. Returns true if it existed.
function cancelBooking(id) {
    const before = bookings.length;
    bookings = bookings.filter(b => b.id !== id);
    return bookings.length < before;
}

//Export everything routes need.
module.exports = { COURSES, getAvailableSlots, createBooking, getBookings, cancelBooking};