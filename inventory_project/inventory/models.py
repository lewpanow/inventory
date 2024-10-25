# inventory/models.py

from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название товара') 
    description = models.TextField(verbose_name='Описание товара')          
    quantity = models.IntegerField(default=0, verbose_name='Количество товара на складе')  
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена товара')  

    def __str__(self):
        return self.name

class Supply(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE) 
    quantity = models.IntegerField()  
    supply_date = models.DateTimeField()   

    def __str__(self):
        return f'Supply of {self.item.name} on {self.supply_date}'

class Shipment(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE) 
    quantity = models.IntegerField()  
    shipment_date = models.DateTimeField()  

    def __str__(self):
        return f'Shipment of {self.item.name} on {self.shipment_date}'

