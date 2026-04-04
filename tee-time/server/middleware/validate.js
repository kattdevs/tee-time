//Returns today's date string as YYYY-MM-DD
const today = () => new Date().toISOString().split('T')[0];

//Date must be YYYY-MM-DD and not in the past.
function validateDate(date,res) {
    if (!date || !/^\d{4}-\d{2}$/.test(date)) {
        res.status(400).json({error: 'date must be in YYY-MM-DD format'});
        return false;
    }
    if (date < today()) {
        res.status(400).json({error:'Cannot book tee times in the past'});
        return false;
    }
    return true;
}

//Email must look like an email.
function validateEmail(email, res) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({error:'A valid email address is required'});
        return false;
    }
    return true;
}

module.exports = {validateDate, validateEmail};