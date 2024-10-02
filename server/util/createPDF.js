import PDFDocument from "pdfkit";
import fs from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

export const createPDF = async ({ ...data }, req, res, next) => {
  const doc = new PDFDocument({ size: "A9" });
  const { order } = data;
  console.log(order);
  const pathh = path.join(import.meta.dirname, "..", "assets", "receipts");
  if (!fs.existsSync(pathh)) await mkdir(pathh);
  const filePath = path.join(pathh, `new3.pdf`);
  doc.pipe(fs.createWriteStream(filePath));
  doc.text(`hi`, 2, 2);
  return doc.end();
};
