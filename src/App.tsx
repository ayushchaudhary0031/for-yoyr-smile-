import React from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutStats } from './components/AboutStats';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { ClinicLocation } from './components/ClinicLocation';
import { AppointmentList } from './components/AppointmentList';
import { Footer } from './components/Footer';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

const InnerLayout: React.FC = () => {
  const { selectedView, setSelectedView } = useClinic();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300 pt-24 select-none selection:bg-primary/10">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow">
        

        {/* Dynamic Switch View Screen or Full Landing view */}
        {selectedView === 'appointments' ? (
          /* Dedicated Appointments Management panel screen */
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <button
                id="btn-back-to-home"
                onClick={() => setSelectedView('home')}
                className="text-xs font-extrabold text-primary hover:underline"
              >
                ← Back to Clinic Homepage
              </button>
            </div>
            <AppointmentList />
          </div>
        ) : (
          /* Complete Landing Experience */
          <div>
            {/* Hero Banner Section */}
            <div id="home">
              <Hero />
            </div>

            {/* Quick Experience / Testimonial stats banner */}
            <AboutStats />

            {/* Services offerings grid */}
            <div id="services">
              <Services />
            </div>

            {/* Reviews Carousel/List */}
            <div id="about">
              <Testimonials />
            </div>

            {/* Address & Booking Form section */}
            <ClinicLocation />
          </div>
        )}

      </main>

      {/* Corporate footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <ClinicProvider>
      <InnerLayout />
    </ClinicProvider>
  );
}
