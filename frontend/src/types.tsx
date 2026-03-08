// 1. Definition para sa Doctors
export interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  email: string;
}

// 2. Definition para sa Patients
export interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string; 
  gender: string;
  contact_number: string;
  email: string;
}

// 3. Definition para sa Appointments
export interface Appointment {
  appointment_id?: number;
  patient: number; // Kinahanglan ID (number) kini para sa Foreign Key
  doctor: number;  // Kinahanglan ID (number) kini para sa Foreign Key
  appointment_date: string;
  status: string;
}