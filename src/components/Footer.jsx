// import React from 'react';
// import { MapPin, Phone, Globe, Mail, ChevronUp } from 'lucide-react';
// import { motion } from 'framer-motion';
// import logo from '../assets/jodtech-logo.png';

// const Footer = () => {
//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <footer className="bg-jod-navy text-white no-print relative">
//             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-jod-gold via-jod-blue to-jod-gold"></div>

//             <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

//                     {/* Brand */}
//                     <div className="lg:col-span-1">
//                         <div className="flex items-center gap-3 mb-4">
//                             <img src={logo} alt="JOD TECH" className="h-12 w-auto brightness-0 invert" />
//                             <div>
//                                 <h3 className="text-xl font-black tracking-tight">JOD TECH</h3>
//                                 <p className="text-[10px] text-jod-gold tracking-[0.2em] uppercase font-semibold">IT Solutions</p>
//                             </div>
//                         </div>
//                         <p className="text-gray-400 text-sm leading-relaxed">
//                             Empowering businesses with cutting-edge IT solutions, professional training, and industry-certified talent development.
//                         </p>
//                     </div>

//                     {/* Quick Links */}
//                     <div>
//                         <h4 className="text-sm font-bold uppercase tracking-widest text-jod-gold mb-5">Quick Links</h4>
//                         <ul className="space-y-3">
//                             {['Home', 'Certificate', 'Services', 'Contact'].map((link) => (
//                                 <li key={link}>
//                                     <a
//                                         href={link === 'Home' ? '/' : '#'}
//                                         className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
//                                     >
//                                         <span className="w-1 h-1 bg-jod-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                         {link}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Contact Info */}
//                     <div>
//                         <h4 className="text-sm font-bold uppercase tracking-widest text-jod-gold mb-5">Contact</h4>
//                         <ul className="space-y-4">
//                             <li className="flex items-start gap-3">
//                                 <MapPin size={16} className="text-jod-gold mt-1 shrink-0" />
//                                 <span className="text-gray-400 text-sm leading-relaxed">
//                                     No.10, Chitharanjan Street,<br />
//                                     Chinna Chokkikulam,<br />
//                                     Madurai – 625002
//                                 </span>
//                             </li>
//                             <li className="flex items-center gap-3">
//                                 <Phone size={16} className="text-jod-gold shrink-0" />
//                                 <span className="text-gray-400 text-sm">
//                                     +91 96297 72195<br />+91 78679 08377
//                                 </span>
//                             </li>
//                             <li className="flex items-center gap-3">
//                                 <Mail size={16} className="text-jod-gold shrink-0" />
//                                 <a href="mailto:contact@jodtech.in" className="text-gray-400 hover:text-white text-sm transition-colors">
//                                     contact@jodtech.in
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Website & Social */}
//                     <div>
//                         <h4 className="text-sm font-bold uppercase tracking-widest text-jod-gold mb-5">Online</h4>
//                         <div className="space-y-4">
//                             <a
//                                 href="https://www.jodtech.in"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors group"
//                             >
//                                 <Globe size={16} className="text-jod-gold shrink-0" />
//                                 <span className="group-hover:underline">www.jodtech.in</span>
//                             </a>
//                             <div className="flex gap-3 pt-2">
//                                 {['Certificate', 'Preview', 'PDF', 'Print'].map((tag) => (
//                                     <span
//                                         key={tag}
//                                         className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 uppercase tracking-wider font-semibold"
//                                     >
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
//                     <p className="text-gray-500 text-xs">
//                         &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-400">JOD TECH – IT Solutions</span>. All rights reserved.
//                     </p>
//                     <motion.button
//                         whileHover={{ y: -2 }}
//                         onClick={scrollToTop}
//                         className="text-gray-500 hover:text-jod-gold transition-colors"
//                         aria-label="Scroll to top"
//                     >
//                         <ChevronUp size={20} />
//                     </motion.button>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
