import React from 'react';
// Gidugangan og 'import' keyword sa sugod ug saktong path sa Components folder
import PatientList from './Components/PatientList'; 
import DoctorList from './Components/DoctorList';
import AppointmentList from './Components/AppointmentList';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header sa Imong System */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-blue-800 tracking-tight">
          Hospital Management System
        </h1>
        <p className="text-gray-500 mt-2">Welcome, Admin Dominic</p>
      </header>
      
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section para sa Appointments */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Scheduled Appointments</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              + New Appointment
            </button>
          </div>
          <AppointmentList />
        </section>

        {/* Section para sa Doctors */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
            Medical Staff (Doctors)
          </h2>
          <DoctorList />
        </section>

        {/* Section para sa Patients */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-l-4 border-green-500 pl-3">
            Patient Registry
          </h2>
          <PatientList />
        </section>
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>&copy; 2026 Hospital System - Developed by Dominic</p>
      </footer>
    </div>
  );
}

export default App;