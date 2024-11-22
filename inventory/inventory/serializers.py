from rest_framework import serializers
from .models import Item, Supply, Shipment

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__' 
class SupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Supply
        fields = '__all__'  

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = '__all__'  

