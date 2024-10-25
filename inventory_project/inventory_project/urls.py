"""
URL configuration for inventory_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path
from inventory.views import item_list, add_item, contact_view, home_view, item_list 
from inventory.views import ItemViewSet, SupplyViewSet, ShipmentViewSet  
from inventory import views

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'supplies', SupplyViewSet)
router.register(r'shipments', ShipmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('items/', item_list, name='item_list'),
    path('add-item/', add_item, name='add_item'),
    path('items/delete/<int:item_id>/', views.delete_item, name='delete_item'),
    path('items/<int:id>/edit/', views.edit_item, name='edit_item'),
    path('contact/', contact_view, name='contact'),
    path('', home_view, name='home'),
]


