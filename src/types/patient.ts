export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string | null;
  status: 'active' | 'inactive';
  address?: string;
  bloodType?: string;
  allergies?: string[];
  consultations: Consultation[];
  checkins: Checkin[];
  summaryNotes?: string;
}

export interface Consultation {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  doctorName: string;
}

export interface Checkin {
  id: string;
  date: string;
  symptoms: string[];
  painLevel: number;
  notes: string;
}