import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { SERVICES } from '../data/clinicData';
import { Stethoscope, Baby, Activity, Sparkles, ShieldCheck, HeartPulse, ArrowRight } from 'lucide-react';

// Help map icon string to Lucide component
const getIconComponent = (iconName: string, category: string) => {
  const iconProps = { className: `w-6 h-6 ${category === 'emergency' ? 'text-red-600' : 'text-secondary'}` };
  switch (iconName) {
    case 'Stethoscope':
      return <Stethoscope {...iconProps} />;
    case 'Baby':
      return <Baby {...iconProps} />;
    case 'Activity':
      return <Activity {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'ShieldCheckbox':
    default:
      return <ShieldCheck {...iconProps} />;
  }
};

export const Services: React.FC = () => {
  const { setSelectedView } = useClinic();

  const handleServiceClick = () => {
    setSelectedView('contact');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors" id="services-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-headline-xl text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Specialized dental treatments delivered with clinical precision, advanced equipment, and comfortable empathetic care in Agra.
          </p>
        </div>

        {/* Bento/Grid Layout exactly like Mockup 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-cards-grid">
          
          {SERVICES.map((srv, index) => {
            const isLarge = srv.id === 'cosmetic'; // Cosmetic takes 2 columns width on lg screen in Mockup 2!
            const isEmergency = srv.category === 'emergency';

            return (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                onClick={handleServiceClick}
                className={`group p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isLarge ? 'lg:col-span-2' : ''
                } ${
                  isEmergency
                    ? 'border-red-100 dark:border-red-900/40 bg-red-50/10 dark:bg-red-950/10 hover:bg-red-50/20 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-800 hover:shadow-red-50/50'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50/10 dark:bg-slate-900/20 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 hover:border-blue-100 dark:hover:border-slate-700'
                } hover:-translate-y-1 hover:shadow-xl`}
              >
                <div>
                  {/* Icon Frame */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                    isEmergency ? 'bg-red-50 dark:bg-red-950/40 text-red-600' : 'bg-blue-50 dark:bg-slate-800 text-secondary'
                  }`}>
                    {getIconComponent(srv.icon, srv.category)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-3 group-hover:text-secondary transition-colors">
                    {srv.title}
                  </h3>

                  {/* Text */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Micro Action Button */}
                <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 group-hover:text-primary transition-colors">
                  <span>Schedule Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
