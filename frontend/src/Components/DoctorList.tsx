import React, { useEffect, useState } from 'react';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../api';
import { Doctor } from '../types';

const DoctorList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [formData, setFormData] = useState({ first_name: '', last_name: '', specialization: '', email: '' });
    const [editId, setEditId] = useState<number | null>(null);

    const load = async () => { const res = await getDoctors(); setDoctors(res.data); };
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editId) await updateDoctor(editId, formData);
            else await createDoctor(formData);
            setFormData({ first_name: '', last_name: '', specialization: '', email: '' });
            setEditId(null);
            load();
        } catch (err) { alert("Error saving doctor."); }
    };

    return (
        <div className="p-6 bg-white rounded shadow-sm mt-4 border-t-4 border-blue-600">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Medical Staff (Doctors)</h2>
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6 p-4 bg-blue-50 rounded">
                <input placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="border p-2 flex-1 min-w-[150px]" required />
                <input placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="border p-2 flex-1 min-w-[150px]" required />
                <input placeholder="Specialization" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} className="border p-2 flex-1 min-w-[150px]" required />
                <input placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border p-2 flex-1 min-w-[150px]" required />
                <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700">
                    {editId ? 'Update' : 'Add Doctor'}
                </button>
            </form>
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-100"><tr><th className="p-2">Doctor Name</th><th className="p-2">Specialization</th><th className="p-2">Actions</th></tr></thead>
                <tbody>{doctors.map(d => (
                    <tr key={d.doctor_id} className="border-b">
                        <td className="p-2">Dr. {d.first_name} {d.last_name}</td>
                        <td className="p-2">{d.specialization}</td>
                        <td className="p-2 text-right">
                            <button onClick={() => {setEditId(d.doctor_id); setFormData(d);}} className="text-blue-600 mr-3">Edit</button>
                            <button onClick={async () => { if(window.confirm("Remove?")) { await deleteDoctor(d.doctor_id); load(); } }} className="text-red-600">Remove</button>
                        </td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
};
export default DoctorList;