from django.contrib import admin

# Register your models here.
from .models import Product, State, StateProduct
admin.site.register(Product)
admin.site.register(State)
admin.site.register(StateProduct)
