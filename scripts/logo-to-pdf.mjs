/**
 * PrimeSim logo.png → logo.pdf
 * Run: node scripts/logo-to-pdf.mjs
 */
import { PDFDocument } from "pdf-lib";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const logoPath = join(projectRoot, "public", "logo.png");
const outPath = join(projectRoot, "logo.pdf");

const logoBytes = readFileSync(logoPath);
const pdfDoc = await PDFDocument.create();
const logoImage = await pdfDoc.embedPng(logoBytes);

// Page size = logo size (png dimensions in points, 1px ≈ 0.75pt at 96dpi; pdf-lib uses points)
const w = logoImage.width;
const h = logoImage.height;
const page = pdfDoc.addPage([w, h]);
page.drawImage(logoImage, { x: 0, y: 0, width: w, height: h });

const pdfBytes = await pdfDoc.save();
writeFileSync(outPath, pdfBytes);
console.log("✅ logo.pdf created at:", outPath);
