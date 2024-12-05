import React, { useState } from 'react';
import { Patient, Consultation } from '../types/patient';
import { X, Plus, FileText, Activity, Calendar } from 'lucide-react';
import { Tabs } from './Tabs';
import { PatientSummary } from './PatientSummary';
import { ConsultationDetails } from './ConsultationDetails';

interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
  onNewConsultation: () => void;
  onUpdatePatient: (updatedPatient: Patient) => void;
}

export function PatientDetails({ 
  patient, 
  onClose, 
  onNewConsultation,
  onUpdatePatient 
}: PatientDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const tabs = [
    { id: 'details', label: 'Patient Details' },
    { id: 'summary', label: 'Summary' },
  ];

  const handleSaveSummary = (summary: string) => {
    onUpdatePatient({
      ...patient,
      summaryNotes: summary
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 flex justify-between items-start border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-gray-500">Patient ID: {patient.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'details' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p>{patient.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="capitalize">{patient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Blood Type</p>
                      <p>{patient.bloodType || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="capitalize">{patient.status}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-sm text-gray-500">Email:</span>
                      <br />
                      {patient.email}
                    </p>
                    <p>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <br />
                      {patient.phone}
                    </p>
                    <p>
                      <span className="text-sm text-gray-500">Address:</span>
                      <br />
                      {patient.address || 'Not specified'}
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Allergies</p>
                    {patient.allergies && patient.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p>No known allergies</p>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Consultation History</h3>
                    <button
                      onClick={onNewConsultation}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      New Consultation
                    </button>
                  </div>
                  <div className="space-y-4">
                    {patient.consultations.map((consultation) => (
                      <ConsultationCard
                        key={consultation.id}
                        consultation={consultation}
                        onClick={() => setSelectedConsultation(consultation)}
                      />
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">Recent Check-ins</h3>
                  <div className="space-y-4">
                    {patient.checkins.map((checkin) => (
                      <div
                        key={checkin.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium">{checkin.date}</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            Pain Level: {checkin.painLevel}/10
                          </span>
                        </div>
                        <div className="mb-2">
                          {checkin.symptoms.map((symptom, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-gray-200 rounded-full text-sm mr-2 mb-2"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{checkin.notes}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <PatientSummary patient={patient} onSave={handleSaveSummary} />
          )}
        </div>
      </div>

      {selectedConsultation && (
        <ConsultationDetails
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
        />
      )}
    </div>
  );
}

interface ConsultationCardProps {
  consultation: Consultation;
  onClick: () => void;
}

function ConsultationCard({ consultation, onClick }: ConsultationCardProps) {
  return (
    <div 
      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <p className="font-medium">{consultation.date}</p>
        </div>
        <span className="text-sm text-gray-500">{consultation.doctorName}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-start">
          <Activity className="w-4 h-4 mr-2 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Diagnosis</p>
            <p>{consultation.diagnosis}</p>
          </div>
        </div>
        <div className="flex items-start">
          <FileText className="w-4 h-4 mr-2 text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Notes</p>
            <p className="line-clamp-2">{consultation.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}