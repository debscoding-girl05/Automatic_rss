const { Client } = require("@notionhq/client");

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

    return response.results.map((page) => ({
      title: page.properties.Name.title[0]?.text?.content || "Untitled",
      url: page.properties.URL?.url || "No URL",
      summary:
        page.properties.Summary?.rich_text[0]?.text?.content || "No Summary",
    }));
  } catch (error) {
    console.error("Error fetching articles from Notion:", error.message);
    throw error;
  }
};

module.exports = { fetchArticlesFromNotion };
