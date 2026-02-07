
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Patient, Appointment, Doctor
from .serializer import PatientSerializer, AppointmentSerializer, DoctorSerializer

class PatientListCreateAPIView(ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorListCreateAPIView(ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AppointmentListCreateAPIView(ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer