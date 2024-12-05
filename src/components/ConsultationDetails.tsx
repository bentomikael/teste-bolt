import React from 'react';
import { X, Calendar, Activity, FileText, Stethoscope } from 'lucide-react';
import { Consultation } from '../types/patient';

interface ConsultationDetailsProps {
  consultation: Consultation;
  onClose: () => void;
}

export function ConsultationDetails({ consultation, onClose }: ConsultationDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 flex justify-between items-start border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Consultation Details</h2>
            <div className="flex items-center mt-2 text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              {consultation.date}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-3">
            <Stethoscope className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Doctor</h3>
              <p className="mt-1">{consultation.doctorName}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Activity className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Diagnosis</h3>
              <p className="mt-1">{consultation.diagnosis}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Treatment</h3>
              <p className="mt-1">{consultation.treatment}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{consultation.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}