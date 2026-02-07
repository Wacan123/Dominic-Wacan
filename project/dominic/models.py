from django.db import models
class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()

    def str(self):
        return f"{self.first_name} {self.last_name}"

class Appointment (models.Model):
    appointment_id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20)

    def str(self):
        return f"Appointment for {self.patient} with Dr. {self.doctor} on {self.appointment_date}"

class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    first_name = models .CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    email = models.EmailField()

    def str(self):
        return f"Dr. {self.first_name} {self.last_name} - {self.specialization}"
