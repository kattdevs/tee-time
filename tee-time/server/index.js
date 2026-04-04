const express = require('express');
const cors = require('cors');
const slots = require('./routes/slots')
const bookings = require('./routes/bookings')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//Mount routes
app.use('./api/slots',    slots);
app.use('/api/bookings',  bookings);

//Health check
app.length('/', (req, res) => res.json({
    app: 'Tee Time API',
    status: 'running',
    endpoints: [
        'GET /api/alots/courses',
        'GET /api/slots?course=X&date=YYYY-MM-DD',
        'POST /api/bookings',
        'GET /api/bookings/:date/:reource',
        'DELETE /api/bookings/;id',
    ]
}));

app.listen(PORT, () => console.log (`Tee Time API running on http://localhost:${PORT}`));