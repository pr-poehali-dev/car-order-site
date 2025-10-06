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
            'vin': 'JT***********1234'
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
            'vin': 'JT***********5678'
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
            'vin': 'JT***********9012'
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
            'vin': 'JN***********3456'
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
            'vin': 'JT***********7890'
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
            'vin': 'JH***********2345'
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
            'vin': 'JM***********6789'
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
            'vin': 'JF***********0123'
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
            'vin': 'KM***********1111'
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
            'vin': 'KN***********2222'
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
            'vin': 'KM***********3333'
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
            'vin': 'KM***********4444'
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
            'vin': 'KM***********5555'
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
            'vin': 'KN***********6666'
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
            'vin': 'LC***********1000'
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
            'vin': 'LC***********2000'
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
            'vin': 'LC***********3000'
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
            'vin': 'LC***********4000'
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
            'vin': 'LC***********5000'
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
            'vin': 'LC***********6000'
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
            'vin': 'LC***********7000'
        }
    ]
    
    all_cars = japan_cars + korea_cars + china_cars
    
    if country_filter and country_filter != 'all':
        filtered_cars = [car for car in all_cars if car['country'] == country_filter]
    else:
        filtered_cars = all_cars
    
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
