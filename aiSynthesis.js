const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();


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
      (article) => `
      Title: ${article.title}
      URL: ${article.url}
      Summary: ${article.summary}
      -------------------------------------------
    `
    )
    .join("");

  const prompt = `
    Hello, here is a collection of recent articles with summaries and links. 
    Please synthesize the following into a detailed and engaging summary for readers:
    
    ${combinedContent}

    - Please ensure the summary is clear and structured.
    - Provide detailed insights based on the summaries provided.
    - Organize the content logically, and maintain the flow of information.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error during synthesis:", error.message);
    throw error;
  }
};

module.exports = { synthesizeArticlesWithGemini };
