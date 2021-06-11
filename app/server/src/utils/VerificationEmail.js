const nodeMailer = require("nodemailer");

exports.VerificationEmail = async (email, secretToken) => {
  //development and production
  const transporter = nodeMailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });

  //define the email options
  const option = {
    from: "tomazovsenjak7@gmail.com",
    to: email,
    subject: "Verification email",
    text: `Hi there ${email} here is your secret token: ${secretToken} copy it and enter it on the verify page of our application`,
  };

  //cretea a transport and send email
  await transporter
    .sendMail(option)
    .then(() => console.log("EMAIL FUCKING SENT", email, secretToken));
};
