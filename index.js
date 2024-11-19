require ('dotenv').config();
const {fetchArticlesFromNotion} = require('./fetchArticles');
const {synthesizeArticlesWithGemini } = require('./aiSynthesis');
const {createTextFile} = require('./createTxt');
const {sendEmail} = require('./sendEmail');

(async () => {
  try {
    console.log("Fetching articles from Notion...");
    const articles = await fetchArticlesFromNotion();

    if (articles.length === 0) {
      console.log("No articles to process.");
      return;
    }

    console.log("Synthesizing articles with Gemini...");
    const synthesis = await synthesizeArticlesWithGemini(articles);

    console.log("Creating text file...");
    const filePath = createTextFile(synthesis);

    console.log("Sending email...");
    await sendEmail(filePath, articles);

    console.log("Workflow completed successfully!");
  } catch (error) {
    console.error("Workflow failed:", error.message);
  }
})();