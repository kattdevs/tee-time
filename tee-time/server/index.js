const express = require('express');
const cors = require('cors');
const slots = require('./routes/slots')
const bookings = require('./routes/bookings')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin:[
        'http://localhost:5173',
        'http://localhost:3000',
        /\.vercel\.app$/, 
    ],
    credentials: true,
}));

app.use(express.json());
app.use('/api/slots',    slots);
app.use('/api/bookings',  bookings);

//Health check
app.get('/', (req, res) => res.json({
    app: 'Tee Time API',
    status: 'running',
    endpoints: [
        'GET /api/slots/courses',
        'GET /api/slots?course=X&date=YYYY-MM-DD',
        'POST /api/bookings',
        'GET /api/bookings/:date/:resource',
        'DELETE /api/bookings/:id',
    ]
}));

app.listen(PORT, () => console.log (`Tee Time API running on http://localhost:${PORT}`));