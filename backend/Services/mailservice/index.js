const nodemailer = require("nodemailer");

const sendMail = async (to, text, subject) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hashirk966@gmail.com",
      pass: "pbesrkkeibyhgauy",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: '"Freelance" <hashirk966@gmail.com>',
    to,
    subject,
    text,
  });
};

module.exports = { sendMail };
