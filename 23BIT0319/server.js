const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Sample event data
const events = [
    { id: 1, name: 'Marathon', time: '2023-10-01T08:00:00Z', venue: 'City Park', points: 100 },
    { id: 2, name: 'Coding Competition', time: '2023-10-05T10:00:00Z', venue: 'Tech Hub', points: 150 },
    { id: 3, name: 'Art Exhibition', time: '2023-10-10T09:00:00Z', venue: 'Art Gallery', points: 80 },
];

// Endpoint to get event details
app.get('/events', (req, res) => {
    res.json(events);
});

// Endpoint to calculate score based on event participation
app.post('/calculate-score', (req, res) => {
    const { participatedEventIds } = req.body;
    
    if (!Array.isArray(participatedEventIds)) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of event IDs.' });
    }

    const totalScore = participatedEventIds.reduce((acc, eventId) => {
        const event = events.find(e => e.id === eventId);
        return event ? acc + event.points : acc;
    }, 0);

    res.json({ totalScore });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
