const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
require("dotenv").config();

async function generatePDF(content) {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Load a standard font (Helvetica)
    const helveticaFont = await pdfDoc.embedFont(PDFDocument.PDFName.Helvetica);

    const { width, height } = page.getSize();
    const fontSize = 12;

    // Draw text on the page
    page.drawText(content, {
      x: 50,
      y: height - 50, // Start from top
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Save PDF to a file
    const pdfBytes = await pdfDoc.save();
    const filePath = "./output.pdf";
    fs.writeFileSync(filePath, pdfBytes);
    return filePath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

module.exports = { generatePDF };
