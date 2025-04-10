
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, filename = 'report.pdf'): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#0f172a', // Same as slate-900
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Get page dimensions
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    
    // Calculate image dimensions to fit A4 page with margins
    const imgWidth = pageWidth - 20; // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 10; // Starting position (10mm from top)
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    
    // Add page numbers if the report spans multiple pages
    const totalPages = Math.ceil(imgHeight / (pageHeight - 20));
    
    if (totalPages > 1) {
      // For multi-page reports, we need to handle pagination
      let remainingHeight = imgHeight;
      
      for (let i = 1; i < totalPages; i++) {
        position = -pageHeight * i + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        
        // Add page numbers
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text(`Page ${i + 1} of ${totalPages}`, pageWidth - 25, pageHeight - 10);
        
        remainingHeight -= (pageHeight - 20);
      }
      
      // Add page number to first page
      pdf.setPage(1);
      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text(`Page 1 of ${totalPages}`, pageWidth - 25, pageHeight - 10);
    }
    
    // Download the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
