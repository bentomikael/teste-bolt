import React, { useState } from 'react';
import { Patient } from './types/patient';
import { mockPatients } from './data/mockPatients';
import { DashboardStats } from './components/DashboardStats';
import { PatientList } from './components/PatientList';
import { PatientDetails } from './components/PatientDetails';
import { NewConsultationForm } from './components/NewConsultationForm';
import { Search, Plus } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNewConsultation, setShowNewConsultation] = useState(false);
  const [patients, setPatients] = useState(mockPatients);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewConsultation = (consultationData: {
    diagnosis: string;
    treatment: string;
    notes: string;
    doctorName: string;
  }) => {
    if (selectedPatient) {
      const newConsultation = {
        id: `c${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...consultationData,
      };

      const updatedPatients = patients.map((patient) =>
        patient.id === selectedPatient.id
          ? {
              ...patient,
              consultations: [newConsultation, ...patient.consultations],
              lastVisit: newConsultation.date,
            }
          : patient
      );

      setPatients(updatedPatients);
      setSelectedPatient(
        updatedPatients.find((p) => p.id === selectedPatient.id) || null
      );
      setShowNewConsultation(false);
    }
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    const updatedPatients = patients.map((patient) =>
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
    setPatients(updatedPatients);
    setSelectedPatient(updatedPatient);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Add Patient
          </button>
        </div>

        <DashboardStats />

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <PatientList
          patients={filteredPatients}
          onPatientSelect={setSelectedPatient}
        />

        {selectedPatient && (
          <PatientDetails
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
            onNewConsultation={() => setShowNewConsultation(true)}
            onUpdatePatient={handleUpdatePatient}
          />
        )}

        {showNewConsultation && selectedPatient && (
          <NewConsultationForm
            patientId={selectedPatient.id}
            onClose={() => setShowNewConsultation(false)}
            onSubmit={handleNewConsultation}
          />
        )}
      </div>
    </div>
  );
}

export default App;