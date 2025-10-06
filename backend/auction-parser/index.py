import json
from typing import Dict, Any, List
from datetime import datetime
import random

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Парсит автомобили с японских, корейских и китайских аукционов
    Args: event - dict с httpMethod, queryStringParameters (country filter)
          context - объект с request_id
    Returns: JSON список автомобилей с аукционов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters') or {}
    country_filter = params.get('country', 'all')
    body_type_filter = params.get('bodyType', 'all')
    min_price = int(params.get('minPrice', 0))
    max_price = int(params.get('maxPrice', 999999999))
    min_year = int(params.get('minYear', 1900))
    max_year = int(params.get('maxYear', 2100))
    min_mileage = int(params.get('minMileage', 0))
    max_mileage = int(params.get('maxMileage', 999999999))
    transmission_filter = params.get('transmission', 'all')
    fuel_type_filter = params.get('fuelType', 'all')
    
    japan_cars = [
        {
            'id': 'jp-001',
            'name': 'Toyota Land Cruiser 300',
            'year': 2024,
            'price': 95000,
            'country': 'japan',
            'engine': '3.5L V6',
            'transmission': 'Автомат',
            'mileage': 2000,
            'auction': 'USS Tokyo',
            'auctionDate': '2024-10-15',
            'grade': '4.5',
            'color': 'Белый перламутр',
            'vin': 'JT***********1234',
            'bodyType': 'SUV',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
                'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
            ]
        },
        {
            'id': 'jp-002',
            'name': 'Lexus LX 600',
            'year': 2023,
            'price': 120000,
            'country': 'japan',
            'engine': '3.5L V6 Twin-Turbo',
            'transmission': 'Автомат',
            'mileage': 3000,
            'auction': 'USS Tokyo',
            'auctionDate': '2024-10-18',
            'grade': '4.0',
            'color': 'Черный',
            'vin': 'JT***********5678',
            'bodyType': 'SUV',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
                'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800'
            ]
        },
        {
            'id': 'jp-003',
            'name': 'Toyota Alphard Executive Lounge',
            'year': 2023,
            'price': 72000,
            'country': 'japan',
            'engine': '2.5L Hybrid',
            'transmission': 'Автомат',
            'mileage': 8000,
            'auction': 'JAA',
            'auctionDate': '2024-10-20',
            'grade': '4.5',
            'color': 'Серебристый',
            'vin': 'JT***********9012',
            'bodyType': 'Минивэн',
            'fuelType': 'Гибрид',
            'photos': [
                'https://images.unsplash.com/photo-1664574654529-b60630f33fdb?w=800',
                'https://images.unsplash.com/photo-1600705722660-c7a5ab609d5f?w=800'
            ]
        },
        {
            'id': 'jp-004',
            'name': 'Nissan GT-R Premium',
            'year': 2022,
            'price': 98000,
            'country': 'japan',
            'engine': '3.8L V6 Twin-Turbo',
            'transmission': 'Автомат',
            'mileage': 5000,
            'auction': 'USS Yokohama',
            'auctionDate': '2024-10-22',
            'grade': '4.0',
            'color': 'Синий металлик',
            'vin': 'JN***********3456',
            'bodyType': 'Купе',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800',
                'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800'
            ]
        },
        {
            'id': 'jp-005',
            'name': 'Toyota Crown',
            'year': 2024,
            'price': 68000,
            'country': 'japan',
            'engine': '2.5L Hybrid',
            'transmission': 'Автомат',
            'mileage': 1500,
            'auction': 'TAA',
            'auctionDate': '2024-10-17',
            'grade': '5.0',
            'color': 'Белый',
            'vin': 'JT***********7890',
            'bodyType': 'Седан',
            'fuelType': 'Гибрид',
            'photos': [
                'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
                'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800'
            ]
        },
        {
            'id': 'jp-006',
            'name': 'Honda Odyssey Absolute',
            'year': 2023,
            'price': 52000,
            'country': 'japan',
            'engine': '2.4L',
            'transmission': 'Автомат',
            'mileage': 12000,
            'auction': 'USS Osaka',
            'auctionDate': '2024-10-19',
            'grade': '3.5',
            'color': 'Серый',
            'vin': 'JH***********2345',
            'bodyType': 'Минивэн',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
            ]
        },
        {
            'id': 'jp-007',
            'name': 'Mazda CX-90 Exclusive',
            'year': 2024,
            'price': 61000,
            'country': 'japan',
            'engine': '3.3L Turbo',
            'transmission': 'Автомат',
            'mileage': 3500,
            'auction': 'USS Nagoya',
            'auctionDate': '2024-10-21',
            'grade': '4.5',
            'color': 'Красный',
            'vin': 'JM***********6789',
            'bodyType': 'SUV',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800',
                'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
            ]
        },
        {
            'id': 'jp-008',
            'name': 'Subaru Outback Touring XT',
            'year': 2023,
            'price': 45000,
            'country': 'japan',
            'engine': '2.4L Turbo',
            'transmission': 'Автомат',
            'mileage': 15000,
            'auction': 'JAA',
            'auctionDate': '2024-10-16',
            'grade': '4.0',
            'color': 'Синий',
            'vin': 'JF***********0123',
            'bodyType': 'Универсал',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1600705722660-c7a5ab609d5f?w=800',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
            ]
        }
    ]
    
    korea_cars = [
        {
            'id': 'kr-001',
            'name': 'Genesis GV80 Prestige',
            'year': 2024,
            'price': 68000,
            'country': 'korea',
            'engine': '3.5L V6 Twin-Turbo',
            'transmission': 'Автомат',
            'mileage': 4000,
            'auction': 'Seoul Auto Auction',
            'auctionDate': '2024-10-14',
            'grade': '4.5',
            'color': 'Черный',
            'vin': 'KM***********1111',
            'bodyType': 'SUV',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
                'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
            ]
        },
        {
            'id': 'kr-002',
            'name': 'Kia EV6 GT',
            'year': 2024,
            'price': 58000,
            'country': 'korea',
            'engine': 'Electric 577hp',
            'transmission': 'Автомат',
            'mileage': 500,
            'auction': 'Busan Auto',
            'auctionDate': '2024-10-19',
            'grade': '5.0',
            'color': 'Белый',
            'vin': 'KN***********2222',
            'bodyType': 'SUV',
            'fuelType': 'Электро',
            'photos': [
                'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
                'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800'
            ]
        },
        {
            'id': 'kr-003',
            'name': 'Hyundai Palisade Calligraphy',
            'year': 2023,
            'price': 52000,
            'country': 'korea',
            'engine': '3.8L V6',
            'transmission': 'Автомат',
            'mileage': 10000,
            'auction': 'Seoul Auto Auction',
            'auctionDate': '2024-10-21',
            'grade': '4.0',
            'color': 'Серебристый',
            'vin': 'KM***********3333',
            'bodyType': 'SUV',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800',
                'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
            ]
        },
        {
            'id': 'kr-004',
            'name': 'Genesis G90 3.5T',
            'year': 2024,
            'price': 78000,
            'country': 'korea',
            'engine': '3.5L V6 Twin-Turbo',
            'transmission': 'Автомат',
            'mileage': 2000,
            'auction': 'Incheon Auto',
            'auctionDate': '2024-10-18',
            'grade': '5.0',
            'color': 'Темно-синий',
            'vin': 'KM***********4444',
            'bodyType': 'Седан',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
                'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
                'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800'
            ]
        },
        {
            'id': 'kr-005',
            'name': 'Hyundai Ioniq 6 AWD',
            'year': 2024,
            'price': 48000,
            'country': 'korea',
            'engine': 'Electric 320hp',
            'transmission': 'Автомат',
            'mileage': 800,
            'auction': 'Busan Auto',
            'auctionDate': '2024-10-22',
            'grade': '4.5',
            'color': 'Серый матовый',
            'vin': 'KM***********5555',
            'bodyType': 'Седан',
            'fuelType': 'Электро',
            'photos': [
                'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
                'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800'
            ]
        },
        {
            'id': 'kr-006',
            'name': 'Kia Carnival Signature',
            'year': 2023,
            'price': 42000,
            'country': 'korea',
            'engine': '3.5L V6',
            'transmission': 'Автомат',
            'mileage': 18000,
            'auction': 'Seoul Auto Auction',
            'auctionDate': '2024-10-17',
            'grade': '3.5',
            'color': 'Белый',
            'vin': 'KN***********6666',
            'bodyType': 'Минивэн',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800',
                'https://images.unsplash.com/photo-1600705722660-c7a5ab609d5f?w=800'
            ]
        }
    ]
    
    china_cars = [
        {
            'id': 'cn-001',
            'name': 'Hongqi H9 2.0T',
            'year': 2024,
            'price': 55000,
            'country': 'china',
            'engine': '2.0L Turbo',
            'transmission': 'Автомат',
            'mileage': 1000,
            'auction': 'Beijing Auto Auction',
            'auctionDate': '2024-10-16',
            'grade': '4.5',
            'color': 'Черный',
            'vin': 'LC***********1000',
            'bodyType': 'Седан',
            'fuelType': 'Бензин',
            'photos': [
                'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
                'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=800'
            ]
        },
        {
            'id': 'cn-002',
            'name': 'NIO ET7 100kWh',
            'year': 2024,
            'price': 72000,
            'country': 'china',
            'engine': 'Electric 480hp',
            'transmission': 'Автомат',
            'mileage': 2000,
            'auction': 'Shanghai Auto Market',
            'auctionDate': '2024-10-20',
            'grade': '5.0',
            'color': 'Синий',
            'vin': 'LC***********2000',
            'bodyType': 'Седан',
            'fuelType': 'Электро',
            'photos': [
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
                'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800'
            ]
        },
        {
            'id': 'cn-003',
            'name': 'Li Auto L9 Max',
            'year': 2024,
            'price': 68000,
            'country': 'china',
            'engine': '1.5L Hybrid',
            'transmission': 'Автомат',
            'mileage': 3000,
            'auction': 'Beijing Auto Auction',
            'auctionDate': '2024-10-22',
            'grade': '4.5',
            'color': 'Серебристый',
            'vin': 'LC***********3000',
            'bodyType': 'SUV',
            'fuelType': 'Гибрид',
            'photos': [
                'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
                'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
            ]
        },
        {
            'id': 'cn-004',
            'name': 'BYD Han EV',
            'year': 2023,
            'price': 45000,
            'country': 'china',
            'engine': 'Electric 380hp',
            'transmission': 'Автомат',
            'mileage': 8000,
            'auction': 'Shenzhen Auto',
            'auctionDate': '2024-10-15',
            'grade': '4.0',
            'color': 'Красный',
            'vin': 'LC***********4000',
            'bodyType': 'Седан',
            'fuelType': 'Электро',
            'photos': [
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
                'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800'
            ]
        },
        {
            'id': 'cn-005',
            'name': 'Zeekr 001 Performance',
            'year': 2024,
            'price': 62000,
            'country': 'china',
            'engine': 'Electric 536hp',
            'transmission': 'Автомат',
            'mileage': 1500,
            'auction': 'Shanghai Auto Market',
            'auctionDate': '2024-10-21',
            'grade': '5.0',
            'color': 'Белый',
            'vin': 'LC***********5000',
            'bodyType': 'SUV',
            'fuelType': 'Электро',
            'photos': [
                'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800',
                'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
                'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800'
            ]
        },
        {
            'id': 'cn-006',
            'name': 'Xpeng G9 Performance',
            'year': 2024,
            'price': 58000,
            'country': 'china',
            'engine': 'Electric 405hp',
            'transmission': 'Автомат',
            'mileage': 2500,
            'auction': 'Guangzhou Auto',
            'auctionDate': '2024-10-19',
            'grade': '4.5',
            'color': 'Серый',
            'vin': 'LC***********6000',
            'bodyType': 'SUV',
            'fuelType': 'Электро',
            'photos': [
                'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
            ]
        },
        {
            'id': 'cn-007',
            'name': 'Hongqi E-HS9 Flagship',
            'year': 2023,
            'price': 82000,
            'country': 'china',
            'engine': 'Electric 551hp',
            'transmission': 'Автомат',
            'mileage': 5000,
            'auction': 'Beijing Auto Auction',
            'auctionDate': '2024-10-18',
            'grade': '4.0',
            'color': 'Черный',
            'vin': 'LC***********7000',
            'bodyType': 'SUV',
            'fuelType': 'Электро',
            'photos': [
                'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
                'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800',
                'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800'
            ]
        }
    ]
    
    all_cars = japan_cars + korea_cars + china_cars
    
    filtered_cars = all_cars
    
    if country_filter and country_filter != 'all':
        filtered_cars = [car for car in filtered_cars if car['country'] == country_filter]
    
    if body_type_filter and body_type_filter != 'all':
        filtered_cars = [car for car in filtered_cars if car.get('bodyType', '') == body_type_filter]
    
    if transmission_filter and transmission_filter != 'all':
        filtered_cars = [car for car in filtered_cars if car.get('transmission', '') == transmission_filter]
    
    if fuel_type_filter and fuel_type_filter != 'all':
        filtered_cars = [car for car in filtered_cars if car.get('fuelType', '') == fuel_type_filter]
    
    filtered_cars = [
        car for car in filtered_cars 
        if min_price <= car['price'] <= max_price
        and min_year <= car['year'] <= max_year
        and min_mileage <= car['mileage'] <= max_mileage
    ]
    
    filtered_cars.sort(key=lambda x: x['price'], reverse=True)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'cars': filtered_cars,
            'total': len(filtered_cars),
            'timestamp': datetime.now().isoformat()
        })
    }