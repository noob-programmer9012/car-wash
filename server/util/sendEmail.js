import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "node:path";
import Handlebars from "handlebars";

export default async function sendEmail(options) {
  const customHandlebars = Handlebars.create();

  const transporter = nodemailer.createTransport({
    sevice: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
      handlebars: customHandlebars,
      helpers: {
        // Add any custom helpers here if needed
      },
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    template: options.template,
    context: options.context,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) console.log(err);
    // else {
    //   console.log("Email sent successfully");
    // }
  });
}
