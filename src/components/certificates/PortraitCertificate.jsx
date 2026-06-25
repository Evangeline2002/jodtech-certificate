import { useCertificate } from '../../context/CertificateContext';
import logo from '../../assets/jodtech-logo.png';

// ── helpers ────────────────────────────────────────────────────────────────
const fmtDate = (d) => {
  if (!d || !d.includes('-')) return 'DD/MM/YYYY';
  const [y, m, dd] = d.split('-');
  return `${dd}/${m}/${y}`;
};

// ── shared style tokens ─────────────────────────────────────────────────────
const EMERALD = '#0F766E';
const DARK_GREEN = '#065F46';
const NAVY = '#0A2540';
const GOLD = '#D4AF37';
const GRAY_TEXT = '#4a5568';
const FONT_SERIF = "'Times New Roman', Times, serif";

// ── body content per cert type (no Department) ─────────────────────────────
const getBody = (type, formData) => {
  const { candidateName, courseName, designation, startDate, endDate, collegeName } = formData;

  const nameBlock = (
    <p style={{
      fontFamily: FONT_SERIF, fontSize: '32px', fontWeight: 900, color: '#000000',
      textTransform: 'uppercase', letterSpacing: '2px', margin: '6px 0'
    }}>
      {candidateName || 'CANDIDATE NAME'}
    </p>
  );

  const collegeBlock = (
    <p style={{
      fontFamily: FONT_SERIF, fontSize: '20px', fontWeight: 700, color: '#000000',
      textTransform: 'uppercase', letterSpacing: '1px', margin: '4px 0 12px'
    }}>
      {collegeName || 'COLLEGE NAME'}
    </p>
  );

  if (type === 'experience') {
    return (
      <>
        <p style={{ fontFamily: FONT_SERIF, fontSize: '18px', color: GRAY_TEXT, margin: '6px 0' }}>
          This is to certify that
        </p>
        {nameBlock}
        <p style={{ fontFamily: FONT_SERIF, fontSize: '16px', color: GRAY_TEXT, margin: '4px 0' }}>
          worked with{' '}
          <strong style={{ color: DARK_GREEN, fontWeight: 'bold' }}>JOD TECH – IT Solutions</strong> as
        </p>
        <p style={{
          fontFamily: FONT_SERIF, fontSize: '18px', fontWeight: 700, color: DARK_GREEN,
          textTransform: 'uppercase', letterSpacing: '1px',
          border: `1px solid ${GOLD}44`, borderRadius: '4px',
          backgroundColor: 'rgba(236,253,245,0.5)',
          display: 'inline-block', padding: '6px 20px', margin: '6px 0 10px'
        }}>
          {designation || 'Software Engineer'}
        </p>
        <p style={{ fontFamily: FONT_SERIF, fontSize: '16px', color: GRAY_TEXT, margin: '6px 0' }}>
          Internship Period:&nbsp;
          <strong style={{ color: DARK_GREEN, fontWeight: 'bold' }}>{fmtDate(startDate)}</strong>
          &nbsp;–&nbsp;
          <strong style={{ color: DARK_GREEN, fontWeight: 'bold' }}>{fmtDate(endDate)}</strong>
        </p>
      </>
    );
  }

  const courseBlock = (
    <p style={{
      fontFamily: FONT_SERIF, fontSize: '18px', fontWeight: 700, color: '#000000',
      textTransform: 'uppercase', letterSpacing: '1px',
      borderBottom: `2px solid ${GOLD}66`, display: 'inline-block',
      padding: '2px 14px', margin: '6px 0 8px'
    }}>
      {courseName || 'FULL STACK DEVELOPMENT'}
    </p>
  );

  const verb = type === 'training' ? 'a Training' : 'an Internship';

  return (
    <>
      <p style={{ fontFamily: FONT_SERIF, fontSize: '18px', color: GRAY_TEXT, margin: '6px 0' }}>
        This is to certify that
      </p>
      {nameBlock}
      <p style={{ fontFamily: FONT_SERIF, fontSize: '16px', color: GRAY_TEXT, margin: '4px 0 8px' }}>
        Student of
      </p>
      {collegeBlock}
      <p style={{ fontFamily: FONT_SERIF, fontSize: '17px', color: GRAY_TEXT, margin: '6px 0' }}>
        has successfully completed {verb} in
      </p>
      {courseBlock}
      <p style={{ fontFamily: FONT_SERIF, fontSize: '17px', color: GRAY_TEXT, margin: '10px 0 6px', lineHeight: 1.7 }}>
        at <strong style={{ color: DARK_GREEN, fontWeight: 'bold' }}>JOD TECH</strong> during the period from{' '}
        <strong style={{ color: DARK_GREEN, fontWeight: 'bold' }}>{fmtDate(startDate)}</strong> to{' '}
        <strong style={{ color: DARK_GREEN, fontWeight: 'bold' }}>{fmtDate(endDate)}</strong>.
      </p>
    </>
  );

};

