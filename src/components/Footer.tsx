import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { Stethoscope, Facebook, Instagram } from 'lucide-react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

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

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-blue-200 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/ayush_chaudhaarry/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-blue-200 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/917906480031"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-blue-200 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <WhatsappIcon className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
};
