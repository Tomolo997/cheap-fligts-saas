const nodeMailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const mailgun = require('mailgun-js');
const { async } = require('regenerator-runtime');

const sendConfirmationEmail = async (user) => {
  const token = await jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  const url = `https://costfriendlyflights.com/verification/${user.secretToken}/${user._id}`;

  const DOMAIN = 'mg.costfriendlyflights.com';
  const mg = mailgun({
    apiKey: '1f2226d72b5cdfa2eef834a9cb4bbfa8-24e2ac64-6e2d2326',
    domain: DOMAIN,
    host: 'api.eu.mailgun.net',
  });
  console.log(user.email);
  const data = {
    from: 'Your support <support@costfriendlyflights.com>',
    to: `${user.email}`,
    subject: 'Verification email',
    html: `<p>Click on this link to procees <a href="${url}"></a>${url}</p>`,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
    if (error) {
      console.log(error);
    }
  });
};

exports.sendConfirmationEmail = sendConfirmationEmail;
