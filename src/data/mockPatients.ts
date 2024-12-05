import { Patient } from '../types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    gender: 'male',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    lastVisit: '2024-03-10',
    nextAppointment: '2024-03-25',
    status: 'active',
    address: '123 Main St, Anytown, USA',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    consultations: [
      {
        id: 'c1',
        date: '2024-03-10',
        diagnosis: 'Seasonal Allergies',
        treatment: 'Prescribed antihistamines',
        notes: 'Patient reported improved symptoms after previous treatment',
        doctorName: 'Dr. Smith'
      },
      {
        id: 'c2',
        date: '2024-02-15',
        diagnosis: 'Upper Respiratory Infection',
        treatment: 'Rest and fluids recommended',
        notes: 'Follow up in 2 weeks if symptoms persist',
        doctorName: 'Dr. Johnson'
      }
    ],
    checkins: [
      {
        id: 'ch1',
        date: '2024-03-15',
        symptoms: ['Headache', 'Fatigue'],
        painLevel: 3,
        notes: 'Symptoms mild but persistent'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    gender: 'female',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    lastVisit: '2024-03-15',
    nextAppointment: '2024-03-28',
    status: 'active',
    address: '456 Oak Ave, Somewhere, USA',
    bloodType: 'A+',
    allergies: [],
    consultations: [
      {
        id: 'c3',
        date: '2024-03-15',
        diagnosis: 'Annual Check-up',
        treatment: 'No treatment needed',
        notes: 'All vitals normal',
        doctorName: 'Dr. Wilson'
      }
    ],
    checkins: []
  }
];