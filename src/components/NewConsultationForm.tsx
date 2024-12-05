import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewConsultationFormProps {
  patientId: string;
  onClose: () => void;
  onSubmit: (consultation: {
    diagnosis: string;
    treatment: string;
    notes: string;
    doctorName: string;
  }) => void;
}

export function NewConsultationForm({ patientId, onClose, onSubmit }: NewConsultationFormProps) {
  const [formData, setFormData] = useState({
    diagnosis: '',
    treatment: '',
    notes: '',
    doctorName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">New Consultation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Name
            </label>
            <input
              type="text"
              value={formData.doctorName}
              onChange={(e) =>
                setFormData({ ...formData, doctorName: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis
            </label>
            <input
              type="text"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Treatment
            </label>
            <input
              type="text"
              value={formData.treatment}
              onChange={(e) =>
                setFormData({ ...formData, treatment: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}