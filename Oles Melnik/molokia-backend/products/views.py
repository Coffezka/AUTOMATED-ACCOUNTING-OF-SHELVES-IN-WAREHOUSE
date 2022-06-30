from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from products.models import Product, State, StateProduct
from products.serializers import ProductSerializer, StateSerializer, StateProductSerializer, StateProductCreateSerializer

@api_view(['GET', 'POST'])
def product_list(request, format=None):
    """
    List all code product, or create a new product.
    """
    if request.method == 'GET':
        products = Product.objects.all()
        product = ProductSerializer(products, many=True)
        return Response(product.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status_HTTP_404_BAD_REQUEST)

@api_view(['GET', 'POST'])
def state_products(request, format=None):
    """
    List all products from state, or add a new product.
    """
    if request.method == 'GET':
        state = State.objects.all()[0]
        productState = StateProduct.objects.filter(state=state)
        stat = StateProductSerializer(productState, many=True)
        print(stat)

        # return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(stat.data)

    elif request.method == 'POST':
        serializer = StateProductCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("success", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status_HTTP_404_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def label_detail(request, pk, format=None):
#     """
#     Retrieve, update or delete a code label.
#     """
#     try:
#         label = Label.objects.get(pk=pk)
#     except Label.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = LabelSerializer(label)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = LabelSerializer(label, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         label.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)