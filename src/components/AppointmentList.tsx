import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { Calendar, Clock, User, Phone, Mail, FileText, Check, AlertTriangle, ShieldAlert } from 'lucide-react';

export const AppointmentList: React.FC = () => {
  const { appointments, cancelAppointment, timeLeftToReset, triggerManualReset } = useClinic();
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');

  const filteredAppts = appointments.filter(appt => {
    if (filter === 'all') return true;
    return appt.status === filter;
  });

  const handleCancel = (id: string, name: string) => {
    cancelAppointment(id);
  };

  const parseDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-outline-variant/30 dark:border-slate-800 shadow-lg" id="appointment-manager-panel">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary dark:text-white text-2xl">Clinic Appointment Manager</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-100 dark:border-rose-900/30">
              ⏱️ Auto-resets in: <span className="font-mono text-[11px] font-extrabold select-all">{timeLeftToReset}</span>
            </span>
            <button
              id="btn-manual-reset"
              onClick={triggerManualReset}
              className="text-[10px] uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-extrabold px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-750 transition active:scale-95"
              title="Reset data to default immediately for testing"
            >
              Reset Data Now
            </button>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-gray-400 mt-2">Review and cancel registrations securely stored in local storage.</p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-950/60 p-1.5 rounded-lg border border-gray-200 dark:border-slate-800 w-fit">
          <button
            id="filter-tab-all"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-800 text-primary dark:text-white shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-slate-350'}`}
          >
            All ({appointments.length})
          </button>
          <button
            id="filter-tab-confirmed"
            onClick={() => setFilter('confirmed')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'confirmed' ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-slate-350'}`}
          >
            Confirmed ({appointments.filter(a => a.status === 'confirmed').length})
          </button>
          <button
            id="filter-tab-cancelled"
            onClick={() => setFilter('cancelled')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'cancelled' ? 'bg-white dark:bg-slate-800 text-red-700 dark:text-red-400 shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-slate-350'}`}
          >
            Cancelled ({appointments.filter(a => a.status === 'cancelled').length})
          </button>
        </div>
      </div>

      {filteredAppts.length === 0 ? (
        <div className="text-center p-12 bg-slate-50 dark:bg-slate-950/30 border border-gray-100 dark:border-slate-800 rounded-xl" id="empty-manager-state">
          <ShieldAlert className="w-12 h-12 text-gray-300 dark:text-slate-700 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-700 dark:text-slate-350">No appointments found matching this status</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Book an appointment or adjust filters above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4" id="appointments-cards-grid">
          {filteredAppts.map((appt) => (
            <div
              key={appt.id}
              id={`appointment-card-${appt.id}`}
              className={`border p-5 rounded-xl transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                appt.status === 'confirmed'
                  ? 'border-emerald-150 dark:border-emerald-900/30 bg-emerald-50/10 dark:bg-emerald-950/10 hover:shadow-md'
                  : 'border-red-150 dark:border-red-900/30 bg-red-50/10 dark:bg-red-950/10 opacity-75'
              }`}
            >
              <div className="flex-1 space-y-3">
                {/* ID & Status */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-slate-800 px-2.5 py-1 rounded font-mono border border-blue-100 dark:border-slate-700">
                    ID: {appt.id}
                  </span>
                  {appt.status === 'confirmed' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      <Check className="w-3 h-3 mr-1" /> Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Cancelled
                    </span>
                  )}
                </div>

                {/* Patient details & Doctor info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-xs text-gray-700 dark:text-gray-305">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary dark:text-primary shrink-0" />
                    <span><strong>Name:</strong> {appt.fullName}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-primary dark:text-primary shrink-0" />
                    <span><strong>Contact:</strong> {appt.phoneNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary dark:text-primary shrink-0" />
                    <span className="truncate"><strong>Email:</strong> {appt.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-secondary shrink-0" />
                    <span><strong>Date:</strong> {parseDate(appt.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-secondary shrink-0" />
                    <span><strong>Time:</strong> {appt.time}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span><strong>Service:</strong> {appt.service}</span>
                  </div>
                </div>

                {/* Extra comments */}
                {appt.message && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-slate-950 p-2 rounded border border-gray-100 dark:border-slate-800 italic">
                    &ldquo;{appt.message}&rdquo;
                  </p>
                )}
              </div>

              {/* Action columns */}
              <div className="flex flex-col shrink-0 justify-center min-w-[150px]">
                {appt.status === 'confirmed' ? (
                  <button
                    id={`btn-cancel-appt-${appt.id}`}
                    onClick={() => handleCancel(appt.id, appt.fullName)}
                    className="w-full bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900 py-2 px-4 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    Cancel Slot
                  </button>
                ) : (
                  <div className="text-center bg-red-100/50 dark:bg-red-950/20 p-2.5 rounded-lg border border-red-100 dark:border-red-900/40">
                    <p className="text-[10px] text-red-800 dark:text-red-400 leading-normal font-sans">
                      Cancellation notification dispatched via <strong className="block text-primary dark:text-primary">ayushchaudjary2001@gmail.com</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
