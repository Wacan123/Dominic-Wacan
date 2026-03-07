export interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  email: string;
}

export interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  contact_number: string;
  email: string;
}

export interface Appointment {
  appointment_id?: number;
  patient: number; 
  doctor: number; 
  appointment_date: string;
  status: string;
}