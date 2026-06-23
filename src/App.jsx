import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CertificateForm from './components/CertificateForm';
// import Footer from './components/Footer';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <main className="flex-grow">{children}</main>
    {/* <Footer /> */}
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/certificate/:type" element={<CertificateForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
    