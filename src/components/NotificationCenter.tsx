import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { EmailNotification } from '../types';
import { HTMLContent } from './HTMLContent';
import { Bell, Mail, X, CheckCircle, Trash2, ArrowLeft, MailOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationCenter: React.FC = () => {
  const {
    notifications,
    markNotificationsAsRead,
    clearNotifications,
    latestNotification,
    setLatestNotification
  } = useClinic();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<EmailNotification | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpen = () => {
    setIsOpen(true);
    markNotificationsAsRead();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNotif(null);
  };

  const selectNotification = (n: EmailNotification) => {
    setSelectedNotif(n);
  };

  return (
    <div className="relative id-notification-center" id="notification-center-widget">
      {/* Trigger Button */}
      <button
        id="btn-notification-bell"
        onClick={handleOpen}
        className="relative p-2 text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container rounded-full transition-colors focus:outline-none"
        title="Check system notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Floating Real-Time Slide-In Alert Banner (triggers when booking is made) */}
      <AnimatePresence>
        {latestNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-4 z-50 max-w-sm md:max-w-md bg-white border border-blue-100 rounded-xl shadow-2xl p-4 overflow-hidden"
            id="real-time-mail-alert"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-800 tracking-wider uppercase">Automated Server Email Sent</span>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">From: {latestNotification.sender}</p>
                </div>
              </div>
              <button
                _id="btn-close-latest"
                onClick={() => setLatestNotification(null)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{latestNotification.subject}</h4>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                Delivered securely to {latestNotification.recipient}. Check notification inbox to expand.
              </p>
            </div>
            <div className="mt-3 flex justify-end space-x-2">
              <button
                id="btn-view-delivered-email"
                onClick={() => {
                  setLatestNotification(null);
                  setIsOpen(true);
                  setSelectedNotif(latestNotification);
                }}
                className="text-xs font-semibold text-primary hover:text-blue-800 transition-colors"
              >
                View Delivered Template
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Center Tray (Sidebar Modal) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
              onClick={handleClose}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l dark:border-slate-800"
              id="notification-panel-overlay"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-primary dark:bg-slate-950 text-white">
                <div className="flex items-center space-x-2">
                  <MailOpen className="w-5 h-5 text-secondary-container" />
                  <div>
                    <h3 className="text-lg font-bold">Mail Delivery Dispatch</h3>
                    <p className="text-[11px] text-blue-200 dark:text-slate-400">System confirmations by ayushchaudjary2001@gmail.com</p>
                  </div>
                </div>
                <button
                  id="btn-close-notif-panel"
                  onClick={handleClose}
                  className="p-1 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Inner Body */}
              <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900">
                {selectedNotif ? (
                  /* Expanded Mail View */
                  <div className="p-6 bg-white dark:bg-slate-950 animate-fade-in h-full overflow-y-auto" id="expanded-mail-preview">
                    {/* Back Navigation */}
                    <button
                      id="btn-back-to-mails"
                      onClick={() => setSelectedNotif(null)}
                      className="inline-flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to Mail Dispatch
                    </button>

                    {/* Email Chrome Frame */}
                    <div className="border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-slate-950">
                      {/* Email Headers Info */}
                      <div className="bg-gray-50 dark:bg-slate-900/60 p-4 border-b border-gray-100 dark:border-slate-800/80">
                        <div className="grid grid-cols-[60px_1fr] gap-y-1.5 text-xs text-gray-600 dark:text-gray-400 font-sans">
                          <span className="font-semibold text-gray-400">From:</span>
                          <span className="text-primary dark:text-blue-400 font-bold">
                            Surya Dental &lt;<span className="underline select-all text-secondary">ayushchaudjary2001@gmail.com</span>&gt;
                          </span>

                          <span className="font-semibold text-gray-400">To:</span>
                          <span className="text-gray-900 dark:text-gray-200 font-medium">{selectedNotif.recipient}</span>

                          <span className="font-semibold text-gray-400">Subject:</span>
                          <span className="text-gray-900 dark:text-white font-bold">{selectedNotif.subject}</span>

                          <span className="font-semibold text-gray-400">Date:</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {new Date(selectedNotif.sentAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })} (via Automated SMTP)
                          </span>
                        </div>
                      </div>

                      {/* Email Body Panel */}
                      <div className="p-6 text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-sans bg-white dark:bg-slate-950">
                        <HTMLContent content={selectedNotif.body} />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mail Queue List */
                  <div className="p-4 flex flex-col h-full bg-slate-50 dark:bg-slate-900/30">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        AUTOMATED EMAIL LOGS ({notifications.length})
                      </span>
                      {notifications.length > 0 && (
                        <button
                          id="btn-clear-emails"
                          onClick={clearNotifications}
                          className="inline-flex items-center text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Purge Logs
                        </button>
                      )}
                    </div>

                    {notifications.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-950/60 rounded-xl border border-gray-200 dark:border-slate-800 mt-2">
                        <Mail className="w-12 h-12 text-gray-300 dark:text-slate-700 mb-3" />
                        <h4 className="text-sm font-bold text-gray-800 dark:text-white">No confirmations dispatched yet</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
                          Request an appointment using the form below. A notification will automatically route from admin <strong className="text-primary">ayushchaudjary2001@gmail.com</strong>.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            id={`mail-item-${notif.id}`}
                            onClick={() => selectNotification(notif)}
                            className="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/40 border border-gray-100 dark:border-slate-800/60 hover:border-gray-200 dark:hover:border-slate-800 p-4 rounded-xl shadow-sm cursor-pointer transition-all flex items-start space-x-3 group"
                          >
                            <div className="bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 p-2.5 rounded-full mt-0.5 group-hover:bg-blue-100 dark:group-hover:bg-slate-700 transition-colors">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-secondary dark:text-rose-400 truncate">
                                  ayushchaudjary2001@gmail.com
                                </span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                                  {new Date(notif.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-gray-900 dark:text-slate-100 mt-1 truncate font-sans">
                                {notif.subject}
                              </h4>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                Sent to {notif.recipient}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}


                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
