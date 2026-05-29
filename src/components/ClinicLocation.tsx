import React from 'react';
import { AppointmentForm } from './AppointmentForm';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Smile, Award, Activity, Search } from 'lucide-react';

export const ClinicLocation: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Map & Clinic details */}
          <div className="space-y-8" id="clinic-location-and-surgeries">
            <div>
              <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-2">
                Visit Our Clinic
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Easily accessible location with ample parking facilities.
              </p>
            </div>

            {/* Map Canvas Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-150 dark:border-slate-800 shadow-md hover:shadow-lg transition-shadow">
              {/* Image Map Placeholder exactly as specified in design */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Surya+Dental+Speciality+Clinic+Shahganj+Bodla+Road+Agra"
                target="_blank"
                rel="noopener noreferrer"
                className="h-64 sm:h-72 w-full bg-slate-100 relative block overflow-hidden cursor-pointer group"
                title="Open in Google Maps"
              >
                <img 
                  alt="Street map showing clinic location" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTmxOUFmSKJpSaEdHS55imAMb1iNxafvb7isUtnlx5_e7hg0ro_NyTGgQD--juyWZbMbHa6oh5Xxqr5dHGC2xoG4tr471KIpP7N6OSx10sUe6W6qRJKza2cH0i9XjnM2vnYTfMmNWIdFCGWz496ooKw7oA_YIBKaXkjmyOrqgE0YPtpz68r5BOpf5cItFDl7QIB7MwrByH7yaKsnGPS8MxySvjgz2e88Pq3nGE8q2rAtT2tKQd3-oYDU-pyFJhDdYsrL3c3NrpwJo"
                />
                <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-primary/0 transition-colors" />
                
                {/* Floating GPS Target pin info bar */}
                <span className="absolute bottom-3 left-3 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded shadow flex items-center gap-1 group-hover:bg-secondary transition-colors">
                  📍 TAP TO ACTIVATE GOOGLE NAVIGATION
                </span>
              </a>

              {/* Bottom Card details */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Address Row */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Surya+Dental+Speciality+Clinic+Shahganj+Bodla+Road+Agra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start group cursor-pointer"
                  title="Open in Google Maps"
                >
                  <div className="bg-blue-50 dark:bg-slate-800 text-secondary p-2.5 rounded-lg shrink-0 mr-4 group-hover:bg-secondary transition-all">
                    <MapPin className="w-5 h-5 text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-secondary transition-colors">Surya Dental Speciality Clinic</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap items-center gap-x-2">
                      <span>Shahganj, Bodla Rd, Agra, UP</span>
                      <span className="text-[10px] text-secondary font-bold underline select-none group-hover:opacity-100 transition-opacity">Open in Maps →</span>
                    </p>
                  </div>
                </a>

                {/* Surgeon info Row */}
                <div className="flex items-start">
                  <div className="bg-blue-50 dark:bg-slate-800 text-secondary p-2.5 rounded-lg shrink-0 mr-4">
                    <Smile className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-primary dark:text-white">
                      {CLINIC_INFO.doctors[0].name} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({CLINIC_INFO.doctors[0].degree})</span>
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-0.5">Chief Dental Surgeon</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Extra Clinical Doctors Bar */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-gray-150 dark:border-slate-800 p-6 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <Award className="w-4 h-4 text-secondary" />
                Specialist Panels & Consultants
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <h5 className="text-xs font-bold text-primary dark:text-white">{CLINIC_INFO.doctors[1].name}</h5>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{CLINIC_INFO.doctors[1].role}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-primary dark:text-white">{CLINIC_INFO.doctors[2].name}</h5>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{CLINIC_INFO.doctors[2].role}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Form Panel */}
          <div id="booking-form-anchor">
            <AppointmentForm />
          </div>

        </div>
      </div>
    </section>
  );
};
