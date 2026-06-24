import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const showError = (msg) => {
  document.dispatchEvent(new CustomEvent('cert-error', { detail: msg }));
};

const waitForImages = (root) => {
  const imgs = Array.from(root.querySelectorAll('img'));
  return Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalHeight !== 0
        ? Promise.resolve()
        : new Promise((res) => { img.onload = res; img.onerror = res; })
    )
  );
};

export const exportPdf = async (elementId, filename) => {
  const el = document.getElementById(elementId);
  if (!el) { showError('Certificate element not found.'); return; }

  try {
    // 1. Wait for all web fonts to load
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // 2. Wait for all images inside the certificate
    await waitForImages(el);

    // 3. A small settle so the browser finishes any final paint
    await new Promise((r) => setTimeout(r, 250));

    // 4. Read the element's actual pixel dimensions (ignoring any CSS zoom/scale
    //    applied by the preview wrapper — we use scrollWidth/scrollHeight which
    //    reflect the element's own layout, not the visual transform).
    const W = el.scrollWidth || el.offsetWidth;
    const H = el.scrollHeight || el.offsetHeight;

    // 5. Capture with html2canvas
    //    Using inline styles everywhere in the component means html2canvas
    //    does NOT need to read the Tailwind stylesheet — no more garbling.
    const canvas = await html2canvas(el, {
      scale: 2,                 // 2× for sharp output
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 15000,
      width: W,
      height: H,
      scrollX: 0,
      scrollY: 0,
      windowWidth: W,
      windowHeight: H,
      onclone: async (clonedDoc, clonedEl) => {
        // Remove any transform that the preview wrapper may have applied
        clonedEl.style.transform = 'none';
        clonedEl.style.transformOrigin = 'top left';
        await waitForImages(clonedDoc);
        await new Promise((r) => setTimeout(r, 200));
      },
    });

    // 6. Build A4 PDF
    const isLandscape = W > H;
    const pdf = new jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, pdfH);
    pdf.save(filename);
  } catch (err) {
    console.error('PDF export error:', err);
    showError('PDF generation failed: ' + (err.message || err));
  }
};
