import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { SERVICES, AVAILABLE_TIME_SLOTS } from '../data/clinicData';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';

export const AppointmentForm: React.FC = () => {
  const { bookAppointment, setSelectedView } = useClinic();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('Dental Procedures');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:30 AM');
  const [message, setMessage] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedApptId, setBookedApptId] = useState('');
  const [bookedEmail, setBookedEmail] = useState('');

  // Setting standard modern default dates (starting tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phoneNumber || !date) {
      alert('Please fill out all required fields');
      return;
    }

    setBookedEmail(email);

    const appt = bookAppointment({
      fullName,
      email,
      phoneNumber,
      service,
      date,
      time,
      message: message || undefined
    });

    setBookedApptId(appt.id);
    setIsSuccess(true);

    // Reset fields
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setDate('');
    setMessage('');
  };

  if (isSuccess) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-blue-150 dark:border-slate-800 shadow-xl text-center flex flex-col items-center justify-center animate-fade-in" id="appointment-form-success">
        <div className="bg-teal-50 dark:bg-teal-950/40 text-secondary p-4 rounded-full mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h3 className="font-headline-md text-headline-md text-primary dark:text-white mb-2 text-2xl">Appointment Scheduled!</h3>
        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 font-mono tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded border border-gray-100 dark:border-slate-700 mb-4 inline-block">
          RESERVATION ID: {bookedApptId}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
          Your dental treatment reservation has been successfully booked. 
          <br /><br />
          An automated confirmation notification has been dispatched to your provided inbox: <strong className="text-secondary">{bookedEmail || 'your email'}</strong>.
          <br /><br />
          Additionally, a direct notification email of your booking details was dispatched to clinic administrator:
          <strong className="block text-primary dark:text-white mt-1.5 underline select-all font-mono text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 py-1 rounded">
            ayushchaudjary2001@gmail.com
          </strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            id="btn-form-view-appt-mgr"
            onClick={() => {
              setIsSuccess(false);
              setSelectedView('appointments');
            }}
            className="flex-1 bg-primary hover:bg-primary-container text-white py-3 rounded-lg font-bold text-sm transition-all shadow"
          >
            Manage Appointments
          </button>
          <button
            id="btn-form-book-another"
            onClick={() => setIsSuccess(false)}
            className="flex-1 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 py-3 rounded-lg font-bold text-sm transition-all"
          >
            New Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-outline-variant/30 dark:border-slate-800 shadow-lg" id="appointment-booking-form-panel">
      <h3 className="font-headline-md text-headline-md text-primary dark:text-white mb-2 text-2xl">Connect with us</h3>
      <p className="font-body-md text-body-md text-on-surface-variant dark:text-gray-400 mb-6">secure your dental session slots today.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
            <User className="w-3.5 h-3.5 mr-2 text-secondary" />
            Full Name <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="input-fullname"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. John Doe"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-secondary focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-colors"
          />
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
              <Mail className="w-3.5 h-3.5 mr-2 text-secondary" />
              Email Address <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="input-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@gmail.com"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-secondary focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
              <Phone className="w-3.5 h-3.5 mr-2 text-secondary" />
              Phone Number <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="input-phone"
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-secondary focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-colors"
            />
          </div>
        </div>

        {/* Date and Time slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Appointment Date */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-2 text-secondary" />
              Preferred Date <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="input-appt-date"
              type="date"
              required
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-secondary focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-colors"
            />
          </div>

          {/* Time slot selection */}
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-2 text-secondary" />
              Preferred Time Slot <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="input-appt-time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-secondary focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-colors"
            >
              {AVAILABLE_TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot} className="dark:bg-slate-900 dark:text-white">{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Service selection */}
        <div>
          <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
            <FileText className="w-3.5 h-3.5 mr-2 text-secondary" />
            Service Required <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="input-appt-service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-secondary focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-colors"
          >
            {SERVICES.map((srv) => (
              <option key={srv.id} value={srv.title} className="dark:bg-slate-900 dark:text-white">{srv.title}</option>
            ))}
          </select>
        </div>

        {/* Message / Comments */}
        <div>
          <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
            <FileText className="w-3.5 h-3.5 mr-2 text-secondary" />
            Message (Optional)
          </label>
          <textarea
            id="input-appt-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly describe your dental concern..."
            rows={3}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-secondary focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-colors"
          ></textarea>
        </div>

        {/* Notifications notice */}
        <div className="bg-blue-50/70 dark:bg-slate-950/40 p-3.5 rounded-lg border border-blue-100 dark:border-slate-800/80 flex items-start gap-2.5 text-xs text-blue-800 dark:text-blue-300 leading-normal">
          <Clock className="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
          <div>
            <p>
              <strong>Automated Notifications Enabled</strong>: Secure email receipts are dispatched automatically from administrative proxy <strong className="font-mono text-[11px] underline">ayushchaudjary2001@gmail.com</strong>.
            </p>
          </div>
        </div>

        {/* Request button */}
        <button
          id="btn-submit-appointment"
          type="submit"
          className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-xl font-bold tracking-wider uppercase transition-all duration-150 active:scale-95 shadow-md flex items-center justify-center gap-2"
        >
          Request Appointment
        </button>
      </form>
    </div>
  );
};
