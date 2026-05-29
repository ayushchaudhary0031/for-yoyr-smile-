import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, EmailNotification } from '../types';

interface ClinicContextType {
  appointments: Appointment[];
  notifications: EmailNotification[];
  selectedView: string;
  setSelectedView: (view: string) => void;
  bookAppointment: (data: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => Appointment;
  cancelAppointment: (id: string) => void;
  clearNotifications: () => void;
  markNotificationsAsRead: () => void;
  latestNotification: EmailNotification | null;
  setLatestNotification: (notif: EmailNotification | null) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  timeLeftToReset: string;
  triggerManualReset: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [selectedView, setSelectedView] = useState<string>('home');
  const [latestNotification, setLatestNotification] = useState<EmailNotification | null>(null);
  const [timeLeftToReset, setTimeLeftToReset] = useState<string>('24h 00m');
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('suryadental_darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('suryadental_darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Helper to load default state
  const loadDefaultData = () => {
    const sampleAppt: Appointment = {
      id: 'SD-1049',
      fullName: 'Ram Avtar Sharma',
      email: 'ramavtar@gmail.com',
      phoneNumber: '0987654321',
      service: 'Dental Procedures',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days later
      time: '11:00 AM',
      message: 'Regular cleanup consult.',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    setAppointments([sampleAppt]);
    localStorage.setItem('suryadental_appointments', JSON.stringify([sampleAppt]));

    const sampleNotif: EmailNotification = {
      id: 'notif-1049',
      sender: 'ayushchaudjary2001@gmail.com',
      recipient: 'ramavtar@gmail.com',
      subject: '🦷 Confirmed: Appointment at Surya Dental Speciality Clinic',
      body: `
        <p>Dear <strong>Ram Avtar Sharma</strong>,</p>
        <p>Your appointment has been successfully scheduled and confirmed at <strong>Surya Dental Speciality Clinic</strong>.</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Service:</strong> Dental Procedures (Cleaning/Fillings)</p>
          <p style="margin: 4px 0;"><strong>Date:</strong> ${new Date(Date.now() + 86400000 * 2).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p style="margin: 4px 0;"><strong>Time:</strong> 11:00 AM</p>
          <p style="margin: 4px 0;"><strong>Consultant:</strong> Dr. Sushma Pratihar (MDS)</p>
          <p style="margin: 4px 0;"><strong>Location:</strong> Bodla Rd, Shahganj, Agra, UP</p>
        </div>
        <p>Should you need to reschedule or cancel, you can do so directly via the Appointments tab on our website, or call our customer line at <strong>084395 41999</strong>.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="font-size: 11px; color: #94a3b8; font-style: italic;">This automated email was triggered securely by the Surya Dental scheduling portal, linked from official address: <strong style="color: #0f4c81;">ayushchaudjary2001@gmail.com</strong>.</p>
      `,
      sentAt: new Date().toISOString(),
      read: false,
      appointmentId: 'SD-1049'
    };
    setNotifications([sampleNotif]);
    localStorage.setItem('suryadental_notifications', JSON.stringify([sampleNotif]));
  };

  const checkAndApplyReset = () => {
    const now = Date.now();
    const storedReset = localStorage.getItem('suryadental_last_reset');
    
    let lastReset = now;
    if (storedReset) {
      lastReset = Number(storedReset);
    } else {
      localStorage.setItem('suryadental_last_reset', String(now));
    }

    const diff = now - lastReset;
    const interval = 24 * 60 * 60 * 1000; // 24 hours

    if (diff >= interval) {
      localStorage.removeItem('suryadental_appointments');
      localStorage.removeItem('suryadental_notifications');
      localStorage.setItem('suryadental_last_reset', String(now));
      console.log('24 hours passed! System appointments and notifications auto-reset is executed.');
      return true; // reset occurred
    }
    return false; // reset not needed
  };

  const triggerManualReset = () => {
    localStorage.removeItem('suryadental_appointments');
    localStorage.removeItem('suryadental_notifications');
    const now = Date.now();
    localStorage.setItem('suryadental_last_reset', String(now));
    loadDefaultData();
  };

  // Load from localStorage & check 24h reset
  useEffect(() => {
    const wasReset = checkAndApplyReset();

    const storedAppts = localStorage.getItem('suryadental_appointments');
    const storedNotifs = localStorage.getItem('suryadental_notifications');

    if (storedAppts && !wasReset) {
      setAppointments(JSON.parse(storedAppts));
    } else {
      loadDefaultData();
    }

    if (storedNotifs && !wasReset) {
      setNotifications(JSON.parse(storedNotifs));
    }
  }, []);

  // Periodic timer for the auto-reset countdown
  useEffect(() => {
    const updateCountdown = () => {
      const storedReset = localStorage.getItem('suryadental_last_reset');
      if (!storedReset) return;

      const lastReset = Number(storedReset);
      const nextReset = lastReset + 24 * 60 * 60 * 1000;
      const now = Date.now();
      const diff = nextReset - now;

      if (diff <= 0) {
        // Reset triggered in real-time
        localStorage.removeItem('suryadental_appointments');
        localStorage.removeItem('suryadental_notifications');
        localStorage.setItem('suryadental_last_reset', String(now));
        loadDefaultData();
        setTimeLeftToReset('24h 00m 00s');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeftToReset(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Save appointments
  const saveAppointments = (newAppts: Appointment[]) => {
    setAppointments(newAppts);
    localStorage.setItem('suryadental_appointments', JSON.stringify(newAppts));
  };

  // Save notifications
  const saveNotifications = (newNotifs: EmailNotification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem('suryadental_notifications', JSON.stringify(newNotifs));
  };

  // Generate automated check mail notification
  const generateNotification = (appt: Appointment, type: 'book' | 'cancel' | 'admin_alert'): EmailNotification => {
    const notifId = `notif-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Date(appt.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let subject = '';
    let body = '';

    if (type === 'book') {
      subject = `🦷 Confirmed: Appointment at Surya Dental Speciality Clinic`;
      body = `
        <p>Dear <strong>${appt.fullName}</strong>,</p>
        <p>Your appointment has been successfully scheduled and confirmed at <strong>Surya Dental Speciality Clinic</strong>.</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Appointment ID:</strong> ${appt.id}</p>
          <p style="margin: 4px 0;"><strong>Service:</strong> ${appt.service}</p>
          <p style="margin: 4px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 4px 0;"><strong>Time:</strong> ${appt.time}</p>
          <p style="margin: 4px 0;"><strong>Consultant:</strong> Dr. Sushma Pratihar (MDS)</p>
          <p style="margin: 4px 0;"><strong>Location:</strong> Bodla Rd, Shahganj, Agra, UP</p>
        </div>
        <p>We look forward to giving you an exceptional treatment. If you need any assistance, please connect with us!</p>
        <p>Should you need to reschedule or cancel, you can do so directly via the Appointments tab on our website, or call our customer line at <strong>084395 41999</strong>.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="font-size: 11px; color: #94a3b8; font-style: italic;">This automated confirmation notification has been dispatched to <strong>${appt.email}</strong> by the booking server registered to clinic administrator <strong style="color: #0f4c81;">ayushchaudjary2001@gmail.com</strong>.</p>
      `;
    } else if (type === 'admin_alert') {
      subject = `🔔 New Booking Alert: Appointment Scheduled by ${appt.fullName}`;
      body = `
        <p>Dear <strong>Dr. Sushma Pratihar & Admin Panel</strong>,</p>
        <p>This is a direct real-time notification alert. A new appointment has been successfully registered and secured in the system.</p>
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0; color: #166534;"><strong>Patient Name:</strong> ${appt.fullName}</p>
          <p style="margin: 4px 0; color: #166534;"><strong>Contact Number:</strong> ${appt.phoneNumber}</p>
          <p style="margin: 4px 0; color: #166534;"><strong>Email Address:</strong> ${appt.email}</p>
          <p style="margin: 4px 0; color: #166534;"><strong>Service Required:</strong> ${appt.service}</p>
          <p style="margin: 4px 0; color: #166534;"><strong>Preferred Date:</strong> ${formattedDate}</p>
          <p style="margin: 4px 0; color: #166534;"><strong>Preferred Time Slot:</strong> ${appt.time}</p>
          <p style="margin: 4px 0; color: #166534;"><strong>Message/Notes:</strong> ${appt.message || 'No additional notes provided'}</p>
          <p style="margin: 4px 0; color: #166534;"><strong>Appointment Reservation ID:</strong> ${appt.id}</p>
        </div>
        <p>Please review current operations and update dental diagnostic materials if necessary.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="font-size: 11px; color: #94a3b8; font-style: italic;">This secure notification has been dispatched directly to administrative inbox <strong style="color: #0f4c81;">ayushchaudjary2001@gmail.com</strong> upon successful system registration.</p>
      `;
    } else {
      subject = `🚫 Cancelled: Appointment at Surya Dental Speciality Clinic`;
      body = `
        <p>Dear <strong>${appt.fullName}</strong>,</p>
        <p>We confirm that your dental appointment has been successfully <strong>CANCELLED</strong> in our system upon your request.</p>
        <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0; color: #991b1b;"><strong>Appointment ID:</strong> ${appt.id}</p>
          <p style="margin: 4px 0; color: #991b1b;"><strong>Service:</strong> ${appt.service}</p>
          <p style="margin: 4px 0; color: #991b1b;"><strong>Date was scheduled:</strong> ${formattedDate} at ${appt.time}</p>
        </div>
        <p>If you cancelled this by mistake, or would like to schedule a new visit, you can browse services and request a slot anytime on our portal.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="font-size: 11px; color: #94a3b8; font-style: italic;">This automated status update notification was securely dispatched to <strong>${appt.email}</strong> by the clinic administration server of <strong style="color: #0f4c81;">ayushchaudjary2001@gmail.com</strong>.</p>
      `;
    }

    return {
      id: notifId,
      sender: 'ayushchaudjary2001@gmail.com',
      recipient: type === 'admin_alert' ? 'ayushchaudjary2001@gmail.com' : appt.email,
      subject,
      body,
      sentAt: new Date().toISOString(),
      read: false,
      appointmentId: appt.id
    };
  };

  // Async helper to trigger actual server-side SMTP email dispatch via NodeMailer API
  const sendRealEmail = async (to: string, subject: string, html: string) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, html }),
      });
      const data = await response.json();
      console.log('SMTP dispatch server result:', data);
      return data;
    } catch (err) {
      console.error('SMTP dispatch transmission error:', err);
      return { success: false, error: err };
    }
  };

  const bookAppointment = (data: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
    const newId = `SD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppt: Appointment = {
      ...data,
      id: newId,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updatedAppts = [newAppt, ...appointments];
    saveAppointments(updatedAppts);

    // Generate confirmation notification which is stored and triggers popup message!
    const notif = generateNotification(newAppt, 'book');
    const adminAlertNotif = generateNotification(newAppt, 'admin_alert');
    
    // Save both the patient template and administrative direct alert notification
    const updatedNotifs = [adminAlertNotif, notif, ...notifications];
    saveNotifications(updatedNotifs);

    // Set as latest notification to prompt a slide-up/slide-in screen alert!
    setLatestNotification(adminAlertNotif);

    // Trigger secure SMTP mailing in background sequentially to avoid socket locks/concurrency issues!
    (async () => {
      console.log('Sending real-time SMTP alert to clinical admin: ayushchaudjary2001@gmail.com');
      await sendRealEmail('ayushchaudjary2001@gmail.com', adminAlertNotif.subject, adminAlertNotif.body);
      
      console.log(`Sending automated booking receipt to client: ${newAppt.email}`);
      await sendRealEmail(newAppt.email, notif.subject, notif.body);
    })();

    return newAppt;
  };

  const cancelAppointment = (id: string) => {
    const updatedAppts = appointments.map(appt => {
      if (appt.id === id) {
        return { ...appt, status: 'cancelled' as const };
      }
      return appt;
    });
    saveAppointments(updatedAppts);

    const cancelledAppt = appointments.find(appt => appt.id === id);
    if (cancelledAppt) {
      const notif = generateNotification({ ...cancelledAppt, status: 'cancelled' }, 'cancel');
      const updatedNotifs = [notif, ...notifications];
      saveNotifications(updatedNotifs);
      setLatestNotification(notif);

      // Trigger secure SMTP mailing for cancellation notice sequentially in background
      (async () => {
        console.log(`Sending cancellation notice to client: ${cancelledAppt.email}`);
        await sendRealEmail(cancelledAppt.email, notif.subject, notif.body);
        
        console.log('Sending cancellation notice to admin...');
        const adminCancelSubject = `🚫 Appointment Cancelled: ID ${cancelledAppt.id} - ${cancelledAppt.fullName}`;
        await sendRealEmail('ayushchaudjary2001@gmail.com', adminCancelSubject, notif.body);
      })();
    }
  };

  const clearNotifications = () => {
    saveNotifications([]);
    setLatestNotification(null);
  };

  const markNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  return (
    <ClinicContext.Provider value={{
      appointments,
      notifications,
      selectedView,
      setSelectedView,
      bookAppointment,
      cancelAppointment,
      clearNotifications,
      markNotificationsAsRead,
      latestNotification,
      setLatestNotification,
      darkMode,
      toggleDarkMode,
      timeLeftToReset,
      triggerManualReset
    }}>
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
