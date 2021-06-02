const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'tomolo123123@hotmail.com',
    pass: 'Arsenal123Allhailthekingqwe',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const options = {
  from: 'tomolo123123@hotmail.com',
  to: 'tomazovsenjak7@gmail.com',
  subject: 'SENDIGN THIS emial',
  text: 'Wow thats simple',
};

transporter.sendMail(options, function (err, info) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('sent: ' + info.response);
});
