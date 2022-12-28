// create a nodemailer transport config and function to send emails

const mails = require('nodemailer');

const transporter = mails.createTransport({
  host: 'smtp-mail.outlook.com', // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: `Time Your Tasks <${process.env.EMAIL}>`,
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

const welcomeEmail = (email, name) => {
  sendEmail(
    email,
    'Welcome to Time Your Tasks!',
    `Hi ${name}, welcome to Time Your Tasks!`
  );
};

const resetPasswordEmail = (email, link) => {
  sendEmail(
    email,
    'Password Reset',
    `Please use the following link to reset your password: ${link}`
  );
};

module.exports = {
  welcomeEmail,
  resetPasswordEmail,
};
