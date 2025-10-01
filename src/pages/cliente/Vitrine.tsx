import { useState } from 'react';
import { products, categories, restaurantInfo } from '@/data/mockData';
import { ProductCard } from '@/components/ProductCard';
import { PromoCarousel } from '@/components/PromoCarousel';
import { CategoryChips } from '@/components/CategoryChips';
import { CartSummary } from '@/components/CartSummary';
import { Product, CartItem } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Phone, Clock } from 'lucide-react';

export default function Vitrine() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cartItems] = useState<CartItem[]>([]);

  const promoProducts = products.filter(p => p.promo_flag);
  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleViewDetails = (product: Product) => {
    navigate(`/cliente/produto/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">{restaurantInfo.name}</h1>
              <p className="text-sm text-muted-foreground">{restaurantInfo.tagline}</p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{restaurantInfo.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{restaurantInfo.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Promo Carousel */}
            {promoProducts.length > 0 && (
              <PromoCarousel
                promoProducts={promoProducts}
                onSelectProduct={handleViewDetails}
              />
            )}

            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Categorias</h2>
              <CategoryChips
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Products Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {selectedCategory === 'Todos' ? 'Todos os Produtos' : selectedCategory}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CartSummary items={cartItems} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <CartSummary items={cartItems} />
      </div>
    </div>
  );
}