// ── main component ─────────────────────────────────────────────────────────
const PortraitCertificate = () => {
  const {
    formData, certType, getCertTitle,
    fontSize, hrSignature, directorSignature, footer,
  } = useCertificate();

  const title = getCertTitle();
  const body = getBody(certType, formData);

  /* ---- root container -------------------------------------------------- */
  const rootStyle = {
    width: '794px',          // 210mm @ 96dpi
    height: '1123px',        // 297mm @ 96dpi
    position: 'relative',
    overflow: 'hidden',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    fontFamily: FONT_SERIF,
  };

  return (
    <div id="certificate-download" className="certificate-page" style={rootStyle}>

      {/* ── decorative corner waves ─────────────────────────────────────── */}
      <svg style={{ position: 'absolute', top: 0, right: 0, pointerEvents: 'none', zIndex: 0 }}
        width="280" height="210" viewBox="0 0 380 280" fill="none">
        <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z"
          fill="#0F766E" opacity="0.15" />
        <path d="M380 0H40C40 0 100 120 230 160C330 185 380 240 380 240V0Z"
          fill="#D4AF37" opacity="0.12" />
      </svg>
      <svg style={{
        position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', zIndex: 0,
        transform: 'scaleX(-1) scaleY(-1)'
      }}
        width="280" height="210" viewBox="0 0 380 280" fill="none">
        <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z"
          fill="#0F766E" opacity="0.15" />
      </svg>

      {/* ── outer gold border ───────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, border: `2px solid ${GOLD}`, zIndex: 20,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', inset: '6px', border: `1px solid ${EMERALD}44`, zIndex: 20,
        pointerEvents: 'none'
      }} />

      {/* ── watermark ───────────────────────────────────────────────────── */}
      <img src={logo} alt="" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '750px', height: 'auto', opacity: 0.08,
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── content wrapper ──────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        height: '100%', padding: '28px 40px 0',
        boxSizing: 'border-box',
      }}>

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingBottom: '14px',
        }}>
          <img src={logo} alt="JOD TECH" style={{ width: '220px', height: 'auto', objectFit: 'contain', marginBottom: '8px' }} />
          <h1 style={{
            fontFamily: FONT_SERIF, fontSize: '32px', fontWeight: 700, color: EMERALD,
            letterSpacing: '1px', margin: '0 0 2px', textAlign: 'center'
          }}>
            JOD TECH
          </h1>
          <p style={{
            fontFamily: FONT_SERIF, fontSize: '20px', fontWeight: 600, color: EMERALD,
            letterSpacing: '2px', margin: 0, textAlign: 'center'
          }}>
            IT Solution
          </p>
        </div>

        {/* ── BODY ─────────────────────────────────────────────────────── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-start',
          textAlign: 'center', paddingTop: '60px', lineHeight: 1.5,
          overflow: 'hidden',
        }}>
          {/* Title */}
          <h2 style={{
            fontFamily: FONT_SERIF, fontSize: `${fontSize.title}px`, fontWeight: 900,
            color: '#000000', textTransform: 'uppercase', letterSpacing: '4px',
            margin: '0 0 10px'
          }}>
            {title}
          </h2>

          {/* Cert number */}
          {formData.certNumber && (
            <p style={{
              fontFamily: FONT_SERIF, fontSize: `${fontSize.certNumber}px`,
              color: '#9CA3AF', margin: '0 0 15px'
            }}>
              Certificate No:&nbsp;
              <strong style={{ color: '#4B5563' }}>{formData.certNumber}</strong>
            </p>
          )}

          {/* Dynamic body */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: '100%', maxWidth: '600px', gap: '4px'
          }}>
            {body}
          </div>
        </div>

        {/* ── SIGNATURE ─────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
          padding: '12px 20px 14px', gap: '60px',
        }}>
          {/* HR Signature */}
          {hrSignature && (
            <div style={{ textAlign: 'center' }}>
              <img src={hrSignature.dataUrl} alt="HR" style={{ height: '40px', objectFit: 'contain', marginBottom: '4px' }} />
              <p style={{
                fontFamily: FONT_SERIF, fontSize: '10px', fontWeight: 700, color: '#4B5563',
                textTransform: 'uppercase', letterSpacing: '1px', margin: '2px 0 0'
              }}>
                HR Signature
              </p>
              <p style={{ fontFamily: FONT_SERIF, fontSize: '9px', color: '#9CA3AF', margin: 0 }}>
                Authorized Signatory
              </p>
            </div>
          )}
          {/* Director Signature */}
          <div style={{ textAlign: 'center' }}>
            {directorSignature ? (
              <img src={directorSignature.dataUrl} alt="Director" style={{ width: '130px', objectFit: 'contain', marginBottom: '10px' }} />
            ) : (
              <div style={{ width: '200px', borderBottom: `2px solid #D1D5DB`, marginBottom: '10px' }} />
            )}
            <p style={{
              fontFamily: FONT_SERIF, fontSize: '14px', fontWeight: 700, color: '#4B5563',
              textTransform: 'uppercase', letterSpacing: '1px', margin: 0
            }}>
              Managing Director
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, ${DARK_GREEN} 100%)`,
        borderTop: `3px solid ${GOLD}`,
        padding: '10px 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '4px',
        zIndex: 30, // Ensure it's above borders if needed
      }}>
        {[
          { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', text: footer.address },
          { icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.14 3.32 2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z', text: `${footer.phone} | ${footer.altPhone}` },
          { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', text: footer.email },
          { icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z', text: footer.website },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={row.icon} />
            </svg>
            <span style={{
              fontFamily: FONT_SERIF, fontSize: `${fontSize.footer}px`,
              color: 'rgba(255,255,255,0.9)', fontWeight: i === 3 ? 600 : 400
            }}>
              {row.text}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PortraitCertificate;
