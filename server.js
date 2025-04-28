const express = require('express');
const sendBulkEmails = require('./emailClient');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Configure CORS with specific options
// CORS options
const corsOptions = {
    origin: ['http://localhost:5173', 'https://bulk-email-sender-frontend.vercel.app', 'https://bulkemail.pizeonfly.com'],
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200 // <-- Important for some browsers
};

app.use(express.json());
// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight requests
// app.options('*', cors(corsOptions));



app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// API to send bulk emails
app.post('/send-emails', async (req, res) => {
    const { emails, subject, message } = req.body;

    if (!emails || !subject || !message) {
        return res.status(400).json({ error: "Emails, subject, and message are required" });
    }

    try {
        await sendBulkEmails(emails, subject, message);
        res.json({ success: true, message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ error: "Failed to send emails" });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));