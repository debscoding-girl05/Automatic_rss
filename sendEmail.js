const nodemailer = require("nodemailer");

/**
 * Send an email with the synthesized content
 * @param {string} filePath - Path to the text file
 * @param {Array} articles - Original articles with their URLs
 */
const sendEmail = async (filePath, articles) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const links = articles
    .map((article) => `<a href="${article.url}">${article.title}</a>`)
    .join("<br>");

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "recipient@example.com", // Replace with the recipient's email
    subject: "Daily Synthesized Articles",
    html: `<p>Here are the articles:</p>${links}`,
    attachments: [{ path: filePath }],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
