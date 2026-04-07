const router = require('express').Router();
const { COURSES, getAvailableSlots } = require('../data/store');
const { validateDate, normaliseDate } = require('../middleware/validate');

// GET /api/slots?course=royal-cape&date=2026-05-10
router.get('/', (req, res) => {
  const { course } = req.query;
  const date = normaliseDate(req.query.date); // fix slashes to dashes

  if (!course) return res.status(400).json({ error: 'course query param is required.' });
  if (!COURSES[course]) return res.status(404).json({ error: `Course '${course}' not found.` });
  if (!validateDate(date, res)) return;

  const available = getAvailableSlots(course, date);
  res.json({
    course,
    courseName: COURSES[course].name,
    date,
    available,
    total: available.length,
  });
});

// GET /api/slots/courses — return all 4 courses for the UI
router.get('/courses', (req, res) => {
  const list = Object.entries(COURSES).map(([id, c]) => ({
    id,
    name: c.name,
    description: c.description,
    holes: c.holes,
    par: c.par,
    image: c.image,
  }));
  res.json(list);
});

module.exports = router;