from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from labels.models import Label
from labels.serializers import LabelSerializer

@api_view(['GET', 'POST'])
def label_list(request, format=None):
    """
    List all code label, or create a new label.
    """
    if request.method == 'GET':
        labels = Label.objects.all()
        label = LabelSerializer(labels, many=True)
        return Response(label.data)

    elif request.method == 'POST':
        serializer = LabelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status_HTTP_404_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def label_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code label.
    """
    try:
        label = Label.objects.get(pk=pk)
    except Label.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LabelSerializer(label)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = LabelSerializer(label, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        label.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)