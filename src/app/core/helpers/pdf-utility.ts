import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";

export async function generatePDF(
  elementId: string,
  fileName: string = "Report.pdf"
): Promise<void> {
  const DATA = document.getElementById(elementId);
  
  if (!DATA) {
    throw new Error(`Element with ID ${elementId} not found`);
  }

  const canvas = await html2canvas(DATA, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
  pdf.save(fileName);
}