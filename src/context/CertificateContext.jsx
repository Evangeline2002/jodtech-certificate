import { createContext, useContext, useState, useCallback } from 'react';

const CertificateContext = createContext();

const initialFormData = {
  candidateName: '',
  certNumber: '',
  courseName: '',
  designation: '',
  collegeName: '',
  department: '',
  startDate: '',
  endDate: '',
  duration: '',
  issueDate: new Date().toISOString().split('T')[0],
};

const initialState = {
  certType: 'internship',
  formData: { ...initialFormData },
  certTitle: '',
  certContent: '',
  fontSize: {
    title: 16,
    candidateName: 16,
    content: 14,
    footer: 10,
    certNumber: 12,
  },
  logo: null,
  hrSignature: null,
  directorSignature: null,
  companySeal: null,
  footer: {
    companyName: 'JOD TECH \u2013 IT Solutions',
    address: 'No.10, Chitharanjan Street,\nChinna Chokkikulam,\nMadurai \u2013 625002',
    phone: '+91 96297 72195',
    altPhone: '+91 78679 08377',
    website: 'https://www.jodtech.in',
    email: 'support@jodtech.in',
  },
  zoom: 0.55,
  fullScreen: false,
  printPreview: false,
  textFormat: {
    bold: false,
    italic: false,
    underline: false,
    align: 'center',
    lineHeight: '1.6',
    letterSpacing: '0',
  },
};

export const CertificateProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const updateCertType = useCallback((type) => {
    setState(prev => ({ ...prev, certType: type }));
  }, []);

  const updateFormData = useCallback((field, value) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
    }));
  }, []);

  const updateFormDataMulti = useCallback((data) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...data },
    }));
  }, []);

  const updateCertTitle = useCallback((title) => {
    setState(prev => ({ ...prev, certTitle: title }));
  }, []);

  const updateCertContent = useCallback((content) => {
    setState(prev => ({ ...prev, certContent: content }));
  }, []);

  const updateFontSize = useCallback((element, size) => {
    setState(prev => ({
      ...prev,
      fontSize: { ...prev.fontSize, [element]: size },
    }));
  }, []);

  const uploadSignature = useCallback((type, file) => {
    setState(prev => ({ ...prev, [type]: file }));
  }, []);

  const removeSignature = useCallback((type) => {
    setState(prev => ({ ...prev, [type]: null }));
  }, []);

  const updateFooter = useCallback((field, value) => {
    setState(prev => ({
      ...prev,
      footer: { ...prev.footer, [field]: value },
    }));
  }, []);

  const updateZoom = useCallback((zoom) => {
    setState(prev => ({ ...prev, zoom }));
  }, []);

  const toggleFullScreen = useCallback(() => {
    setState(prev => ({ ...prev, fullScreen: !prev.fullScreen }));
  }, []);

  const togglePrintPreview = useCallback(() => {
    setState(prev => ({ ...prev, printPreview: !prev.printPreview }));
  }, []);

  const updateTextFormat = useCallback((format, value) => {
    setState(prev => ({
      ...prev,
      textFormat: { ...prev.textFormat, [format]: value },
    }));
  }, []);

  const resetForm = useCallback(() => {
    setState({ ...initialState, issueDate: new Date().toISOString().split('T')[0] });
  }, []);

  const getDefaultTitle = useCallback(() => {
    const titles = {
      internship: 'INTERNSHIP CERTIFICATE',
      training: 'TRAINING CERTIFICATE',
      experience: 'EXPERIENCE CERTIFICATE',
    };
    return titles[state.certType] || 'CERTIFICATE';
  }, [state.certType]);

  const getCertTitle = useCallback(() => {
    return state.certTitle || getDefaultTitle();
  }, [state.certTitle, getDefaultTitle]);

  const formatDate = useCallback((dateStr) => {
    if (!dateStr || !dateStr.includes('-')) return null;
    const [y, m, d] = dateStr.split('-');
    return `${d}.${m}.${y}`;
  }, []);

  const updateLogo = useCallback((file) => {
    setState(prev => ({ ...prev, logo: file }));
  }, []);

  const removeLogo = useCallback(() => {
    setState(prev => ({ ...prev, logo: null }));
  }, []);

  const value = {
    ...state,
    updateCertType,
    updateFormData,
    updateFormDataMulti,
    updateCertTitle,
    updateCertContent,
    updateFontSize,
    uploadSignature,
    removeSignature,
    updateLogo,
    removeLogo,
    updateFooter,
    updateZoom,
    toggleFullScreen,
    togglePrintPreview,
    updateTextFormat,
    resetForm,
    getDefaultTitle,
    getCertTitle,
    formatDate,
  };

  return (
    <CertificateContext.Provider value={value}>
      {children}
    </CertificateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCertificate = () => {
  const ctx = useContext(CertificateContext);
  if (!ctx) throw new Error('useCertificate must be used within CertificateProvider');
  return ctx;
};

export default CertificateContext;
