import json
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

try:
    from rest_framework.decorators import api_view, permission_classes
    from rest_framework.permissions import AllowAny
    from rest_framework.response import Response
    from rest_framework import status
    HAS_DRF = True
except ImportError:
    HAS_DRF = False

from .models import UserProfile

if HAS_DRF:
    @api_view(['POST'])
    @permission_classes([AllowAny])
    def login_view(request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        profile, created = UserProfile.objects.get_or_create(
            email=email,
            defaults={
                'name': email.split('@')[0].capitalize(),
                'role': 'customer',
                'phone': '+91 98765 43210',
                'address': '102 Green Park, Sector 4, New Delhi',
            }
        )
        
        return Response({
            'token': f'demo-jwt-token-{int(time.time())}',
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': profile.role,
                'phone': profile.phone,
                'address': profile.address,
                'subscription': profile.subscription,
            }
        })

    @api_view(['POST'])
    @permission_classes([AllowAny])
    def admin_login_view(request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        
        profile, created = UserProfile.objects.get_or_create(
            email=email,
            defaults={
                'name': 'DailyMitra Admin',
                'role': 'admin',
                'phone': '+91 98765 00000',
                'address': 'DailyMitra HQ, Indiranagar, Bengaluru',
            }
        )
        profile.role = 'admin'
        profile.save()
        
        return Response({
            'token': f'demo-jwt-admin-token-{int(time.time())}',
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': 'admin',
                'phone': profile.phone,
                'address': profile.address,
            }
        })

    @api_view(['POST'])
    @permission_classes([AllowAny])
    def register_view(request):
        name = request.data.get('name', 'New Customer')
        email = request.data.get('email')
        password = request.data.get('password')
        phone = request.data.get('phone', '')
        address = request.data.get('address', '')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        profile, created = UserProfile.objects.update_or_create(
            email=email,
            defaults={
                'name': name,
                'role': 'customer',
                'phone': phone,
                'address': address,
            }
        )
        
        return Response({
            'token': f'demo-jwt-token-{int(time.time())}',
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': profile.role,
                'phone': profile.phone,
                'address': profile.address,
            }
        }, status=status.HTTP_201_CREATED)

    @api_view(['GET', 'PUT', 'PATCH'])
    @permission_classes([AllowAny])
    def profile_view(request):
        email = request.data.get('email') or request.query_params.get('email') or 'customer@dailymitra.com'
        profile, _ = UserProfile.objects.get_or_create(
            email=email,
            defaults={'name': 'Rahul Sharma', 'role': 'customer', 'phone': '+91 98765 43210'}
        )
        if request.method in ['PUT', 'PATCH']:
            if 'name' in request.data: profile.name = request.data['name']
            if 'phone' in request.data: profile.phone = request.data['phone']
            if 'address' in request.data: profile.address = request.data['address']
            if 'subscription' in request.data: profile.subscription = request.data['subscription']
            profile.save()

        return Response({
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': profile.role,
                'phone': profile.phone,
                'address': profile.address,
                'subscription': profile.subscription,
            }
        })
else:
    @csrf_exempt
    def login_view(request):
        if request.method != 'POST':
            return JsonResponse({'error': 'Method not allowed'}, status=405)
        data = json.loads(request.body or '{}')
        email = data.get('email', '')
        profile, created = UserProfile.objects.get_or_create(
            email=email,
            defaults={
                'name': email.split('@')[0].capitalize() if email else 'Customer',
                'role': 'customer',
                'phone': '+91 98765 43210',
                'address': '102 Green Park, Sector 4, New Delhi',
            }
        )
        return JsonResponse({
            'token': f'demo-jwt-token-{int(time.time())}',
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': profile.role,
                'phone': profile.phone,
                'address': profile.address,
            }
        })

    @csrf_exempt
    def admin_login_view(request):
        if request.method != 'POST':
            return JsonResponse({'error': 'Method not allowed'}, status=405)
        data = json.loads(request.body or '{}')
        email = data.get('email', '')
        profile, created = UserProfile.objects.get_or_create(
            email=email,
            defaults={
                'name': 'DailyMitra Admin',
                'role': 'admin',
                'phone': '+91 98765 00000',
                'address': 'DailyMitra HQ, Indiranagar, Bengaluru',
            }
        )
        profile.role = 'admin'
        profile.save()
        return JsonResponse({
            'token': f'demo-jwt-admin-token-{int(time.time())}',
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': 'admin',
                'phone': profile.phone,
                'address': profile.address,
            }
        })

    @csrf_exempt
    def register_view(request):
        if request.method != 'POST':
            return JsonResponse({'error': 'Method not allowed'}, status=405)
        data = json.loads(request.body or '{}')
        name = data.get('name', 'New Customer')
        email = data.get('email', '')
        phone = data.get('phone', '')
        address = data.get('address', '')
        profile, created = UserProfile.objects.update_or_create(
            email=email,
            defaults={'name': name, 'role': 'customer', 'phone': phone, 'address': address}
        )
        return JsonResponse({
            'token': f'demo-jwt-token-{int(time.time())}',
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': profile.role,
                'phone': profile.phone,
                'address': profile.address,
            }
        }, status=201)

    @csrf_exempt
    def profile_view(request):
        data = json.loads(request.body or '{}') if request.method in ['PUT', 'PATCH'] else {}
        email = data.get('email') or request.GET.get('email') or 'customer@dailymitra.com'
        profile, _ = UserProfile.objects.get_or_create(
            email=email,
            defaults={'name': 'Rahul Sharma', 'role': 'customer', 'phone': '+91 98765 43210'}
        )
        if request.method in ['PUT', 'PATCH']:
            if 'name' in data: profile.name = data['name']
            if 'phone' in data: profile.phone = data['phone']
            if 'address' in data: profile.address = data['address']
            if 'subscription' in data: profile.subscription = data['subscription']
            profile.save()

        return JsonResponse({
            'user': {
                'id': profile.id,
                'name': profile.name,
                'email': profile.email,
                'role': profile.role,
                'phone': profile.phone,
                'address': profile.address,
                'subscription': profile.subscription,
            }
        })