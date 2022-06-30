from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class State(models.Model):
    products = models.ManyToManyField(Product, through='StateProduct')

    # def __str__(self):
    #     return self.products.name

class StateProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    amount = models.IntegerField()