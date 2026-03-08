import React, { useEffect, useState } from 'react';
import { getAppointments, getPatients, getDoctors, createAppointment } from '../api';
import { Appointment, Patient, Doctor } from '../types';

const AppointmentList: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [formData, setFormData] = useState({ 
        patient: '', 
        doctor: '', 
        appointment_date: '', 
        status: 'Scheduled' 
    });

    const loadData = async () => {
        try {
            const [appRes, patRes, docRes] = await Promise.all([
                getAppointments(), getPatients(), getDoctors()
            ]);
            setAppointments(appRes.data);
            setPatients(patRes.data);
            setDoctors(docRes.data);
        } catch (err) { console.error("Loading error:", err); }
    };

    useEffect(() => { loadData(); }, []);

    const handleSchedule = async () => {
        if (!formData.patient || !formData.doctor || !formData.appointment_date) {
            alert("Palihog pilia ang tanan fields!");
            return;
        }
        try {
            const payload = {
                ...formData,
                patient: Number(formData.patient),
                doctor: Number(formData.doctor)
            };
            await createAppointment(payload as any);
            alert("Appointment Scheduled!");
            setFormData({ patient: '', doctor: '', appointment_date: '', status: 'Scheduled' });
            loadData();
        } catch (err) { alert("Error scheduling. Check your IDs."); }
    };

    return (
        <div className="p-6 bg-white rounded shadow border-t-4 border-indigo-600">
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Scheduled Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6 p-4 bg-indigo-50 rounded">
                <select value={formData.patient} onChange={e => setFormData({...formData, patient: e.target.value})} className="border p-2 rounded">
                    <option value="">Select Patient</option>
                    {patients.map(p => <option key={p.patient_id} value={p.patient_id}>{p.last_name}, {p.first_name}</option>)}
                </select>
                <select value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})} className="border p-2 rounded">
                    <option value="">Select Doctor</option>
                    {doctors.map(d => <option key={d.doctor_id} value={d.doctor_id}>Dr. {d.last_name}</option>)}
                </select>
                <input type="datetime-local" value={formData.appointment_date} onChange={e => setFormData({...formData, appointment_date: e.target.value})} className="border p-2 rounded" />
                <button onClick={handleSchedule} className="bg-indigo-600 text-white font-bold px-4 py-2 rounded">Schedule</button>
            </div>

            <table className="w-full text-left text-sm">
                <thead className="bg-gray-100">
                    <tr><th className="p-2">Patient</th><th className="p-2">Doctor</th><th className="p-2">Date</th><th className="p-2">Status</th></tr>
                </thead>
                <tbody>
                    {appointments.map((a: any) => (
                        <tr key={a.appointment_id} className="border-b">
                            <td className="p-2">
                                {typeof a.patient === 'object' ? `${a.patient.first_name} ${a.patient.last_name}` : 'N/A'}
                            </td>
                            <td className="p-2">
                                {typeof a.doctor === 'object' ? `Dr. ${a.doctor.last_name}` : 'N/A'}
                            </td>
                            <td className="p-2">{new Date(a.appointment_date).toLocaleString()}</td>
                            <td className="p-2 text-green-600 font-bold">{a.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AppointmentList;