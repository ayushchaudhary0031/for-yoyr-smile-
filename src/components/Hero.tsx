import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { CLINIC_INFO } from '../data/clinicData';
import { Shield, ArrowRight, Star, Heart, Verified } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedView } = useClinic();

  const handleBookClick = () => {
    setSelectedView('contact');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleServicesClick = () => {
    setSelectedView('home');
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950 py-12 md:py-20 overflow-hidden transition-colors duration-300" id="clinic-hero-section">
      {/* Abstract Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #00355f 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Copywriting Content */}
        <div className="lg:col-span-7 flex flex-col gap-6" id="hero-marketing-col">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-55 dark:bg-slate-900 text-primary border border-blue-100/50 dark:border-slate-800 px-4 py-2 rounded-full w-fit">
            <Verified className="w-4 h-4 text-secondary fill-secondary/10" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-primary">Multi-Specialty Clinic in Agra</span>
          </div>

          {/* Heading */}
          <h1 className="font-headline-xl text-4xl md:text-5xl lg:text-[56px] lg:leading-[64px] font-extrabold tracking-tight text-primary leading-tight">
            Expert Dental Care <br />
            <span className="text-secondary">for Your Family</span>
          </h1>

          {/* Body description */}
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
            Trust <strong>Dr. Sushma Pratihar ({CLINIC_INFO.doctors[0].degree})</strong> for all your dental needs in Agra. Experience modern, pain-free treatments in a state-of-the-art facility designed for your premium comfort.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              id="hero-book-appointment"
              onClick={handleBookClick}
              className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-150 active:scale-95 shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-our-services"
              onClick={handleServicesClick}
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary/5 dark:hover:bg-primary/10 px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-150 active:scale-95 flex items-center justify-center text-primary dark:text-primary"
            >
              Our Services
            </button>
          </div>

          {/* Multi-Avatar Reviews Bar */}
          <div className="flex items-center gap-5 mt-4 pt-6 border-t border-gray-100 dark:border-slate-800">
            <div className="flex -space-x-3.5">
              <img 
                alt="Patient Female" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0CVj0lvYIAkSz68z75VdbN4bEHIPT7EGvBAUthJ7YKqjNGygzBrGDi9DOscettyspw8HJokWVLBak3Jk67p6Bgxd9fnfI0sNa_VFVYfUClyXdc4hW3wFhsRhn3XTj9sNJ3ZRTPZHFNM1PS-XlihIq5Xd02qdUdSsQaNhBrQ8KMMP6zUFGigwla6kBxidYApsxP-DW3HqYoZrbjc6FsKK9lEbpT57m-gBVvZE2Zq2PXLV3AwjG6rV79_1eD-rcvkb0NkTG1PMZ7iA"
              />
              <img 
                alt="Patient Male" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHlL4qPR11dEStavHq12CGn1D2PosSDWxwJ3XptDtCQUBSZZCKgRf9F9yhQCzXM_9pexzdgUBn_Y4eKHOa8nBUd1arWADpZ0kGa-MJQV4c2lHepFy10OqaORSywC3UKJLNUVB2V6W2jYwnfcyHn2IqMZbKVMQ-azApxG9OZFH72T8QM-1dqJgzjcK77UVF-0VDRDIi51h2NGAghhfLZsFqqVgK9GwDOUku0MAqKtva6Gztb-mGSY5gMRLaRMzRVcML2jUcMe7aF9Y"
              />
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-white font-bold text-xs">
                +1k
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center text-amber-500 gap-0.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <Star className="w-4 h-4 fill-amber-500/50 text-amber-500" />
              </div>
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-1">3.9/5 based on 10 Google Reviews</span>
            </div>
          </div>

        </div>

        {/* Right Side: Immersive Bento Box Operatory Image */}
        <div className="lg:col-span-5 relative w-full h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100/30" id="hero-bento-visual">
          <img 
            alt="Warm and Welcoming Modern Dental Clinic Lobby" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover select-none" 
            src="/src/assets/images/welcoming_clinic_lobby_1780080195345.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent animate-pulse-slow" />
          
          {/* Floating Consultant Badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-slate-800/85 shadow-xl flex items-center gap-4 transition-all hover:scale-[1.02]">
            <div className="bg-teal-50 dark:bg-teal-950/40 p-3 rounded-xl text-secondary">
              <Heart className="w-6 h-6 fill-secondary/20" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-primary">{CLINIC_INFO.doctors[0].name}</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold">{CLINIC_INFO.doctors[0].role}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
