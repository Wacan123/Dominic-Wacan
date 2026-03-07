from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('dominic.urls')), # Kini ang mag-connect sa imong dominic app
]