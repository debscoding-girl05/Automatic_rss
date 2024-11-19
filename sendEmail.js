const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Send email with summary and detailed report
 * @param {string} filePath - Path to the PDF file
 * @param {string} summary - Synthesized summary for the email body
 * @param {Array} articles - List of articles for links
 * @param {string} recipients - Comma-separated email addresses
 */
const sendEmail = async (filePath, summary, articles, recipients) => {
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
    to: recipients,
    subject: "Daily Articles Summary and Report",
    html: `<p>${summary}</p><p>Here are the articles:</p>${links}`,
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
