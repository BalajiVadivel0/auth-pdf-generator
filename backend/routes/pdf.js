const express = require("express");
const PDFDocument = require("pdfkit");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Generate PDF
router.post("/generate-pdf", authMiddleware, (req, res) => {
  const { content } = req.body;

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=output.pdf");

  doc.pipe(res);
  doc.fontSize(20).text("User Content:", { underline: true });
  doc.moveDown();
  doc.fontSize(14).text(content || "No content provided");
  doc.end();
});

module.exports = router;
