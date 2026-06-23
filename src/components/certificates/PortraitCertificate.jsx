import { useCertificate } from '../../context/CertificateContext';
import logo from '../../assets/jodtech-logo.png';

const formatDate = (dateStr) => {
  if (!dateStr || !dateStr.includes('-')) return null;
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
};

const Divider = () => (
  <div className="flex items-center gap-2 my-3">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-jod-premium-gold to-transparent" />
    <div className="w-2.5 h-2.5 rotate-45 border border-jod-premium-gold" />
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-jod-premium-gold to-transparent" />
  </div>
);

const getBodyContent = (type, formData) => {
  const { candidateName, courseName, designation, startDate, endDate, collegeName, department } = formData;
  switch (type) {
      case 'internship':
      return (
        <>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>This is to certify that</p>
          <p className="text-3xl font-black uppercase tracking-wider py-1" style={{ color: '#0F766E' }}>
            {candidateName || 'Candidate Name'}
          </p>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>Student of</p>
          <p className="text-xl font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
            {collegeName || 'College Name'}
          </p>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>Department of</p>
          <p className="text-lg font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
            {department || 'Department Name'}
          </p>
          <p className="text-base" style={{ color: '#4a5568' }}>has successfully completed an Internship in</p>
          <p className="text-base font-bold uppercase tracking-wider inline-block pb-0.5 px-4" style={{ color: '#0F766E', borderBottom: '2px solid rgba(212, 175, 55, 0.4)' }}>
            {courseName || 'Full Stack Development'}
          </p>
          <p className="text-base mt-2" style={{ color: '#4a5568' }}>
            at <span className="font-semibold" style={{ color: '#0F766E' }}>JOD TECH</span>{' '}
            during the period from <span className="font-semibold">{formatDate(startDate) || 'DD.MM.YYYY'}</span> to{' '}
            <span className="font-semibold">{formatDate(endDate) || 'DD.MM.YYYY'}</span>.
          </p>
        </>
      );
    case 'training':
      return (
        <>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>This is to certify that</p>
          <p className="text-3xl font-black uppercase tracking-wider py-1" style={{ color: '#0F766E' }}>
            {candidateName || 'Candidate Name'}
          </p>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>Student of</p>
          <p className="text-xl font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
            {collegeName || 'College Name'}
          </p>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>Department of</p>
          <p className="text-lg font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
            {department || 'Department Name'}
          </p>
          <p className="text-base" style={{ color: '#4a5568' }}>has successfully completed a Training in</p>
          <p className="text-base font-bold uppercase tracking-wider inline-block pb-0.5 px-4" style={{ color: '#0F766E', borderBottom: '2px solid rgba(212, 175, 55, 0.4)' }}>
            {courseName || 'Web Technology'}
          </p>
          <p className="text-base mt-2" style={{ color: '#4a5568' }}>
            at <span className="font-semibold" style={{ color: '#0F766E' }}>JOD TECH</span>{' '}
            during the period from <span className="font-semibold">{formatDate(startDate) || 'DD.MM.YYYY'}</span> to{' '}
            <span className="font-semibold">{formatDate(endDate) || 'DD.MM.YYYY'}</span>.
          </p>
        </>
      );
    case 'experience':
      return (
        <>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>This is to certify that</p>
          <p className="text-3xl font-black uppercase tracking-wider py-1" style={{ color: '#0F766E' }}>
            {candidateName || 'Candidate Name'}
          </p>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>Student of</p>
          <p className="text-xl font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
            {collegeName || 'College Name'}
          </p>
          <p className="text-base font-medium" style={{ color: '#4a5568' }}>Department of</p>
          <p className="text-lg font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
            {department || 'Department Name'}
          </p>
          <p className="text-base" style={{ color: '#4a5568' }}>
            worked with <span className="font-semibold" style={{ color: '#0F766E' }}>JOD TECH</span> as
          </p>
          <p className="text-base font-bold uppercase tracking-wider inline-block rounded-lg py-1 px-4" style={{ color: '#065F46', backgroundColor: 'rgba(236, 253, 245, 0.5)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            {designation || 'Software Engineer'}
          </p>
          <p className="text-base mt-2" style={{ color: '#4a5568' }}>
            during the period from <span className="font-semibold" style={{ color: '#0F766E' }}>{formatDate(startDate) || 'DD.MM.YYYY'}</span> to{' '}
            <span className="font-semibold" style={{ color: '#0F766E' }}>{formatDate(endDate) || 'DD.MM.YYYY'}</span>.
          </p>
        </>
      );
    default:
      return null;
  }
};

const PortraitCertificate = () => {
  const { formData, certType, getCertTitle, certContent, fontSize, hrSignature, directorSignature, footer, textFormat } = useCertificate();

  const bodyContent = getBodyContent(certType, formData);
  const title = getCertTitle();

  return (
    <div id="certificate-download" className="relative overflow-hidden bg-white" style={{ width: '794px', height: '1123px' }}>
      {/* Decorative top-right waves */}
      <svg className="absolute top-0 right-0 pointer-events-none z-0" width="320" height="240" viewBox="0 0 380 280" fill="none">
        <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z" fill="url(#emGrad)" opacity="0.08" />
        <path d="M380 0H40C40 0 100 120 230 160C330 185 380 240 380 240V0Z" fill="url(#gdGrad)" opacity="0.06" />
        <defs>
          <linearGradient id="emGrad" x1="0" y1="0" x2="380" y2="280"><stop stopColor="#0F766E" /><stop offset="1" stopColor="#065F46" /></linearGradient>
          <linearGradient id="gdGrad" x1="0" y1="0" x2="380" y2="280"><stop stopColor="#D4AF37" /><stop offset="1" stopColor="#B8860B" /></linearGradient>
        </defs>
      </svg>
      <svg className="absolute bottom-0 left-0 pointer-events-none z-0 scale-x-[-1] scale-y-[-1]" width="320" height="240" viewBox="0 0 380 280" fill="none">
        <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z" fill="url(#emGrad2)" opacity="0.08" />
        <defs>
          <linearGradient id="emGrad2" x1="0" y1="0" x2="380" y2="280"><stop stopColor="#0F766E" /><stop offset="1" stopColor="#065F46" /></linearGradient>
        </defs>
      </svg>

      {/* Border layers */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ border: '2px solid #D4AF37' }} />
      <div className="absolute inset-[6px] pointer-events-none z-10" style={{ border: '1px solid rgba(15, 118, 110, 0.25)' }} />

      {/* Watermark */}
      <img src={logo} alt="" className="absolute" style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '650px', height: 'auto', opacity: 0.05,
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-9 py-7">
        {/* ===== HEADER: Logo + Company name at top center ===== */}
        <div className="flex flex-col items-center pb-6" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <img src={logo} alt="JOD TECH" className="object-contain mb-3" style={{ width: '240px', height: 'auto' }} />
          <h1 style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '34px', fontWeight: 700, color: '#0A2540', letterSpacing: '1px', marginBottom: '4px' }}>
            JOD TECH
          </h1>
          <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '22px', fontWeight: 600, color: '#000000', letterSpacing: '2px' }}>
            IT Solution
          </p>
        </div>

        {/* ===== BODY: Certificate content ===== */}
        <div className="flex flex-col items-center justify-start text-center px-6 pt-4 flex-1">
          {/* Certificate Title */}
          <h2
            className="font-black uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0F766E', fontSize: `${fontSize.title}px` }}
          >
            {title}
          </h2>
          <Divider />

          {/* Certificate Number */}
          {formData.certNumber && (
            <p className="text-xs mb-3" style={{ color: '#9CA3AF', fontSize: `${fontSize.certNumber}px` }}>
              Certificate No: <span className="font-semibold" style={{ color: '#4B5563' }}>{formData.certNumber}</span>
            </p>
          )}

          {/* Dynamic body */}
          <div
            className="space-y-3"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              color: '#333333',
              fontSize: `${fontSize.content}px`,
              textAlign: textFormat.align,
              lineHeight: textFormat.lineHeight,
              letterSpacing: textFormat.letterSpacing + 'px',
            }}
          >
            {bodyContent}
          </div>

          {/* Custom rich content */}
          {certContent && (
            <div
              className="mt-4"
              style={{
                fontSize: `${fontSize.content}px`,
                textAlign: textFormat.align,
                lineHeight: textFormat.lineHeight,
              }}
              dangerouslySetInnerHTML={{ __html: certContent }}
            />
          )}
        </div>

        {/* ===== SIGNATURE AREA ===== */}
        <div className="flex items-end justify-between px-4 pt-4 pb-2">
          {/* HR Signature */}
          <div className="text-center flex-1">
            {hrSignature ? (
              <img src={hrSignature.dataUrl} alt="HR Signature" className="h-12 object-contain mx-auto mb-1.5" />
            ) : (
              <div className="h-12 flex items-end justify-center mb-1.5">
                <div className="w-32 border-b-2" style={{ borderColor: '#D1D5DB' }} />
              </div>
            )}
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#4B5563' }}>HR Signature</p>
            <p className="text-[20px]" style={{ color: '#9CA3AF' }}>HR Manager</p>
          </div>

          {/* Director Signature */}
          <div className="text-center flex-1">
            {directorSignature ? (
              <img src={directorSignature.dataUrl} alt="Director Signature" className="h-12 object-contain mx-auto mb-1.5" />
            ) : (
              <div className="h-12 flex items-end justify-center mb-1.5">
                <div className="w-32 border-b-2" style={{ borderColor: '#D1D5DB' }} />
              </div>
            )}
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#4B5563' }}>Director Signature</p>
            <p className="text-[20px]" style={{ color: '#9CA3AF' }}>Director</p>
          </div>
        </div>

        {/* ===== FOOTER: Navy gradient with gold accent ===== */}
        <div className="mt-auto" style={{ minHeight: '130px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0A2540 0%, #065F46 100%)' }} className="h-full px-6 py-3 flex flex-col items-center justify-center text-center border-t-4 border-jod-premium-gold">
            <div className="flex flex-col items-center gap-1" style={{ fontSize: `${fontSize.footer}px` }}>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>{footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>{footer.phone} | {footer.altPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>{footer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{footer.website}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortraitCertificate;
