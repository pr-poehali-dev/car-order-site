import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculatorData, setCalculatorData] = useState({
    price: '',
    country: 'japan',
    engineSize: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    bodyType: 'all',
    fuelType: 'all',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    minMileage: '',
    maxMileage: ''
  });
  const [activeImageIndex, setActiveImageIndex] = useState<{[key: string]: number}>({});

  const countries = [
    { id: 'japan', name: 'Япония', flag: '🇯🇵' },
    { id: 'korea', name: 'Корея', flag: '🇰🇷' },
    { id: 'china', name: 'Китай', flag: '🇨🇳' }
  ];

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCountry !== 'all') params.append('country', selectedCountry);
        if (filters.bodyType !== 'all') params.append('bodyType', filters.bodyType);
        if (filters.fuelType !== 'all') params.append('fuelType', filters.fuelType);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.minYear) params.append('minYear', filters.minYear);
        if (filters.maxYear) params.append('maxYear', filters.maxYear);
        if (filters.minMileage) params.append('minMileage', filters.minMileage);
        if (filters.maxMileage) params.append('maxMileage', filters.maxMileage);
        
        const queryString = params.toString();
        const url = `https://functions.poehali.dev/9956f5fd-c378-45ad-becc-3122e4bea5c4${queryString ? `?${queryString}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();
        setCars(data.cars || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [selectedCountry, filters]);

  const getCarIcon = (car: any) => {
    if (car.engine?.toLowerCase().includes('electric')) return '⚡';
    if (car.name?.toLowerCase().includes('suv') || car.name?.toLowerCase().includes('cruiser')) return '🚙';
    return '🚗';
  };

  const reviews = [
    {
      name: 'Алексей М.',
      rating: 5,
      text: 'Заказал Lexus LX из Японии. Процесс прозрачный, все документы в порядке. Машина пришла через 45 дней в идеальном состоянии.',
      car: 'Lexus LX 600'
    },
    {
      name: 'Дмитрий К.',
      rating: 5,
      text: 'Отличный сервис! Помогли с растаможкой и доставкой Genesis из Кореи. Экономия по сравнению с местным рынком - 30%.',
      car: 'Genesis GV80'
    },
    {
      name: 'Михаил П.',
      rating: 5,
      text: 'Приобрел Toyota Land Cruiser через аукцион USS. Профессиональный подход, постоянная связь на всех этапах.',
      car: 'Toyota Land Cruiser 300'
    }
  ];

  const calculateCost = () => {
    const basePrice = parseFloat(calculatorData.price) || 0;
    const customsDuty = basePrice * 0.25;
    const vat = (basePrice + customsDuty) * 0.20;
    const delivery = 3500;
    const total = basePrice + customsDuty + vat + delivery;

    return {
      basePrice,
      customsDuty,
      vat,
      delivery,
      total
    };
  };



  const costs = calculateCost();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Car" className="text-secondary" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-primary">Premium Auto Import</h1>
                <p className="text-sm text-muted-foreground">Автомобили из Азии под заказ</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-sm font-medium hover:text-secondary transition-colors">Каталог</a>
              <a href="#auctions" className="text-sm font-medium hover:text-secondary transition-colors">Аукционы</a>
              <a href="#calculator" className="text-sm font-medium hover:text-secondary transition-colors">Калькулятор</a>
              <a href="#reviews" className="text-sm font-medium hover:text-secondary transition-colors">Отзывы</a>
              <a href="#contact" className="text-sm font-medium hover:text-secondary transition-colors">Контакты</a>
            </nav>
            <Button className="bg-secondary hover:bg-secondary/90 text-primary">
              <Icon name="Phone" size={16} className="mr-2" />
              Позвонить
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20">
              Премиальный импорт автомобилей
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
              Автомобили вашей мечты из Азии
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Напрямую с аукционов Японии, Кореи и Китая. Экономия до 40% от рыночной цены. 
              Полное сопровождение сделки и доставка под ключ.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary">
                <Icon name="Search" size={20} className="mr-2" />
                Выбрать автомобиль
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-all animate-scale-in">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Shield" className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-lg">Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Проверка автомобиля на аукционе, детальные фото и отчеты о состоянии
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all animate-scale-in [animation-delay:100ms]">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="DollarSign" className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-lg">Выгодные цены</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Экономия 30-40% по сравнению с покупкой на местном рынке
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all animate-scale-in [animation-delay:200ms]">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Truck" className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-lg">Доставка под ключ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Логистика, растаможка и сертификация - мы берем все на себя
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Auctions by Country */}
      <section id="auctions" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">Аукционы по странам</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Прямой доступ к крупнейшим автомобильным аукционам Азии
            </p>
          </div>

          <Tabs defaultValue="japan" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="japan">🇯🇵 Япония</TabsTrigger>
              <TabsTrigger value="korea">🇰🇷 Корея</TabsTrigger>
              <TabsTrigger value="china">🇨🇳 Китай</TabsTrigger>
            </TabsList>

            <TabsContent value="japan" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Японские аукционы</CardTitle>
                  <CardDescription>Крупнейшие и надежные аукционы подержанных автомобилей</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Gavel" className="text-secondary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold mb-1">USS (Used Car System Solutions)</h4>
                      <p className="text-sm text-muted-foreground">
                        Крупнейшая сеть аукционов в Японии. Более 100,000 автомобилей ежемесячно. 
                        Строгие стандарты проверки качества.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Gavel" className="text-secondary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold mb-1">JAA (Japan Auto Auction)</h4>
                      <p className="text-sm text-muted-foreground">
                        Премиальные автомобили в отличном состоянии. Специализация на люксовых брендах.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Gavel" className="text-secondary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold mb-1">TAA (Toyota Auto Auction)</h4>
                      <p className="text-sm text-muted-foreground">
                        Аукцион дилерской сети Toyota. Гарантированное качество обслуживания автомобилей.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="korea" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Корейские аукционы</CardTitle>
                  <CardDescription>Современные автомобили от Hyundai, Kia, Genesis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Gavel" className="text-secondary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold mb-1">Seoul Auto Auction</h4>
                      <p className="text-sm text-muted-foreground">
                        Ведущий аукцион Южной Кореи. Большой выбор Hyundai, Kia, Genesis в премиальных комплектациях.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Gavel" className="text-secondary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold mb-1">Busan Auto Auction</h4>
                      <p className="text-sm text-muted-foreground">
                        Специализация на электромобилях и гибридах. Современные технологии.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="china" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Китайские аукционы</CardTitle>
                  <CardDescription>Премиальные китайские бренды и электромобили</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Gavel" className="text-secondary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold mb-1">Beijing Auto Auction</h4>
                      <p className="text-sm text-muted-foreground">
                        Премиальные китайские бренды: Hongqi, NIO, Li Auto. Электромобили последнего поколения.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Gavel" className="text-secondary mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold mb-1">Shanghai Auto Market</h4>
                      <p className="text-sm text-muted-foreground">
                        Широкий выбор электрокаров и гибридов по привлекательным ценам.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">Каталог автомобилей</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Актуальные предложения с аукционов. Обновляется ежедневно
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button 
              variant={selectedCountry === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCountry('all')}
              className={selectedCountry === 'all' ? 'bg-secondary hover:bg-secondary/90 text-primary' : ''}
            >
              Все страны
            </Button>
            {countries.map(country => (
              <Button
                key={country.id}
                variant={selectedCountry === country.id ? 'default' : 'outline'}
                onClick={() => setSelectedCountry(country.id)}
                className={selectedCountry === country.id ? 'bg-secondary hover:bg-secondary/90 text-primary' : ''}
              >
                {country.flag} {country.name}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <Card className="mb-8 max-w-5xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Расширенные фильтры</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Icon name={showFilters ? 'ChevronUp' : 'ChevronDown'} size={20} />
                </Button>
              </div>
            </CardHeader>
            {showFilters && (
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Тип кузова</label>
                    <Select value={filters.bodyType} onValueChange={(value) => setFilters({...filters, bodyType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Седан">Седан</SelectItem>
                        <SelectItem value="Минивэн">Минивэн</SelectItem>
                        <SelectItem value="Купе">Купе</SelectItem>
                        <SelectItem value="Универсал">Универсал</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Тип топлива</label>
                    <Select value={filters.fuelType} onValueChange={(value) => setFilters({...filters, fuelType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="Бензин">Бензин</SelectItem>
                        <SelectItem value="Электро">Электро</SelectItem>
                        <SelectItem value="Гибрид">Гибрид</SelectItem>
                        <SelectItem value="Дизель">Дизель</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Цена</label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="$ от"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      />
                      <Input 
                        type="number" 
                        placeholder="$ до"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Год</label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="от"
                        value={filters.minYear}
                        onChange={(e) => setFilters({...filters, minYear: e.target.value})}
                      />
                      <Input 
                        type="number" 
                        placeholder="до"
                        value={filters.maxYear}
                        onChange={(e) => setFilters({...filters, maxYear: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Пробег</label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="км от"
                        value={filters.minMileage}
                        onChange={(e) => setFilters({...filters, minMileage: e.target.value})}
                      />
                      <Input 
                        type="number" 
                        placeholder="км до"
                        value={filters.maxMileage}
                        onChange={(e) => setFilters({...filters, maxMileage: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button 
                      className="w-full bg-secondary hover:bg-secondary/90 text-primary"
                      onClick={() => setFilters({
                        bodyType: 'all',
                        fuelType: 'all',
                        minPrice: '',
                        maxPrice: '',
                        minYear: '',
                        maxYear: '',
                        minMileage: '',
                        maxMileage: ''
                      })}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              <p className="mt-4 text-muted-foreground">Загрузка автомобилей с аукционов...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Автомобили не найдены</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car: any) => {
                const currentImageIndex = activeImageIndex[car.id] || 0;
                const hasPhotos = car.photos && car.photos.length > 0;
                
                return (
                  <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative group">
                      {hasPhotos ? (
                        <>
                          <img 
                            src={car.photos[currentImageIndex]} 
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                          {car.photos.length > 1 && (
                            <>
                              <button
                                onClick={() => setActiveImageIndex({
                                  ...activeImageIndex,
                                  [car.id]: currentImageIndex === 0 ? car.photos.length - 1 : currentImageIndex - 1
                                })}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Icon name="ChevronLeft" size={20} />
                              </button>
                              <button
                                onClick={() => setActiveImageIndex({
                                  ...activeImageIndex,
                                  [car.id]: currentImageIndex === car.photos.length - 1 ? 0 : currentImageIndex + 1
                                })}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Icon name="ChevronRight" size={20} />
                              </button>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {car.photos.map((_: any, idx: number) => (
                                  <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex({...activeImageIndex, [car.id]: idx})}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      idx === currentImageIndex 
                                        ? 'bg-white w-4' 
                                        : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          {getCarIcon(car)}
                        </div>
                      )}
                    </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg mb-1">{car.name}</CardTitle>
                        <CardDescription className="text-xs">{car.auction}</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-secondary text-secondary">
                        {countries.find(c => c.id === car.country)?.flag}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {car.bodyType && (
                        <Badge variant="secondary" className="text-xs">
                          {car.bodyType}
                        </Badge>
                      )}
                      {car.fuelType && (
                        <Badge variant="outline" className="text-xs">
                          {car.fuelType}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Год:</span>
                        <span className="font-medium">{car.year}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Двигатель:</span>
                        <span className="font-medium">{car.engine}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">КПП:</span>
                        <span className="font-medium">{car.transmission}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Пробег:</span>
                        <span className="font-medium">{car.mileage.toLocaleString()} км</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-primary">${car.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">на аукционе</span>
                      </div>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary">
                        <Icon name="Eye" size={16} className="mr-2" />
                        Подробнее
                      </Button>
                    </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4 text-primary">Калькулятор стоимости</h3>
              <p className="text-muted-foreground">
                Рассчитайте полную стоимость автомобиля с учетом всех расходов
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Введите данные</CardTitle>
                  <CardDescription>Укажите параметры автомобиля</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Цена на аукционе ($)</label>
                    <Input
                      type="number"
                      placeholder="85000"
                      value={calculatorData.price}
                      onChange={(e) => setCalculatorData({...calculatorData, price: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Страна</label>
                    <Select 
                      value={calculatorData.country}
                      onValueChange={(value) => setCalculatorData({...calculatorData, country: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="japan">🇯🇵 Япония</SelectItem>
                        <SelectItem value="korea">🇰🇷 Корея</SelectItem>
                        <SelectItem value="china">🇨🇳 Китай</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Объем двигателя (л)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="3.0"
                      value={calculatorData.engineSize}
                      onChange={(e) => setCalculatorData({...calculatorData, engineSize: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Расчет стоимости</CardTitle>
                  <CardDescription>Итоговая стоимость под ключ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Стоимость на аукционе:</span>
                    <span className="font-medium">${costs.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Таможенная пошлина (25%):</span>
                    <span className="font-medium">${costs.customsDuty.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">НДС (20%):</span>
                    <span className="font-medium">${costs.vat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка и логистика:</span>
                    <span className="font-medium">${costs.delivery.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Итого под ключ:</span>
                      <span className="text-2xl font-bold text-secondary">${costs.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-primary">
                    <Icon name="Send" size={16} className="mr-2" />
                    Получить консультацию
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 bg-secondary/5 border-secondary/20">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Icon name="Info" className="text-secondary flex-shrink-0" size={24} />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-2">Что входит в стоимость:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Покупка автомобиля на аукционе</li>
                      <li>Доставка морским транспортом</li>
                      <li>Таможенное оформление и сертификация</li>
                      <li>Все пошлины и сборы</li>
                      <li>Доставка до вашего города</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-primary">Отзывы клиентов</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Более 500 довольных клиентов уже получили автомобили своей мечты
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-secondary fill-secondary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription className="text-xs">{review.car}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4 text-primary">Доставка и логистика</h3>
              <p className="text-muted-foreground">
                Полный цикл от аукциона до вашего гаража
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                    <Icon name="Search" className="text-secondary" size={24} />
                  </div>
                  <CardTitle className="text-sm">1. Подбор</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Находим автомобиль по вашим критериям</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                    <Icon name="Gavel" className="text-secondary" size={24} />
                  </div>
                  <CardTitle className="text-sm">2. Покупка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Участвуем в торгах и выкупаем авто</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                    <Icon name="Ship" className="text-secondary" size={24} />
                  </div>
                  <CardTitle className="text-sm">3. Доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Морская перевозка 30-45 дней</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                    <Icon name="FileCheck" className="text-secondary" size={24} />
                  </div>
                  <CardTitle className="text-sm">4. Растаможка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Оформление всех документов</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Clock" className="text-secondary" size={20} />
                      Сроки доставки
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Icon name="ChevronRight" size={16} className="text-secondary" />
                        Япония: 30-40 дней
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="ChevronRight" size={16} className="text-secondary" />
                        Корея: 35-45 дней
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="ChevronRight" size={16} className="text-secondary" />
                        Китай: 25-35 дней
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="FileText" className="text-secondary" size={20} />
                      Документы
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Icon name="ChevronRight" size={16} className="text-secondary" />
                        Контракт купли-продажи
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="ChevronRight" size={16} className="text-secondary" />
                        Сертификат соответствия
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="ChevronRight" size={16} className="text-secondary" />
                        ПТС и все документы для регистрации
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Оставьте заявку</CardTitle>
                <CardDescription>
                  Наш менеджер свяжется с вами в течение 15 минут
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <Input placeholder="+7 (___) ___-__-__" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Интересующий автомобиль</label>
                  <Input placeholder="Например: Toyota Land Cruiser 300" />
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary" size="lg">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="Car" size={24} />
                Premium Auto Import
              </h4>
              <p className="text-sm text-primary-foreground/80">
                Импорт премиальных автомобилей из Японии, Кореи и Китая под ключ
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#catalog" className="hover:text-secondary transition-colors">Каталог автомобилей</a></li>
                <li><a href="#auctions" className="hover:text-secondary transition-colors">Аукционы</a></li>
                <li><a href="#calculator" className="hover:text-secondary transition-colors">Калькулятор</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Доставка</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Информация</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-secondary transition-colors">О компании</a></li>
                <li><a href="#reviews" className="hover:text-secondary transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Гарантии</a></li>
                <li><a href="#contact" className="hover:text-secondary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@autoimport.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Примерная, 123
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>© 2024 Premium Auto Import. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;