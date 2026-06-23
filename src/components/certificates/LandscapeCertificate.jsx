import { useCertificate } from '../../context/CertificateContext';

const formatDate = (dateStr) => {
  if (!dateStr || !dateStr.includes('-')) return null;
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
};

const Divider = () => (
  <div className="flex items-center gap-2 my-2">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-jod-premium-gold to-transparent" />
    <div className="w-2 h-2 rotate-45 border border-jod-premium-gold" />
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-jod-premium-gold to-transparent" />
  </div>
);

const getBodyContent = (type, formData) => {
  const { candidateName, courseName, designation, startDate, endDate, collegeName, department } = formData;
  switch (type) {
    case 'internship':
      return (
        <>
          <p className="text-sm font-medium">This is to certify that</p>
          <p className="text-2xl font-black uppercase tracking-wider py-1" style={{ color: '#0F766E' }}>
            {candidateName || 'Candidate Name'}
          </p>
          <p className="text-sm font-medium">Student of</p>
          <p className="text-xl font-bold uppercase tracking-wider pb-0.5" style={{ color: '#0F766E' }}>
            {collegeName || 'College Name'}
          </p>
          <p className="text-sm font-medium">Department of</p>
          <p className="text-base font-bold uppercase tracking-wider pb-0.5" style={{ color: '#0F766E' }}>
            {department || 'Department Name'}
          </p>
          <p className="text-sm">has successfully completed an Internship in</p>
          <p className="text-base font-bold uppercase tracking-wider px-4 inline-block pb-0.5" style={{ color: '#0F766E', borderBottom: '2px solid rgba(212, 175, 55, 0.4)' }}>
            {courseName || 'Full Stack Development'}
          </p>
          <p className="text-sm mt-2">
            at <span className="font-semibold" style={{ color: '#0F766E' }}>JOD TECH \u2013 IT Solutions</span>{' '}
            during the period from {formatDate(startDate) || 'DD.MM.YYYY'} to {formatDate(endDate) || 'DD.MM.YYYY'}.
          </p>
        </>
      );
    case 'training':
      return (
        <>
          <p className="text-sm font-medium">This is to certify that</p>
          <p className="text-2xl font-black uppercase tracking-wider py-1" style={{ color: '#0F766E' }}>
            {candidateName || 'Candidate Name'}
          </p>
          <p className="text-sm font-medium">Student of</p>
          <p className="text-xl font-bold uppercase tracking-wider pb-0.5" style={{ color: '#0F766E' }}>
            {collegeName || 'College Name'}
          </p>
          <p className="text-sm font-medium">Department of</p>
          <p className="text-base font-bold uppercase tracking-wider pb-0.5" style={{ color: '#0F766E' }}>
            {department || 'Department Name'}
          </p>
          <p className="text-sm">has successfully completed a Training in</p>
          <p className="text-base font-bold uppercase tracking-widest px-4 inline-block py-1" style={{ color: '#0F766E', borderTop: '2px solid rgba(212, 175, 55, 0.3)', borderBottom: '2px solid rgba(212, 175, 55, 0.3)' }}>
            {courseName || 'Web Technology'}
          </p>
          <p className="text-sm mt-2">
            at <span className="font-semibold" style={{ color: '#0F766E' }}>JOD TECH \u2013 IT Solutions</span>{' '}
            during the period from {formatDate(startDate) || 'DD.MM.YYYY'} to {formatDate(endDate) || 'DD.MM.YYYY'}.
          </p>
        </>
      );
    case 'experience':
      return (
        <>
          <p className="text-sm font-medium">This is to certify that</p>
          <p className="text-2xl font-black uppercase tracking-wider py-1" style={{ color: '#0F766E' }}>
            {candidateName || 'Candidate Name'}
          </p>
          <p className="text-sm font-medium">Student of</p>
          <p className="text-xl font-bold uppercase tracking-wider pb-0.5" style={{ color: '#0F766E' }}>
            {collegeName || 'College Name'}
          </p>
          <p className="text-sm font-medium">Department of</p>
          <p className="text-base font-bold uppercase tracking-wider pb-0.5" style={{ color: '#0F766E' }}>
            {department || 'Department Name'}
          </p>
          <p className="text-sm">worked with <span className="font-semibold" style={{ color: '#0F766E' }}>JOD TECH \u2013 IT Solutions</span> as</p>
          <p className="text-base font-bold uppercase tracking-wider px-4 inline-block rounded py-1" style={{ color: '#065F46', backgroundColor: 'rgba(236, 253, 245, 0.5)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            {designation || 'Software Engineer'}
          </p>
          <p className="text-sm mt-2">
            during the period from <span className="font-semibold" style={{ color: '#0F766E' }}>{formatDate(startDate) || 'DD.MM.YYYY'}</span> to{' '}
            <span className="font-semibold" style={{ color: '#0F766E' }}>{formatDate(endDate) || 'DD.MM.YYYY'}</span>.
          </p>
        </>
      );
    default:
      return null;
  }
};

const LandscapeCertificate = () => {
  const { formData, certType, getCertTitle, certContent, fontSize, hrSignature, directorSignature, companySeal, footer, textFormat } = useCertificate();

  const bodyContent = getBodyContent(certType, formData);
  const title = getCertTitle();

  return (
    <div id="certificate-download" className="relative overflow-hidden" style={{ width: '1123px', height: '794px', background: 'white' }}>
      {/* Decorative corner elements */}
      <svg className="absolute top-0 right-0" width="300" height="220" viewBox="0 0 380 280" fill="none">
        <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z" fill="url(#emeraldGrad)" opacity="0.08" />
        <path d="M380 0H40C40 0 100 120 230 160C330 185 380 240 380 240V0Z" fill="url(#goldGrad)" opacity="0.06" />
        <defs>
          <linearGradient id="emeraldGrad" x1="0" y1="0" x2="380" y2="280"><stop stopColor="#0F766E" /><stop offset="1" stopColor="#065F46" /></linearGradient>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="380" y2="280"><stop stopColor="#D4AF37" /><stop offset="1" stopColor="#B8860B" /></linearGradient>
        </defs>
      </svg>
      <svg className="absolute bottom-0 left-0 scale-x-[-1] scale-y-[-1]" width="300" height="220" viewBox="0 0 380 280" fill="none">
        <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z" fill="url(#emeraldGrad2)" opacity="0.08" />
        <defs>
          <linearGradient id="emeraldGrad2" x1="0" y1="0" x2="380" y2="280"><stop stopColor="#0F766E" /><stop offset="1" stopColor="#065F46" /></linearGradient>
        </defs>
      </svg>

      {/* Border */}
      <div className="absolute inset-0 pointer-events-none" style={{ border: '2px solid #D4AF37', zIndex: 20 }} />
      <div className="absolute inset-[6px] pointer-events-none" style={{ border: '1px solid rgba(15, 118, 110, 0.3)', zIndex: 20 }} />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg width="500" height="350" viewBox="0 0 200 140" fill="none" opacity="0.04">
          <text x="100" y="70" textAnchor="middle" dominantBaseline="central" fontSize="40" fontWeight="900" fill="#0F766E" fontFamily="'Times New Roman', Times, serif">JOD TECH</text>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex items-center gap-4 pb-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ecfdf5', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <span className="text-sm font-black" style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0F766E' }}>JT</span>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-black uppercase tracking-[0.2em]" style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0A2540' }}>
              JOD TECH \u2013 IT SOLUTIONS
            </h1>
            <p className="text-[10px] italic tracking-wide" style={{ color: '#6B7280' }}>Innovating Digital Solutions</p>
          </div>
        </div>

        {/* Certificate body */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-4">
          <h2
            className="font-black uppercase tracking-[0.3em] mb-2"
            style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0F766E', fontSize: `${fontSize.title}px` }}
          >
            {title}
          </h2>
          <Divider />

          {/* Certificate Number */}
          {formData.certNumber && (
            <p className="text-[10px] mb-2" style={{ color: '#9CA3AF', fontSize: `${fontSize.certNumber}px` }}>
              Certificate No: <span className="font-semibold" style={{ color: '#4B5563' }}>{formData.certNumber}</span>
            </p>
          )}

          {/* Dynamic body */}
          <div
            className="space-y-2 max-w-2xl"
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

          {/* Custom content if provided */}
          {certContent && (
            <div
              className="mt-3 max-w-2xl"
              style={{ fontSize: `${fontSize.content}px`, textAlign: textFormat.align, lineHeight: textFormat.lineHeight }}
              dangerouslySetInnerHTML={{ __html: certContent }}
            />
          )}
        </div>

        {/* Signature area */}
        <div className="flex items-end justify-between px-4 mt-2">
          <div className="text-center flex-1">
            {hrSignature ? (
              <img src={hrSignature.dataUrl} alt="HR Signature" className="h-10 object-contain mx-auto mb-1" />
            ) : (
              <div className="h-10 flex items-end justify-center mb-1">
                <div className="w-28 border-b-2" style={{ borderColor: '#D1D5DB' }} />
              </div>
            )}
            <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#4B5563' }}>HR Signature</p>
            <p className="text-[8px]" style={{ color: '#9CA3AF' }}>Authorized Signatory</p>
          </div>

          <div className="text-center flex-1">
            {companySeal ? (
              <img src={companySeal.dataUrl} alt="Company Seal" className="h-16 w-16 object-contain mx-auto mb-1" />
            ) : (
              <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-1" style={{ border: '2px solid rgba(212, 175, 55, 0.4)', background: 'linear-gradient(135deg, #ffffff, rgba(236, 253, 245, 0.3))' }}>
                <span className="text-[7px] font-bold uppercase text-center leading-tight" style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0F766E' }}>
                  OFFICIAL<br />SEAL
                </span>
              </div>
            )}
            <p className="text-[8px] uppercase tracking-wider" style={{ color: '#9CA3AF' }}>Company Stamp</p>
          </div>

          <div className="text-center flex-1">
            {directorSignature ? (
              <img src={directorSignature.dataUrl} alt="Managing Director" className="w-36 object-contain mx-auto mb-3" />
            ) : (
              <div className="w-36 flex items-end justify-center mx-auto mb-3">
                <div className="w-28 border-b-2" style={{ borderColor: '#D1D5DB' }} />
              </div>
            )}
            <p className="font-bold uppercase tracking-wider" style={{ color: '#4B5563', fontSize: '18px' }}>Managing Director</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 pt-2" style={{ borderTop: '1px solid #E5E7EB' }}>
          <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-0.5 text-[8px]" style={{ color: '#6B7280', fontSize: `${fontSize.footer}px` }}>
            <div className="flex items-center gap-1">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{footer.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>&#9742; {footer.phone} | {footer.altPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>&#9993; {footer.email}</span>
              <span>|</span>
              <span className="font-semibold">{footer.website}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandscapeCertificate;
