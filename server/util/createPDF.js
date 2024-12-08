import PDFDocument from "pdfkit";

export const createPDF = async ({ ...data }, res) => {
  let total = 0;
  let y = 80;
  const doc = new PDFDocument({ size: "A6" });
  // data._doc.items.map((i) => console.log(i.serviceId));
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename='new.pdf'");
  doc.pipe(res);

  doc
    .fontSize(18)
    .text(`Carwash Services`, 70, 20)
    .underline(0, 20, 300, 27, { color: "#4d1ab3" });
  doc.fontSize(14).text("Order Details", 10, 60);
  doc.moveDown(1);
  data._doc.items.map((i, index) => {
    if (index !== data._doc.items.length - 1) {
      doc
        .fontSize(12)
        .text(`${i.serviceName} --> ${i.serviceId.plan.price}`, 10, y);
      total += i.serviceId.plan.price;
      y += 20;
    } else {
      doc
        .fontSize(12)
        .text(`${i.serviceName} --> ${i.serviceId.plan.price}`, 10, y)
        .underline(0, y - 12, 150, 27);
      total += i.serviceId.plan.price;
      y += 20;
    }
  });
  const tax = (total * 18) / 100;
  doc.fontSize(12).text(`Sub Total`, 10, y);
  doc.fontSize(12).text(`: ${total}`, 75, y);
  doc.fontSize(12).text(`Gst @18 %`, 10, y + 20);
  doc
    .fontSize(12)
    .text(`: ${tax}`, 75, y + 20)
    .underline(0, y + 8, 150, 27);
  doc.fontSize(14).text(`Total`, 10, y + 40);
  doc.fontSize(14).text(`: ${Math.round(total + tax)}`, 75, y + 40);
  return doc.end();
};
