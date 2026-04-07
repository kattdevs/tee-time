const router = require('express').Router();
const { COURSES, createBooking, getBookings, cancelBooking } = require('../data/store');
const { validateDate, validateEmail, normaliseDate } = require('../middleware/validate');

// POST /api/bookings
router.post('/', (req, res) => {
  const { courseId, time, name, email, players } = req.body;
  const date = normaliseDate(req.body.date);

  if (!courseId || !date || !time || !name || !email) {
    return res.status(400).json({ error: 'Required: courseId, date, time, name, email' });
  }
  if (!COURSES[courseId]) return res.status(404).json({ error: `Course not found: ${courseId}` });
  if (!validateDate(date, res)) return;
  if (!validateEmail(email, res)) return;

  const numPlayers = parseInt(players, 10) || 1;
  if (numPlayers < 1 || numPlayers > 4) {
    return res.status(400).json({ error: 'players must be between 1 and 4.' });
  }

  const booking = createBooking({ courseId: course, date, time, name, email, players: numPlayers });
  if (!booking) {
    return res.status(409).json({
      error: `Tee time ${time} on ${date} at ${COURSES[courseId].name} is already booked.`
    });
  }
  res.status(201).json({ message: 'Tee time booked!', booking });
});

// GET /api/bookings/:date/:resource
router.get('/:date/:resource', (req, res) => {
  const date = normaliseDate(req.params.date);
  const { resource } = req.params;
  res.json({ date, course: resource, bookings: getBookings(date, resource) });
});

// DELETE /api/bookings/:id
router.delete('/:id', (req, res) => {
  const deleted = cancelBooking(req.params.id);
  if (!deleted) return res.status(404).json({ error: `Booking ${req.params.id} not found.` });
  res.json({ message: 'Booking cancelled.', id: req.params.id });
});

module.exports = router;