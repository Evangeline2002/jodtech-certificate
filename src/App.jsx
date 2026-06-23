import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CertificateForm from './components/CertificateForm';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <main className="flex-grow">{children}</main>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/certificate/internship" replace />} />
          <Route path="/certificate/:type" element={<CertificateForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
    