import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const showError = (message) => {
  const event = new CustomEvent('cert-error', { detail: message });
  document.dispatchEvent(event);
};

const settle = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForImages = (doc) => {
  const images = doc.querySelectorAll('img');
  return Promise.all(Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  }));
};

export const exportPdf = async (elementId, filename) => {
  const element = document.getElementById(elementId);
  if (!element) {
    showError('Certificate element not found. Please try again.');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: async (clonedDoc) => {
        try {
          await Promise.all([
            waitForImages(clonedDoc),
            settle(200),
          ]);
        } catch (e) {
          console.warn('onclone error (non-fatal):', e);
        }
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    showError('PDF generation failed: ' + (error.message || error));
  }
};
