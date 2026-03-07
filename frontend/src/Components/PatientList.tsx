import React, { useEffect, useState } from 'react';
import api from '../api';
import { Patient } from '../types'; // Mao ni ang gi-import gikan sa types.tsx

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('patients/');
      setPatients(response.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const startEditing = (patient: Patient) => {
    setEditingId(patient.patient_id);
    // IMPORTANTE: I-copy ang tibuok object para apil ang email ug contact
    setEditData({ ...patient });
  };

  const handleUpdate = async (id: number) => {
    if (!editData) return;
    try {
      // I-send ang kompleto nga data ngadto sa Django
      await api.put(`patients/${id}/`, editData);
      setEditingId(null);
      fetchPatients();
      alert("Success: Updated successfully!");
    } catch (err: any) {
      // Diri nimo makita sa Console kung ngano nag-error (e.g. 400 Bad Request)
      console.error("Update Error:", err.response?.data);
      alert("Error: Please check the console for details.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Sigurado ka i-delete ni?")) {
      try {
        await api.delete(`patients/${id}/`);
        fetchPatients();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient Management</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.patient_id} className="text-center">
              <td className="border p-2">
                {editingId === p.patient_id ? (
                  <input
                    className="border p-1 w-full"
                    value={editData?.first_name || ''}
                    onChange={(e) => setEditData({ ...editData!, first_name: e.target.value })}
                  />
                ) : (
                  p.first_name
                )}
              </td>
              <td className="border p-2">
                {editingId === p.patient_id ? (
                  <input
                    className="border p-1 w-full"
                    value={editData?.last_name || ''}
                    onChange={(e) => setEditData({ ...editData!, last_name: e.target.value })}
                  />
                ) : (
                  p.last_name
                )}
              </td>
              <td className="border p-2">
                {editingId === p.patient_id ? (
                  <input
                    className="border p-1 w-full"
                    value={editData?.email || ''}
                    onChange={(e) => setEditData({ ...editData!, email: e.target.value })}
                  />
                ) : (
                  p.email
                )}
              </td>
              <td className="border p-2">
                {editingId === p.patient_id ? (
                  <input
                    className="border p-1 w-full"
                    value={editData?.contact_number || ''}
                    onChange={(e) => setEditData({ ...editData!, contact_number: e.target.value })}
                  />
                ) : (
                  p.contact_number
                )}
              </td>
              <td className="border p-2">
                {editingId === p.patient_id ? (
                  <button 
                    onClick={() => handleUpdate(p.patient_id)} 
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    onClick={() => startEditing(p)} 
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(p.patient_id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;