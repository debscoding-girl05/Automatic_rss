const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Send articles to Gemini for synthesis
 * @param {Array} articles - List of articles with title, URL, and summary
 * @returns {Promise<string>} Synthesized text
 */
const synthesizeArticlesWithGemini = async (articles) => {
  const combinedContent = articles
    .map(
      (article) =>
        `Title: ${article.title}\nURL: ${article.url}\nSummary: ${article.summary}\n\n`
    )
    .join("");

  const prompt = `Synthesize the following articles into a concise summary:\n\n${combinedContent}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error during synthesis:", error.message);
    throw error;
  }
};

module.exports = { synthesizeArticlesWithGemini };
