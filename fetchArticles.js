const { Client } = require("@notionhq/client");
require("dotenv").config();

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

/**
 * Fetch articles from Notion database
 * @returns {Promise<Array>} Array of articles with title, URL, and summary
 */
const fetchArticlesFromNotion = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    return response.results.map((page) => {
      const titleProperty = page.properties.Name?.title || [];
      const urlProperty = page.properties.URL?.url;
      const summaryProperty = page.properties.Summary?.rich_text || [];

      return {
        title: titleProperty[0]?.text?.content || "Untitled",
        url: urlProperty || "No URL",
        summary: summaryProperty[0]?.text?.content || "No Summary",
      };
    });
  } catch (error) {
    console.error("Error fetching articles from Notion:", error.message);
    throw error;
  }
};

module.exports = { fetchArticlesFromNotion };
