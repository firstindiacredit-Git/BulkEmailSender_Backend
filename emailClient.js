const nodemailer = require('nodemailer');
require('dotenv').config(); // For environment variables

const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this if using another service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send bulk emails
const sendBulkEmails = async (emails, subject, message) => {
    for (const email of emails) {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message
        });
    }
};

module.exports = sendBulkEmails;
