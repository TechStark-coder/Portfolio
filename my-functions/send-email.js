const nodemailer = require('nodemailer');

const handler = async (event) => {
  try {
    // Parse the request body
    const { name, email, message } = JSON.parse(event.body);

    // Configure the transporter with your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configure the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'recipient-email@example.com', // Replace with the recipient's email address
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', info }),
    };
  } catch (error) {
    // Return an error response
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
