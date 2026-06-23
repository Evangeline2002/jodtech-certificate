import { useRef, useState, useEffect } from 'react';
import { Download, Printer, ZoomIn, ZoomOut, Maximize, Minimize, Eye, AlertCircle } from 'lucide-react';
import { CertificateProvider, useCertificate } from '../context/CertificateContext';
import PortraitCertificate from './certificates/PortraitCertificate';
import { exportPdf } from '../utils/exportPdf';

const ZOOM_STEPS = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

const CertificateFormInner = () => {
  const previewRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setErrorMsg(e.detail);
      setTimeout(() => setErrorMsg(null), 4000);
    };
    document.addEventListener('cert-error', handler);
    return () => document.removeEventListener('cert-error', handler);
  }, []);

  const { zoom, fullScreen, printPreview, certType, updateZoom, toggleFullScreen, togglePrintPreview } = useCertificate();

  const zoomIn = () => {
    const idx = ZOOM_STEPS.indexOf(zoom);
    if (idx < ZOOM_STEPS.length - 1) updateZoom(ZOOM_STEPS[idx + 1]);
  };
  const zoomOut = () => {
    const idx = ZOOM_STEPS.indexOf(zoom);
    if (idx > 0) updateZoom(ZOOM_STEPS[idx - 1]);
  };

  const handleDownload = () => {
    exportPdf('certificate-download', `JODTECH_${certType.charAt(0).toUpperCase() + certType.slice(1)}_Certificate.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`flex ${fullScreen ? 'fixed inset-0 z-[100]' : ''} bg-slate-100`} style={{ height: '100vh' }}>
      <div className={`flex-1 flex flex-col relative bg-gradient-to-br from-slate-800 via-slate-900 to-jod-navy ${printPreview ? 'fixed inset-0 z-[99]' : ''}`}>
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/10 no-print flex-shrink-0">
          <div className="flex items-center gap-2">
            <Maximize size={13} className="text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">A4 Portrait Preview</span>
            <span className="text-[10px] text-gray-500">794 &times; 1123 px</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={zoomOut} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <ZoomOut size={14} className="text-gray-300" />
            </button>
            <span className="text-xs text-gray-300 font-medium w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={zoomIn} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <ZoomIn size={14} className="text-gray-300" />
            </button>
            <span className="w-px h-4 bg-white/20 mx-1" />
            <button onClick={toggleFullScreen}
              className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Full Screen">
              {fullScreen ? <Minimize size={14} className="text-gray-300" /> : <Maximize size={14} className="text-gray-300" />}
            </button>
            <button onClick={() => togglePrintPreview()}
              className={`p-1.5 rounded transition-colors ${printPreview ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Print Preview">
              <Eye size={14} className="text-gray-300" />
            </button>
            <button onClick={handlePrint} className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Print">
              <Printer size={14} className="text-gray-300" />
            </button>
            <button onClick={handleDownload}
              className="px-3 py-1.5 bg-jod-premium-gold text-jod-navy rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all ml-1">
              Download PDF
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg text-xs font-medium no-print">
            <AlertCircle size={14} />
            {errorMsg}
          </div>
        )}

        <div className="flex-1 flex items-center justify-center overflow-auto p-4 preview-area">
          <div
            ref={previewRef}
            className="shadow-2xl rounded-sm overflow-hidden transition-transform duration-200 flex-shrink-0"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            <PortraitCertificate />
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateForm = () => (
  <CertificateProvider>
    <CertificateFormInner />
  </CertificateProvider>
);

export default CertificateForm;
