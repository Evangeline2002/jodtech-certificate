import React from 'react';
import logo from '../../assets/jodtech-logo.png';

const formatDate = (dateStr) => {
  if (!dateStr || !dateStr.includes('-')) return null;
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
};

const CornerWaves = () => (
  <>
    <svg className="wave-top-right" viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z" fill="url(#emeraldGrad)" opacity="0.08" />
      <path d="M380 0H40C40 0 100 120 230 160C330 185 380 240 380 240V0Z" fill="url(#goldGrad)" opacity="0.06" />
      <path d="M380 0H80C80 0 140 100 240 140C320 165 380 200 380 200V0Z" fill="url(#emeraldGrad)" opacity="0.04" />
      <defs>
        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="380" y2="280">
          <stop stopColor="#0F766E" />
          <stop offset="1" stopColor="#065F46" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="380" y2="280">
          <stop stopColor="#D4AF37" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
      </defs>
    </svg>
    <svg className="wave-bottom-left" viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M380 0H0C0 0 60 140 220 180C340 210 380 280 380 280V0Z" fill="url(#emeraldGrad2)" opacity="0.08" />
      <path d="M380 0H40C40 0 100 120 230 160C330 185 380 240 380 240V0Z" fill="url(#goldGrad2)" opacity="0.06" />
      <path d="M380 0H80C80 0 140 100 240 140C320 165 380 200 380 200V0Z" fill="url(#emeraldGrad2)" opacity="0.04" />
      <defs>
        <linearGradient id="emeraldGrad2" x1="0" y1="0" x2="380" y2="280">
          <stop stopColor="#0F766E" />
          <stop offset="1" stopColor="#065F46" />
        </linearGradient>
        <linearGradient id="goldGrad2" x1="0" y1="0" x2="380" y2="280">
          <stop stopColor="#D4AF37" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
      </defs>
    </svg>
  </>
);

const CertificateLayout = ({ children, title, fontSize }) => {
  return (
    <div id="certificate-download" className="certificate-container" style={{ fontSize: `${fontSize}px` }}>
      <div className="certificate-border relative h-full flex flex-col items-center text-center overflow-hidden">

        <CornerWaves />

        <img src={logo} alt="" className="cert-watermark" />

        {/* Header */}
        <div className="w-full relative z-10 pt-6 px-10">
          <div className="flex flex-col items-center">
            <div className="mb-3">
              <img src={logo} alt="JOD TECH" className="h-28 w-auto object-contain" />
            </div>
            <h2
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
              className="text-jod-emerald text-lg font-bold tracking-[0.25em] uppercase"
            >
              JOD TECH – IT SOLUTIONS
            </h2>
            <div className="flex items-center gap-3 mt-3 mb-1">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-jod-premium-gold"></div>
              <div className="w-2 h-2 rotate-45 border border-jod-premium-gold"></div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-jod-premium-gold"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="relative z-10 mt-6 mb-4">
          <h1
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="text-3xl font-black text-jod-emerald tracking-[0.3em] uppercase"
          >
            {title} Certificate
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-16 bg-jod-premium-gold"></div>
            <div className="w-3 h-3 border border-jod-premium-gold rotate-45"></div>
            <div className="h-px w-16 bg-jod-premium-gold"></div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-grow w-full px-12 relative z-10 flex flex-col justify-center" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          {children}
        </div>

        {/* Signature Section */}
        <div className="w-full relative z-10 px-12 mt-2">
          <div className="flex justify-between items-start mb-8">
            {/* Left - Issue Date */}
            <div className="text-left">
              <p className="text-[10px] font-bold text-jod-emerald uppercase tracking-[0.15em] mb-2">Issue Date</p>
              <div className="w-36 border-b border-jod-dark-green mb-1"></div>
              <p className="text-xs font-medium mt-1" style={{ color: '#6B7280' }}>{'DD.MM.YYYY'}</p>
            </div>

            {/* Center - Seal */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ border: '2px solid rgba(212, 175, 55, 0.6)', background: 'linear-gradient(135deg, #ffffff, rgba(236, 253, 245, 0.3))' }}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ border: '1px solid rgba(212, 175, 55, 0.4)' }}>
                    <span className="text-[8px] font-bold text-jod-emerald uppercase leading-tight text-center" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      OFFICIAL<br />SEAL
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[8px] mt-1 uppercase tracking-wider font-medium" style={{ color: '#9CA3AF' }}>Company Stamp</p>
            </div>

            {/* Right - Digital Signature */}
            <div className="text-right">
              <p className="text-[10px] font-bold text-jod-emerald uppercase tracking-[0.15em] mb-2">Digitally Signed By</p>
              <div className="flex items-center justify-end gap-1 mb-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-jod-emerald">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="text-[10px] text-jod-emerald font-semibold">Verified</span>
              </div>
              <div
                style={{ fontFamily: "'Times New Roman', Times, serif", color: '#374151' }}
                className="text-xl italic leading-none mb-1"
              >
                John David
              </div>
              <div className="w-36 border-b border-jod-dark-green ml-auto mb-1"></div>
              <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#4B5563' }}>Mr. John David</p>
              <p className="text-[8px]" style={{ color: '#9CA3AF' }}>Founder & CEO</p>
              <p className="text-[8px]" style={{ color: '#9CA3AF' }}>JOD TECH – IT Solutions</p>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="w-full relative z-10 bg-jod-dark-green mt-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-jod-premium-gold to-transparent"></div>
          <div className="px-6 py-3 flex flex-wrap justify-between items-center text-[9px] gap-x-6 gap-y-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-jod-premium-gold">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>No.10, Chitharanjan St, Chinna Chokkikulam, Madurai – 625002</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-jod-premium-gold">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 96297 72195 | +91 78679 08377</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-jod-premium-gold">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>support@jodtech.in</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-jod-premium-gold">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="font-semibold">www.jodtech.in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InternshipCertificate = ({ data, fontSize = 16 }) => {
  const { candidateName, courseName, startDate, endDate, collegeName, department } = data;
  return (
    <CertificateLayout title="Internship" type="internship" fontSize={fontSize}>
      <div className="space-y-4" style={{ fontFamily: "'Times New Roman', Times, serif", color: '#333333' }}>
        <p className="text-sm font-medium tracking-wide">This is to certify that</p>
        <h3
          style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0F766E' }}
          className="text-2xl font-black tracking-wide uppercase py-0.5"
        >
          {candidateName || 'Candidate Name'}
        </h3>
        <p className="text-sm font-medium tracking-wide">Student of</p>
        <p className="text-lg font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
          {collegeName || 'College Name'}
        </p>
        <p className="text-sm font-medium tracking-wide">Department of</p>
        <p className="text-base font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
          {department || 'Department Name'}
        </p>
        <p className="text-sm leading-relaxed">
          has successfully completed an Internship in
        </p>
        <div className="inline-block pb-0.5 px-4" style={{ borderBottom: '2px solid rgba(212, 175, 55, 0.4)' }}>
          <span className="text-base font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
            {courseName || 'Full Stack Development'}
          </span>
        </div>
        <p className="text-sm leading-relaxed mt-2">
          at <span className="font-semibold text-jod-emerald">JOD TECH – IT Solutions</span>{' '}
          during the period from{' '}
          <span className="font-semibold">{formatDate(startDate) || 'DD.MM.YYYY'}</span> to{' '}
          <span className="font-semibold">{formatDate(endDate) || 'DD.MM.YYYY'}</span>.
        </p>
      </div>
    </CertificateLayout>
  );
};

