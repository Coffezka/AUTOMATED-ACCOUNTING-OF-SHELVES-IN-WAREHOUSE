from rest_framework import serializers
from products.models import Product, State, StateProduct

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class StateSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = State
        fields = '__all__'

class StateProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(required=False, read_only=True)
    
    class Meta:
        model = StateProduct
        fields = '__all__'

    # def create(self, validated_data):
    #     print("validated data data data data :", validated_data)

class StateProductCreateSerializer(serializers.Serializer):
    products = serializers.ListField(child=serializers.IntegerField())
    amount = serializers.ListField(child=serializers.IntegerField())

    def create(self, validated_data):
        print(validated_data)
        StateProduct.objects.all().delete()
        s = None
        for index, id in enumerate(validated_data['products']):
            product = Product.objects.get(pk=id)
            state = State.objects.get(pk=2)
            s = StateProduct.objects.create(product=product, state=state, amount=validated_data['amount'][index])
        return s
