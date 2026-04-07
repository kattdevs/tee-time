// Returns today's date string as YYYY-MM-DD
const today = () => new Date().toISOString().split('T')[0];

// Normalise any date string to YYYY-MM-DD (accepts slashes or dashes)
function normaliseDate(raw) {
  if (!raw) return '';
  return raw.replace(/\//g, '-');
}

// Date must be parseable and not in the past.
function validateDate(date, res) {
  if (!date) {
    res.status(400).json({ error: 'date is required.' });
    return false;
  }
  const normalised = normaliseDate(date);
  // Accept YYYY-MM-DD only after normalising
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalised)) {
    res.status(400).json({ error: 'date must be in YYYY-MM-DD format.' });
    return false;
  }
  if (normalised < today()) {
    res.status(400).json({ error: 'Cannot book tee times in the past.' });
    return false;
  }
  return true;
}

// Email must look like an email.
function validateEmail(email, res) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return false;
  }
  return true;
}

// Export normaliseDate too so routes can use the fixed value
module.exports = { validateDate, validateEmail, normaliseDate };