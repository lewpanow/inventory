from django import forms
from .models import Item  

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description', 'quantity', 'price']

    def __init__(self, *args, **kwargs):
        super(ItemForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': 'form-control'})
        self.fields['description'].widget.attrs.update({'class': 'form-control'})
        self.fields['quantity'].widget.attrs.update({'class': 'form-control'})
        self.fields['price'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': '0.00',
        })

    def clean_price(self):
        price = self.cleaned_data['price']
        if price < 0:
            raise forms.ValidationError("Цена не может быть отрицательной")
        return price

