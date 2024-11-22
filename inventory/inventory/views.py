# inventory/views.py
from rest_framework import viewsets
from .models import Item, Supply, Shipment
from .serializers import ItemSerializer, SupplySerializer, ShipmentSerializer
from django.shortcuts import render, redirect 
from .models import Item
from .forms import ItemForm 
from django.shortcuts import get_object_or_404

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.all()
    serializer_class = SupplySerializer

class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer

def home_view(request):
    return render(request, 'home.html') 

def item_list(request):
    price_min = request.GET.get('price_min')
    price_max = request.GET.get('price_max')
    description = request.GET.get('description')

    items = Item.objects.all()

    if price_min:
        items = items.filter(price__gte=price_min)
    if price_max:
        items = items.filter(price__lte=price_max)
    if description:
        items = items.filter(description__icontains=description)

    return render(request, 'item_list.html', {'items': items})
    
def add_item(request):
    if request.method == 'POST':
        form = ItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('item_list') 
    else:
        form = ItemForm()
    return render(request, 'add_item.html', {'form': form})
    
def contact_view(request):
    return render(request, 'contact.html')

def delete_item(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    if request.method == 'POST':
        item.delete()
        return redirect('item_list')  
    return render(request, 'delete_item_confirm.html', {'item': item})
    
def edit_item(request, id):
    item = get_object_or_404(Item, id=id)
    if request.method == 'POST':
        form = ItemForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
            return redirect('item_list') 
    else:
        form = ItemForm(instance=item)
    return render(request, 'edit_item.html', {'form': form, 'item': item})

def item_list(request):
    price_min = request.GET.get('price_min')
    price_max = request.GET.get('price_max')
    description = request.GET.get('description')

    items = Item.objects.all()

    if price_min:
        items = items.filter(price__gte=price_min)
    if price_max:
        items = items.filter(price__lte=price_max)
    if description:
        items = items.filter(description__icontains=description)

    return render(request, 'item_list.html', {'items': items})