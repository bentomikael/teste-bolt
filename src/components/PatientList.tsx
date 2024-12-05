import React from 'react';
import { Table } from './Table';
import { Patient } from '../types/patient';
import { Calendar, Phone, Mail, Clock } from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onPatientSelect: (patient: Patient) => void;
}

export function PatientList({ patients, onPatientSelect }: PatientListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Contact</Table.HeaderCell>
            <Table.HeaderCell>Last Visit</Table.HeaderCell>
            <Table.HeaderCell>Next Appointment</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {patients.map((patient) => (
            <Table.Row
              key={patient.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onPatientSelect(patient)}
            >
              <Table.Cell>
                <div className="font-medium">{patient.name}</div>
                <div className="text-sm text-gray-500">{patient.gender}</div>
              </Table.Cell>
              <Table.Cell>{patient.age}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    {patient.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {patient.lastVisit}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {patient.nextAppointment || 'Not scheduled'}
                </div>
              </Table.Cell>
              <Table.Cell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {patient.status}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}