const { fetchArticlesFromNotion } = require("./fetchArticles");
const { synthesizeArticlesWithGemini } = require("./aiSynthesis");
const { generatePDF } = require("./generatePDF");
const { sendEmail } = require("./sendEmail");
require("dotenv").config();


(async () => {
  try {
    // Debugging the environment variables and API key
    console.log(
      "DEBUG: Checking NOTION_API_KEY from environment:",
      process.env.NOTION_API_KEY
    );

    // Fetch articles from Notion
    console.log("DEBUG: Fetching articles from Notion...");
    const articles = await fetchArticlesFromNotion();
    console.log("DEBUG: Articles fetched from Notion:", articles);

    // Debugging the content to be sent to Gemini for synthesis
    console.log("DEBUG: Sending articles to Gemini for synthesis...");
    const { summary, report } = await synthesizeArticlesWithGemini(articles);
    console.log("DEBUG: Synthesized summary:", summary);
    console.log("DEBUG: Generated report:", report);

    // Generate PDF from report
    console.log("DEBUG: Generating PDF from the report...");
    const pdfPath = await generatePDF(report);
    console.log("DEBUG: PDF generated at path:", pdfPath);

    // Define recipients' emails
    const recipients = "dtakouessa@gmail.com,bostel57@gmail.com";
    console.log("DEBUG: Sending email to recipients:", recipients);

    // Send the email with the synthesized summary and PDF
    await sendEmail(pdfPath, summary, articles, recipients);
    console.log("DEBUG: Email sent successfully!");
  } catch (error) {
    console.error("Error in main process:", error.message);
    // Log detailed error to help with debugging
    console.error("Full error details:", error);
  }
})();
