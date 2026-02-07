from django.urls import path
from .views import (
    PatientListCreateAPIView, 
    PatientRetrieveUpdateDestroyAPIView,
    DoctorListCreateAPIView,
    AppointmentListCreateAPIView
)

urlpatterns = [
    path('patients/', PatientListCreateAPIView.as_view(), name='patient-list'),
    path('patients/<int:pk>/', PatientRetrieveUpdateDestroyAPIView.as_view(), name='patient-detail'),
    path('doctors/', DoctorListCreateAPIView.as_view(), name='doctor-list'),
    path('appointments/', AppointmentListCreateAPIView.as_view(), name='appointment-list'),
]