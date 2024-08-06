import nodemailer from "nodemailer";

export default async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    sevice: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) console.log(err);
    else {
      console.log("Email sent successfully");
    }
  });
}