export const TrainingCertificate = ({ data, fontSize = 16 }) => {
  const { candidateName, courseName, startDate, endDate, collegeName, department } = data;
  return (
    <CertificateLayout title="Training" type="training" fontSize={fontSize}>
      <div className="space-y-4" style={{ fontFamily: "'Times New Roman', Times, serif", color: '#333333' }}>
        <p className="text-sm font-medium tracking-wide">This is to certify that</p>
        <h3
          style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0F766E' }}
          className="text-2xl font-black tracking-wide uppercase py-0.5"
        >
          {candidateName || 'Candidate Name'}
        </h3>
        <p className="text-sm font-medium tracking-wide">Student of</p>
        <p className="text-lg font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
          {collegeName || 'College Name'}
        </p>
        <p className="text-sm font-medium tracking-wide">Department of</p>
        <p className="text-base font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
          {department || 'Department Name'}
        </p>
        <p className="text-sm leading-relaxed">
          has successfully completed a Training in
        </p>
        <div className="inline-block py-1.5 px-6" style={{ borderTop: '2px solid rgba(212, 175, 55, 0.3)', borderBottom: '2px solid rgba(212, 175, 55, 0.3)' }}>
          <span className="text-base font-bold uppercase tracking-widest" style={{ color: '#0F766E' }}>
            {courseName || 'Web Technology'}
          </span>
        </div>
        <p className="text-sm leading-relaxed mt-2">
          at <span className="font-semibold text-jod-emerald">JOD TECH – IT Solutions</span>{' '}
          during the period from{' '}
          <span className="font-semibold">{formatDate(startDate) || 'DD.MM.YYYY'}</span> to{' '}
          <span className="font-semibold">{formatDate(endDate) || 'DD.MM.YYYY'}</span>.
        </p>
      </div>
    </CertificateLayout>
  );
};

export const ExperienceCertificate = ({ data, fontSize = 16 }) => {
  const { candidateName, designation, startDate, endDate, collegeName, department } = data;
  return (
    <CertificateLayout title="Experience" type="experience" fontSize={fontSize}>
      <div className="space-y-4" style={{ fontFamily: "'Times New Roman', Times, serif", color: '#333333' }}>
        <p className="text-sm font-medium tracking-wide">This is to certify that</p>
        <h3
          style={{ fontFamily: "'Times New Roman', Times, serif", color: '#0F766E' }}
          className="text-2xl font-black tracking-wide uppercase py-0.5"
        >
          {candidateName || 'Candidate Name'}
        </h3>
        <p className="text-sm font-medium tracking-wide">Student of</p>
        <p className="text-lg font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
          {collegeName || 'College Name'}
        </p>
        <p className="text-sm font-medium tracking-wide">Department of</p>
        <p className="text-base font-bold uppercase tracking-wider" style={{ color: '#0F766E' }}>
          {department || 'Department Name'}
        </p>
        <p className="text-sm leading-relaxed">
          worked with <span className="font-semibold text-jod-emerald">JOD TECH – IT Solutions</span> as
        </p>
        <div className="inline-block px-5 py-1 rounded" style={{ backgroundColor: 'rgba(236, 253, 245, 0.5)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <span className="text-base font-bold uppercase tracking-wider" style={{ color: '#065F46' }}>
            {designation || 'Software Engineer'}
          </span>
        </div>
        <p className="text-sm leading-relaxed mt-2">
          during the period from <span className="font-semibold" style={{ color: '#0F766E' }}>{formatDate(startDate) || 'DD.MM.YYYY'}</span> to{' '}
          <span className="font-semibold" style={{ color: '#0F766E' }}>{formatDate(endDate) || 'DD.MM.YYYY'}</span>.
        </p>
      </div>
    </CertificateLayout>
  );
};
