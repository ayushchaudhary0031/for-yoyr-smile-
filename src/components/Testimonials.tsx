import React from 'react';
import { TESTIMONIALS } from '../data/clinicData';
import { Quote, Star, BadgeCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-gray-100 dark:border-slate-800 transition-colors" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-2">
            Patient Testimonials
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest">
            Hear from our community in Agra
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Giant backdrop quotes */}
              <Quote className="w-10 h-10 absolute top-4 left-4 text-primary/5 pointer-events-none stroke-2 shrink-0" />
              
              <div className="relative z-10 pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic mb-8">
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>

              {/* Patient details row */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 text-primary dark:text-primary rounded-full flex items-center justify-center font-bold text-sm border border-blue-100 dark:border-slate-705 shrink-0">
                  {test.initials}
                </div>
                <div className="ml-3 min-w-0">
                  <h4 className="text-xs font-bold text-primary dark:text-white truncate leading-tight">
                    {test.name}
                  </h4>
                  <div className="flex items-center text-secondary font-semibold text-[10px] mt-1 leading-none">
                    <BadgeCheck className="w-3.5 h-3.5 mr-1 text-secondary shrink-0 fill-secondary/5" />
                    Verified Patient
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
