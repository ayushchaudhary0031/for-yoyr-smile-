import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { Stethoscope } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedView } = useClinic();

  const handleNavClick = (view: string) => {
    setSelectedView(view);
    const id = view === 'home' ? 'services-section' : view;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-primary dark:bg-slate-950 duration-300 transition-colors w-full relative border-t border-blue-900/40 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-white">
        
        {/* Brand & Copyright Info */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <button
            id="footer-logo-trigger"
            onClick={() => handleNavClick('home')}
            className="font-headline-md text-headline-md text-on-primary flex items-center gap-2 font-bold focus:outline-none"
          >
            <Stethoscope className="w-6 h-6 text-teal-300" />
            <span className="text-lg font-extrabold tracking-tight">Surya Dental</span>
          </button>
          <div className="text-center md:text-left">
            <p className="text-xs text-blue-200">© 2026 Surya Dental Speciality Clinic. All rights reserved.</p>
            <p className="text-[10px] text-blue-300/60 mt-0.5 font-mono">Bodla Rd, Agra, UP. Registration SMTP: ayushchaudjary2001@gmail.com</p>
          </div>
        </div>

        {/* Dynamic Nav Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <button
            onClick={() => handleNavClick('home')}
            className="text-xs font-semibold text-blue-100 hover:text-white transition-colors"
          >
            Dental Procedures
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="text-xs font-semibold text-blue-100 hover:text-white transition-colors"
          >
            About Specialist
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-xs font-semibold text-blue-100 hover:text-white transition-colors"
          >
            Emergency Care
          </button>
          <button
            onClick={() => handleNavClick('appointments')}
            className="text-xs font-semibold text-blue-100 hover:text-white transition-colors"
          >
            Appointment Manager
          </button>
        </div>

      </div>
    </footer>
  );
};
