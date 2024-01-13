const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

app.post('/send-email', (req, res) => {
    console.log('Received a POST request to /send-email');

    const { name, email, message } = req.body;

    const mailOptions = {
        from: emailUser,
        to: 'apeerzade785@example.com',
        subject: 'Someone wants to contact you AsIf',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email: ' + error.toString());
        }
        res.send('Email sent successfully');
    });
    
});
