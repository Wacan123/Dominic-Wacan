from rest_framework import serializers
from .models import Patient, Appointment, Doctor

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'contact_number', 'email']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['doctor_id', 'first_name', 'last_name', 'specialization', 'email']

class AppointmentSerializer(serializers.ModelSerializer):
    # Kini mo-allow og write (POST) gamit ang ID number
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())

    class Meta:
        model = Appointment
        fields = ['appointment_id', 'patient', 'doctor', 'appointment_date', 'status']

    # Kini para makita ang kompleto nga detalye inig view (GET)
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['patient'] = PatientSerializer(instance.patient).data
        representation['doctor'] = DoctorSerializer(instance.doctor).data
        return representation