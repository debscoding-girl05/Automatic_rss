const fs = require("fs");

/**
 * Create a text file with the synthesized content
 * @param {string} content - Synthesized content
 * @returns {string} Path to the created file
 */
const createTextFile = (content) => {
  const filePath = "synthesized_summary.txt";
  fs.writeFileSync(filePath, content);
  return filePath;
};

module.exports = { createTextFile };
