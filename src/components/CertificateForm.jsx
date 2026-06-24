import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer, ZoomIn, ZoomOut, Maximize, Minimize, Eye, Save, FileText, AlertCircle } from 'lucide-react';
import { CertificateProvider, useCertificate } from '../context/CertificateContext';
import PortraitCertificate from './certificates/PortraitCertificate';
import { exportPdf } from '../utils/exportPdf';

const ZOOM_STEPS = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

const SidebarCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
      <div className="w-7 h-7 bg-jod-navy/5 rounded-lg flex items-center justify-center">
        <Icon size={14} className="text-jod-navy" />
      </div>
      <h3 className="font-semibold text-jod-navy text-xs">{title}</h3>
    </div>
    <div className="p-4 space-y-3">
      {children}
    </div>
  </div>
);

const InputField = ({ label, name, value, onChange, placeholder, type = 'text', required, disabled }) => (
  <div>
    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {type === 'date' ? (
      <input type="date" name={name} value={value} onChange={onChange}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-jod-blue focus:ring-2 focus:ring-jod-blue/20 outline-none transition-all text-xs bg-white" />
    ) : type === 'select' ? (
      <select name={name} value={value} onChange={onChange}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-jod-blue focus:ring-2 focus:ring-jod-blue/20 outline-none transition-all text-xs bg-white">
        {placeholder && <option value="">{placeholder}</option>}
        {label === 'Duration' ? (
          <>
            {['1 Month', '2 Months', '3 Months', '4 Months', '5 Months', '6 Months', '1 Year', '2 Years'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </>
        ) : null}
      </select>
    ) : (
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-jod-blue focus:ring-2 focus:ring-jod-blue/20 outline-none transition-all text-xs bg-white disabled:bg-gray-50 disabled:text-gray-400" />
    )}
  </div>
);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getDateParts = (dateStr) => {
  if (!dateStr || !dateStr.includes('-')) return { d: '01', m: '01', y: '2025' };
  const [y, m, d] = dateStr.split('-');
  return { d: d || '01', m: m || '01', y: y || '2025' };
};

const DateSelect = ({ value, field, onUpdate }) => {
  const parts = getDateParts(value);
  return (
    <div className="flex gap-0.5">
      <select value={parts.d} onChange={(e) => onUpdate(field, 'd', e.target.value)}
        className="w-9 text-xs border border-gray-200 rounded-lg px-0.5 py-2 bg-white text-center">
        {Array.from({ length: 31 }, (_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>)}
      </select>
      <select value={parts.m} onChange={(e) => onUpdate(field, 'm', e.target.value)}
        className="w-12 text-xs border border-gray-200 rounded-lg px-0.5 py-2 bg-white text-center">
        {MONTHS.map((m, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
      </select>
      <select value={parts.y} onChange={(e) => onUpdate(field, 'y', e.target.value)}
        className="w-12 text-xs border border-gray-200 rounded-lg px-0.5 py-2 bg-white text-center">
        {Array.from({ length: 15 }, (_, i) => <option key={i} value={2020 + i}>{2020 + i}</option>)}
      </select>
    </div>
  );
};

const CertificateFormInner = () => {
  const navigate = useNavigate();
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

  const {
    formData, certType, certTitle, zoom, fullScreen, printPreview,
    fontSize, footer,
    updateCertType, updateFormData, updateFormDataMulti, updateCertTitle,
    updateFontSize, updateFooter, updateZoom, toggleFullScreen,
    togglePrintPreview,
    getCertTitle,
  } = useCertificate();

  const handleChange = (e) => {
    updateFormData(e.target.name, e.target.value);
  };

  const handleDateUpdate = (field, part, value) => {
    const parts = getDateParts(formData[field]);
    const updated = { ...parts, [part]: value };
    const newDate = `${updated.y}-${updated.m}-${updated.d}`;
    updateFormData(field, newDate);
    if (field === 'startDate' || field === 'endDate') {
      const start = field === 'startDate' ? newDate : formData.startDate;
      const end = field === 'endDate' ? newDate : formData.endDate;
      if (start && end && start.includes('-') && end.includes('-')) {
        const s = new Date(start + 'T00:00:00');
        const e = new Date(end + 'T00:00:00');
        const diffMonths = (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth();
        if (diffMonths > 0) {
          updateFormData('duration', diffMonths + ' Month' + (diffMonths > 1 ? 's' : ''));
        }
      }
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    updateCertType(newType);
    if (newType === 'experience') {
      updateFormDataMulti({ courseName: '' });
    } else {
      updateFormDataMulti({ designation: '' });
    }
  };

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
    // Temporarily remove the zoom scale so the certificate prints at 100%
    const wrapper = previewRef.current;
    const originalTransform = wrapper ? wrapper.style.transform : null;
    const originalOrigin = wrapper ? wrapper.style.transformOrigin : null;
    if (wrapper) {
      wrapper.style.transform = 'none';
      wrapper.style.transformOrigin = 'top left';
    }
    setTimeout(() => {
      window.print();
      // Restore after print dialog closes
      setTimeout(() => {
        if (wrapper) {
          wrapper.style.transform = originalTransform || '';
          wrapper.style.transformOrigin = originalOrigin || '';
        }
      }, 500);
    }, 300);
  };

  return (
    <div className={`flex ${fullScreen ? 'fixed inset-0 z-[100]' : ''} bg-slate-100`} style={{ height: fullScreen ? '100vh' : '100vh' }}>
      {/* ===== LEFT SIDEBAR ===== */}
      <div className={`no-print flex flex-col bg-white border-r border-gray-200 shadow-lg ${fullScreen ? 'hidden' : ''}`}
        style={{ width: '380px', minWidth: '380px' }}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200 bg-jod-navy text-white flex-shrink-0">
          <button onClick={() => navigate('/')} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-sm font-bold capitalize">Certificate Dashboard</h2>
            <p className="text-[9px] text-white/60">JOD TECH Certificate Generator</p>
          </div>
        </div>

        {/* Scrollable sidebar content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* 1. Certificate Type */}
          <SidebarCard icon={FileText} title="Certificate Type">
            <select value={certType} onChange={handleTypeChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-jod-blue focus:ring-2 focus:ring-jod-blue/20 outline-none text-xs bg-white">
              <option value="internship">Internship Certificate</option>
              <option value="training">Training Certificate</option>
              <option value="experience">Experience Certificate</option>
            </select>
          </SidebarCard>

          {/* 1.5. Course Offered */}
          <SidebarCard icon={FileText} title="Course Offered">
            <select value={formData.courseName}
              onChange={(e) => updateFormData('courseName', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-jod-blue focus:ring-2 focus:ring-jod-blue/20 outline-none text-xs bg-white">
              <option value="">-- Select Course --</option>
              <option value="Full-Stack Development">Full-Stack Development</option>
              <option value="Website Development">Website Development</option>
              <option value="App Development">App Development</option>
            </select>
          </SidebarCard>

          {/* 2. Candidate Details */}
          <SidebarCard icon={Save} title="Candidate Details">
            <InputField label="Candidate Name" name="candidateName" value={formData.candidateName} onChange={handleChange} placeholder="Enter full name" required />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Certificate No" name="certNumber" value={formData.certNumber} onChange={handleChange} placeholder="Auto / Manual" />
              {certType === 'experience' ? (
                <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Developer" />
              ) : (
                <InputField label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="e.g. Web Dev" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InputField label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College / Institute" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
                <DateSelect value={formData.startDate} field="startDate" onUpdate={handleDateUpdate} />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">End Date</label>
                <DateSelect value={formData.endDate} field="endDate" onUpdate={handleDateUpdate} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Duration" name="duration" type="select" value={formData.duration} onChange={handleChange} placeholder="Select duration" />
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Issue Date</label>
                <DateSelect value={formData.issueDate} field="issueDate" onUpdate={handleDateUpdate} />
              </div>
            </div>
          </SidebarCard>

          {/* 3. Certificate Title */}
          <SidebarCard icon={FileText} title="Certificate Title">
            <input type="text" value={certTitle || ''}
              onChange={(e) => updateCertTitle(e.target.value)}
              placeholder={getCertTitle()}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-jod-blue focus:ring-2 focus:ring-jod-blue/20 outline-none text-xs bg-white font-bold uppercase tracking-wider" />
            <p className="text-[9px] text-gray-400 italic">Leave empty for default title</p>
          </SidebarCard>


          {/* 5. Typography Settings */}
          <SidebarCard icon={Save} title="Typography Settings">
            <p className="text-[9px] text-gray-400 mb-1">Apply font size to each element:</p>
            <div className="space-y-2">
              {[
                { key: 'title', label: 'Title' },
                { key: 'candidateName', label: 'Candidate Name' },
                { key: 'content', label: 'Content' },
                { key: 'footer', label: 'Footer' },
                { key: 'certNumber', label: 'Certificate No' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-600 font-medium">{label}</span>
                  <select value={fontSize[key]} onChange={(e) => updateFontSize(key, Number(e.target.value))}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white w-20 text-center">
                    {[12, 14, 16, 18, 20].map(s => (
                      <option key={s} value={s}>{s}px</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </SidebarCard>

          {/* 6. Footer Details */}
          <SidebarCard icon={Save} title="Footer Details">
            <InputField label="Company Name" name="companyName" value={footer.companyName}
              onChange={(e) => updateFooter('companyName', e.target.value)} />
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</label>
              <textarea value={footer.address} onChange={(e) => updateFooter('address', e.target.value)}
                rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-jod-blue focus:ring-2 focus:ring-jod-blue/20 outline-none text-xs bg-white resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Phone" name="phone" value={footer.phone}
                onChange={(e) => updateFooter('phone', e.target.value)} />
              <InputField label="Alt Phone" name="altPhone" value={footer.altPhone}
                onChange={(e) => updateFooter('altPhone', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Website" name="website" value={footer.website}
                onChange={(e) => updateFooter('website', e.target.value)} />
              <InputField label="Email" name="email" value={footer.email}
                onChange={(e) => updateFooter('email', e.target.value)} />
            </div>
          </SidebarCard>

          <div className="h-4" />
        </div>
      </div>

      {/* ===== RIGHT PREVIEW AREA ===== */}
      <div className={`flex-1 flex flex-col relative bg-gradient-to-br from-slate-800 via-slate-900 to-jod-navy ${printPreview ? 'fixed inset-0 z-[99]' : ''}`}>
        {/* Preview Toolbar */}
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

        {/* Error notification */}
        {errorMsg && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg text-xs font-medium no-print">
            <AlertCircle size={14} />
            {errorMsg}
          </div>
        )}

        {/* Certificate Preview */}
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
