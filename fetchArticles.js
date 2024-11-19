const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

/**
 * Fetch articles from Notion database
 * @returns {Promise<Array>} Array of articles with title, URL, and summary
 */
const fetchArticlesFromNotion = async () => {
  try {
    // Query the Notion database
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    // Map through the response and format the articles
    return response.results.map((page) => {
      const titleProperty = page.properties.Name?.title || [];
      const urlProperty = page.properties.URL?.url;
      const summaryProperty = page.properties.Summary?.rich_text || [];

      return {
        title: titleProperty[0]?.text?.content || "Untitled", // Extract title
        url: urlProperty || "No URL", // Extract URL
        summary: summaryProperty[0]?.text?.content || "No Summary", // Extract summary
      };
    });
  } catch (error) {
    // Log detailed error information
    console.error("Error fetching articles from Notion:");
    console.error(error.message);
    console.error("Details:", error);

    // Re-throw the error for upstream handling
    throw error;
  }
};

module.exports = { fetchArticlesFromNotion };
