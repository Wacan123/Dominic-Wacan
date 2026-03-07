import React, { useEffect, useState } from 'react';
import api from '../api';

const DoctorList = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [spec, setSpec] = useState('');
  const [email, setEmail] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const fetchDoctors = () => {
    api.get('doctors/').then((res: any) => setDoctors(res.data));
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('doctors/', { 
        first_name: fName, 
        last_name: lName, 
        specialization: spec, 
        email: email 
      });
      setFName(''); setLName(''); setSpec(''); setEmail('');
      fetchDoctors();
    } catch (err: any) { console.error("Add Error:", err.response?.data); }
  };

  const handleUpdate = async (id: number) => {
    try {
      // Kinahanglan ipadala ang tanang fields para dili mag-400 error
      await api.put(`doctors/${id}/`, editData);
      setEditingId(null);
      fetchDoctors();
    } catch (err: any) { console.error("Update Error:", err.response?.data); }
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleAdd} className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-blue-50 p-4 rounded">
        <input className="border p-2 rounded" placeholder="First Name" value={fName} onChange={e => setFName(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Last Name" value={lName} onChange={e => setLName(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Spec" value={spec} onChange={e => setSpec(e.target.value)} required />
        <input className="border p-2 rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white rounded">Add Doctor</button>
      </form>
      <table className="min-w-full bg-white border rounded">
        <thead className="bg-gray-100"><tr><th>Name</th><th>Spec</th><th>Actions</th></tr></thead>
        <tbody>
          {doctors.map((d: any) => (
            <tr key={d.doctor_id} className="border-b">
              {editingId === d.doctor_id ? (
                <>
                  <td><input className="border p-1 w-full" value={editData.first_name} onChange={e => setEditData({...editData, first_name: e.target.value})} /></td>
                  <td><input className="border p-1 w-full" value={editData.specialization} onChange={e => setEditData({...editData, specialization: e.target.value})} /></td>
                  <td className="p-2"><button onClick={() => handleUpdate(d.doctor_id)} className="text-green-600">Save</button></td>
                </>
              ) : (
                <>
                  <td className="p-2">Dr. {d.first_name} {d.last_name}</td>
                  <td className="p-2">{d.specialization}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => { setEditingId(d.doctor_id); setEditData(d); }} className="text-blue-600">Edit</button>
                    <button onClick={() => api.delete(`doctors/${d.doctor_id}/`).then(fetchDoctors)} className="text-red-600">Remove</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;