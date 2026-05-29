import React from 'react';
import { Award, Star, Quote, ShieldAlert, BadgeCheck } from 'lucide-react';

export const AboutStats: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-gray-100 dark:border-slate-800 transition-colors" id="about-stats-section border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Stat Card: 11+ Years */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="bg-blue-50 dark:bg-slate-800 text-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-blue-100/50 dark:border-slate-700/50">
                <Award className="w-7 h-7 text-primary fill-primary/10" />
              </div>
              <h3 className="font-headline-xl text-5xl font-extrabold text-primary mb-2">11+</h3>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Years of Clinical Excellence
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
              Serving the Agra community with consistent medical reviews, premium dental implants, orthodontics, and complete surgical operations.
            </p>
          </div>

          {/* Testimonial Highlights: Ram Avtar Sharma */}
          <div className="lg:col-span-8 bg-primary rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-center text-white shadow-xl">
            {/* Massive Double Quote Vector block */}
            <Quote className="w-36 h-36 absolute -bottom-6 -right-6 text-white/[0.04] pointer-events-none stroke-1 select-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                {/* Gold Rating Stars */}
                <div className="flex items-center gap-1 text-secondary-container mb-6">
                  <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                </div>

                {/* Testimonial Text */}
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic mb-8 max-w-2xl text-blue-50">
                  &ldquo;Excellent Doctor. Services are the best, well managed and clean clinic. High professionalism at Surya Dental!&rdquo;
                </p>
              </div>

              {/* Patient Badge */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-400 text-primary flex items-center justify-center text-base font-extrabold shadow border border-white/10">
                  RS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">RAM AVTAR SHARMA</h4>
                  <p className="text-xs text-blue-200 font-semibold flex items-center mt-0.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-teal-300 mr-1 shrink-0" />
                    Verified Patient Review
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
