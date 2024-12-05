import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Patient } from '../types/patient';
import { formatPatientSummary } from '../utils/formatPatientSummary';

interface PatientSummaryProps {
  patient: Patient;
  onSave: (summary: string) => void;
}

export function PatientSummary({ patient, onSave }: PatientSummaryProps) {
  const [summary, setSummary] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  
  useEffect(() => {
    setSummary(formatPatientSummary(patient));
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
    setHasChanges(e.target.value !== formatPatientSummary(patient));
  };

  const handleSave = () => {
    onSave(summary);
    setHasChanges(false);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg relative">
      {hasChanges && (
        <div className="absolute top-0 left-0 right-0 bg-yellow-50 p-3 rounded-t-lg border-b border-yellow-100 flex items-center justify-between">
          <span className="text-yellow-800 text-sm">
            You have unsaved changes in the summary
          </span>
        </div>
      )}
      <textarea
        className="w-full h-[60vh] font-mono text-sm bg-white p-4 rounded border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={summary}
        onChange={handleChange}
      />
      {hasChanges && (
        <div className="absolute bottom-8 right-8">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-lg"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}