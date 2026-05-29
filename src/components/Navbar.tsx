import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { NotificationCenter } from './NotificationCenter';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, MapPin, Clock, Stethoscope, Menu, X, CalendarCheck, Sun, Moon, Share2, Check } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { selectedView, setSelectedView, darkMode, toggleDarkMode } = useClinic();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyShareLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = "https://ais-pre-xwacdbz7wrja3gknzngldm-436443401801.asia-east1.run.app";
    
    // Fallback if navigator.clipboard is not available in some browsers/iframes
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    } else {
      // Fallback method
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error("Fallback failed", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'appointments', label: 'My Appointments' }
  ];

  const handleNavClick = (id: string) => {
    setSelectedView(id);
    setIsMobileMenuOpen(false);

    // If home/services/about/contact, we can also scroll to appropriate element if on landing page
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-sm" id="header-corporate-nav">
      {/* Top Quick Info Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-gray-200/50 dark:border-slate-800/50 py-2.5 hidden sm:block transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center text-xs font-semibold text-gray-500 dark:text-gray-405">
          <div className="flex items-center space-x-6">
            <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-1.5 hover:text-primary dark:hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5 text-secondary" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>{CLINIC_INFO.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-400 px-3 py-1 rounded-full border border-teal-100 dark:border-teal-900/50">
              <Clock className="w-3.5 h-3.5 text-secondary dark:text-primary animate-pulse" />
              <span>{CLINIC_INFO.hours}</span>
            </div>
            
            <button
              id="topbar-btn-share"
              onClick={copyShareLink}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all duration-150 uppercase tracking-wider text-[10px] font-bold ${
                copied 
                  ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900/55 dark:text-green-400" 
                  : "bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100/75 dark:bg-indigo-950/20 dark:border-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
              }`}
              title="Copy shareable link of this dental application"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Share Live Website</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 h-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          
          {/* Logo / Brand */}
          <button
            id="brand-logo-trigger"
            onClick={() => handleNavClick('home')}
            className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-1.5 sm:gap-2 text-left focus:outline-none"
          >
            <span className="bg-primary/5 dark:bg-primary/15 p-1.5 sm:p-2 rounded-lg text-primary flex items-center justify-center">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-primary dark:text-white leading-tight">Surya Dental</span>
              <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-widest leading-none">Speciality Clinic</span>
            </div>
          </button>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 h-full">
            <div className="flex items-center space-x-4 lg:space-x-6 h-full">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative h-full flex items-center font-bold text-[11px] lg:text-xs uppercase tracking-wider transition-colors duration-205 focus:outline-none ${
                    selectedView === link.id
                      ? 'text-primary dark:text-primary border-b-2 border-primary'
                      : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2.5 lg:space-x-4">
              {/* Dark mode button toggle */}
              <button
                id="btn-dark-mode-toggle"
                onClick={toggleDarkMode}
                className="relative p-1.5 lg:p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-5 h-5 lg:w-6 lg:h-6 text-amber-400 animate-spin-slow" /> : <Moon className="w-5 h-5 lg:w-6 lg:h-6" />}
              </button>

              {/* Mail center/Bell badge */}
              <NotificationCenter />

              {/* Booking CTAs */}
              <button
                id="header-btn-booking"
                onClick={() => handleNavClick('contact')}
                className="bg-primary hover:bg-primary-container text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl font-bold text-[11px] lg:text-xs uppercase tracking-wider transition-all duration-150 active:scale-95 shadow"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Dark mode button toggle */}
            <button
              id="btn-mobile-dark-mode-toggle"
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-6 h-6 text-amber-400" /> : <Moon className="w-6 h-6" />}
            </button>

            <NotificationCenter />
            
            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-xl focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-primary dark:text-primary" /> : <Menu className="w-6 h-6 text-primary dark:text-primary" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl py-4 space-y-1.5 px-4 absolute left-0 w-full animate-slide-down z-50">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                  selectedView === link.id
                    ? 'bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'appointments' && (
                  <CalendarCheck className="w-4 h-4 text-secondary" />
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                id="mobile-btn-book"
                onClick={() => handleNavClick('contact')}
                className="w-full text-center bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow"
              >
                Book Appointment
              </button>

              <button
                id="mobile-btn-share"
                onClick={copyShareLink}
                className={`w-full text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                  copied 
                    ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900/50 dark:text-green-400" 
                    : "bg-indigo-50 border-indigo-100 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-900/30 dark:text-indigo-400"
                }`}
              >
                {copied ? <Check className="w-4 h-4 animate-bounce" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Share Live Website'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
