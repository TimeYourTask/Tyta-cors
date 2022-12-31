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
    `Hi ${name ? `${name}` : ''}, welcome to Time Your Tasks!`
  );
};

const resetPasswordEmail = (email, link) => {
  sendEmail(
    email,
    'Password Reset',
    `Please use the following link to reset your password: ${link}`
  );
};

const userAddedToProjectEmail = (email, name, project) => {
  sendEmail(
    email,
    'You have been added to a project!',
    `Hi ${
      name ? `${name}` : ''
    }, you have been added to the project ${project}.`
  );
};

const userAddedToTeamEmail = (user, team) => {
  sendEmail(
    user.email,
    'You have been added to a team!',
    `Hi${user.firstName && ` ${user.firstName}`}${
      user.lastName && ` ${user.lastName}`
    }, you have been added to the team ${team}.`
  );
};

const userRemovedFromProjectEmail = (email, name, project) => {
  sendEmail(
    email,
    'You have been removed from a project!',
    `Hi ${
      name ? `${name}` : ''
    }, you have been removed from the project ${project}.`
  );
};

const userRemovedFromTeamEmail = (email, name, team) => {
  sendEmail(
    email,
    'You have been removed from a team!',
    `Hi ${name ? `${name}` : ''}, you have been removed from the team ${team}.`
  );
};

module.exports = {
  welcomeEmail,
  resetPasswordEmail,
  userAddedToProjectEmail,
  userAddedToTeamEmail,
  userRemovedFromProjectEmail,
  userRemovedFromTeamEmail,
};
