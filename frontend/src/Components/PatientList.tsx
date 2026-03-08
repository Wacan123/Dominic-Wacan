import React, { useEffect, useState } from 'react';
import { getPatients, createPatient, updatePatient, deletePatient } from '../api';
import { Patient } from '../types';

const PatientList: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [formData, setFormData] = useState({ 
        first_name: '', last_name: '', date_of_birth: '', 
        gender: 'Male', contact_number: '', email: '' 
    });
    const [editId, setEditId] = useState<number | null>(null);

    const load = async () => { const res = await getPatients(); setPatients(res.data); };
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editId) await updatePatient(editId, formData);
            else await createPatient(formData);
            setFormData({ first_name: '', last_name: '', date_of_birth: '', gender: 'Male', contact_number: '', email: '' });
            setEditId(null);
            load();
        } catch (err) { alert("Error saving patient. Make sure all fields are valid."); }
    };

    return (
        <div className="p-6 bg-white rounded shadow-sm mt-4 border-t-4 border-green-600">
            <h2 className="text-xl font-bold mb-4 text-green-700">Patient Registry</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 p-4 bg-green-50 rounded">
                <input placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="border p-2 rounded" required />
                <input placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="border p-2 rounded" required />
                <input type="date" value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} className="border p-2 rounded" required />
                <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="border p-2 rounded">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input placeholder="Contact #" value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} className="border p-2 rounded" required />
                <input placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border p-2 rounded" required />
                <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 col-span-full">
                    {editId ? 'Update Patient' : 'Register Patient'}
                </button>
            </form>
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-100"><tr><th className="p-2">Name</th><th className="p-2">Gender</th><th className="p-2">Contact</th><th className="p-2">Actions</th></tr></thead>
                <tbody>{patients.map(p => (
                    <tr key={p.patient_id} className="border-b">
                        <td className="p-2">{p.first_name} {p.last_name}</td>
                        <td className="p-2">{p.gender}</td>
                        <td className="p-2">{p.contact_number}</td>
                        <td className="p-2">
                            <button onClick={() => {setEditId(p.patient_id); setFormData(p);}} className="text-blue-600 mr-3">Edit</button>
                            <button onClick={async () => { if(window.confirm("Delete?")) { await deletePatient(p.patient_id); load(); } }} className="text-red-600">Delete</button>
                        </td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
};
export default PatientList;