import { Service, Testimonial } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'procedures',
    title: 'Dental Procedures',
    description: 'Comprehensive restorative and preventive care for optimal oral health including cleaning, fillings, root canals, and scaling.',
    icon: 'Stethoscope',
    category: 'standard',
  },
  {
    id: 'pediatric',
    title: "Children's Dental Care",
    description: 'Gentle, specialized pediatric dentistry to ensure healthy miles and comfortable dental foundation from a young age.',
    icon: 'Baby',
    category: 'pediatric',
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: 'Immediate attention for dental trauma, severe sudden pain, broken teeth, and urgent oral issues. Available for urgent walks.',
    icon: 'Activity',
    category: 'emergency',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Advanced aesthetic procedures including professional whitening, custom veneers, and total smile makeovers to boost your self-confidence.',
    icon: 'Sparkles',
    category: 'cosmetic',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'State-of-the-art restorative solutions for missing teeth with highly durable, natural-looking permanent results.',
    icon: 'ShieldCheckbox',
    category: 'standard',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'RAM AVTAR SHARMA',
    initials: 'RS',
    rating: 5,
    text: 'Excellent Doctor. Services are the best, well managed and clean clinic. High professionalism!',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'KRISHNA GOPAL KULSHRESHTHA',
    initials: 'KK',
    rating: 5,
    text: 'Taking treatment for 11 years... very satisfied. Consult for children also. A family clinic you can trust entirely.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'GAURAV GUPTA',
    initials: 'GG',
    rating: 5,
    text: 'Dr. Aseem and Dr. Rishika are so supportive... highly professional. They explain every procedure clearly before starting.',
    verified: true,
  },
];

export const CLINIC_INFO = {
  name: 'Surya Dental Speciality Clinic',
  address: 'Bodla Rd, Agra, UP',
  phone: '084395 41999',
  hours: 'Open until 8 PM (9 AM - 8 PM)',
  doctors: [
    {
      name: 'Dr. Sushma Pratihar',
      degree: 'MDS',
      role: 'Chief Dental Surgeon & Senior Consultant',
      bio: 'Trusted expert for all your dental needs in Agra. Experiencing modern, pain-free treatments in a state-of-the-art facility designed for your comfort.',
    },
    {
      name: 'Dr. Aseem',
      degree: 'BDS',
      role: 'Consultant Orthodontist',
    },
    {
      name: 'Dr. Rishika',
      degree: 'MDS',
      role: 'Pedodontist (Child Specialist)',
    }
  ]
};

export const AVAILABLE_TIME_SLOTS = [
  '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM',
  '12:30 PM', '01:15 PM', '03:00 PM', '03:45 PM',
  '04:30 PM', '05:15 PM', '06:00 PM', '06:45 PM', '07:30 PM'
];
