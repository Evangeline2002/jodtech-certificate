import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Briefcase, GraduationCap, ChevronRight, Type } from 'lucide-react';
import { motion } from 'framer-motion';

const fontSizes = [14, 16, 18, 20];

const CertificateCard = ({ title, description, icon: Icon, type, fontSize }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
            style={{ fontSize: `${fontSize}px` }}
        >
            <div className="h-2 bg-gradient-to-r from-jod-navy via-jod-blue to-jod-gold"></div>
            <div className="p-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-jod-blue" />
                </div>
                <h3 className="text-xl font-bold text-jod-navy mb-3">{title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    {description}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate(`/certificate/${type}?preview=true`)}
                        className="flex-1 px-4 py-3 bg-gray-50 text-jod-navy font-semibold rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => navigate(`/certificate/${type}`)}
                        className="flex-1 px-4 py-3 bg-jod-navy text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        Generate <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    const [fontSize, setFontSize] = useState(16);

    return (
        <div className="bg-slate-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Font Size Controls */}
                <div className="flex justify-end mb-6">
                    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                        <Type size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium mr-1">Font:</span>
                        <div className="flex gap-1">
                            {fontSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setFontSize(size)}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                        fontSize === size
                                            ? 'bg-jod-navy text-white shadow'
                                            : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <header className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-jod-navy text-white p-4 rounded-2xl mb-6 shadow-lg"
                    >
                        <span className="text-3xl font-black tracking-tighter">JOD TECH</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl font-black text-jod-navy mb-4 tracking-tight"
                    >
                        Certificate <span className="text-jod-blue">Studio</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto"
                    >
                        Generate professional, corporate-grade certificates for internships, training, and work experience in seconds.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CertificateCard
                        title="Internship"
                        description="Professional internship completion certificate with technical assessment note."
                        icon={Award}
                        type="internship"
                        fontSize={fontSize}
                    />
                    <CertificateCard
                        title="Training"
                        description="Awarded for successfully completing technical training programs and workshops."
                        icon={GraduationCap}
                        type="training"
                        fontSize={fontSize}
                    />
                    <CertificateCard
                        title="Experience"
                        description="Official work experience and conduct certificate for employees and contractors."
                        icon={Briefcase}
                        type="experience"
                        fontSize={fontSize}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
