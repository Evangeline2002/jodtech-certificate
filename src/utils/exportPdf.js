import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const showError = (message) => {
  const event = new CustomEvent('cert-error', { detail: message });
  document.dispatchEvent(event);
};

const FONTS_LINK = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cinzel:wght@500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap';

const injectFonts = (doc) => new Promise((resolve) => {
  const link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.href = FONTS_LINK;
  link.onload = async () => {
    try {
      await doc.fonts.ready;
      setTimeout(resolve, 200);
    } catch {
      setTimeout(resolve, 500);
    }
  };
  link.onerror = () => resolve();
  doc.head.appendChild(link);
});

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
          await injectFonts(clonedDoc);
          await waitForImages(clonedDoc);
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
