export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface EmailNotification {
  id: string;
  sender: 'ayushchaudjary2001@gmail.com';
  recipient: string;
  subject: string;
  body: string;
  sentAt: string;
  read: boolean;
  appointmentId: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'standard' | 'emergency' | 'cosmetic' | 'pediatric';
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  verified: boolean;
}
