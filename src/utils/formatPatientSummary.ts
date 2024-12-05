import { Patient } from '../types/patient';

export function formatPatientSummary(patient: Patient): string {
  const summary = `
Patient Summary for ${patient.name}
ID: ${patient.id}

Personal Information:
-------------------
Age: ${patient.age}
Gender: ${patient.gender}
Blood Type: ${patient.bloodType || 'Not specified'}
Status: ${patient.status}

Contact Information:
------------------
Email: ${patient.email}
Phone: ${patient.phone}
Address: ${patient.address || 'Not specified'}

Medical Information:
------------------
Allergies: ${patient.allergies?.length ? patient.allergies.join(', ') : 'None reported'}

Consultation History:
-------------------
${patient.consultations
  .map(
    (consultation) => `
Date: ${consultation.date}
Doctor: ${consultation.doctorName}
Diagnosis: ${consultation.diagnosis}
Treatment: ${consultation.treatment}
Notes: ${consultation.notes}
`
  )
  .join('\n')}

Recent Check-ins:
---------------
${
  patient.checkins.length
    ? patient.checkins
        .map(
          (checkin) => `
Date: ${checkin.date}
Pain Level: ${checkin.painLevel}/10
Symptoms: ${checkin.symptoms.join(', ')}
Notes: ${checkin.notes}
`
        )
        .join('\n')
    : 'No recent check-ins'
}
`.trim();

  return summary;
}