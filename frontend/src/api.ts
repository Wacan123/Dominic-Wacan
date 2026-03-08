import axios from 'axios';
import { Patient, Doctor, Appointment } from './types'; 

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
});

// Patient CRUD
export const getPatients = () => api.get<Patient[]>("patients/");
export const createPatient = (data: any) => api.post<Patient>("patients/", data);
export const updatePatient = (id: number, data: any) => api.put<Patient>(`patients/${id}/`, data);
export const deletePatient = (id: number) => api.delete(`patients/${id}/`);

// Doctor CRUD
export const getDoctors = () => api.get<Doctor[]>("doctors/");
export const createDoctor = (data: any) => api.post<Doctor>("doctors/", data);
export const updateDoctor = (id: number, data: any) => api.put<Doctor>(`doctors/${id}/`, data);
export const deleteDoctor = (id: number) => api.delete(`doctors/${id}/`);

// Appointment CRUD
export const getAppointments = () => api.get<Appointment[]>("appointments/");
export const createAppointment = (data: any) => api.post<Appointment>("appointments/", data);
export const deleteAppointment = (id: number) => api.delete(`appointments/${id}/`);

export default api;