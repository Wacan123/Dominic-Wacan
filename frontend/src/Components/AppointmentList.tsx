import React, { useEffect, useState } from 'react';
import api from '../api';

const AppointmentList = () => {
  // Siguroha nga husto ang spelling sa 'setAppointments'
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  
  const [selectedPat, setSelectedPat] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [appDate, setAppDate] = useState('');

  const fetchData = async () => {
    try {
      const [resApp, resPat, resDoc] = await Promise.all([
        api.get('appointments/'), api.get('patients/'), api.get('doctors/')
      ]);
      setAppointments(resApp.data); // Spelling fix
      setPatients(resPat.data);
      setDoctors(resDoc.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Kinahanglan ipadala ang IDs para sa foreign keys
      await api.post('appointments/', { 
        patient: selectedPat, 
        doctor: selectedDoc, 
        appointment_date: appDate, 
        status: 'Pending' 
      });
      fetchData();
    } catch (err: any) { console.error("Add Appointment Error:", err.response?.data); }
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSchedule} className="flex flex-wrap gap-2 bg-gray-100 p-4 rounded">
        <select className="border p-2 rounded" value={selectedPat} onChange={e => setSelectedPat(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p.patient_id} value={p.patient_id}>{p.first_name} {p.last_name}</option>)}
        </select>
        <select className="border p-2 rounded" value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d.doctor_id} value={d.doctor_id}>Dr. {d.last_name}</option>)}
        </select>
        <input className="border p-2 rounded" type="datetime-local" value={appDate} onChange={e => setAppDate(e.target.value)} required />
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded">Schedule</button>
      </form>
      <table className="min-w-full bg-white border">
        <thead><tr className="bg-gray-50"><th>ID</th><th>Schedule</th><th>Status</th></tr></thead>
        <tbody>
          {appointments.map((a: any) => (
            <tr key={a.appointment_id} className="border-b">
              <td className="p-2">#{a.appointment_id}</td>
              <td className="p-2">{new Date(a.appointment_date).toLocaleString()}</td>
              <td className="p-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;