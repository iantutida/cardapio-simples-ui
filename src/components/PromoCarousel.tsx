import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

interface PromoCarouselProps {
  promoProducts: Product[];
  title?: string;
  onSelectProduct: (product: Product) => void;
}

export function PromoCarousel({ promoProducts, title = "🔥 Promoções Especiais", onSelectProduct }: PromoCarouselProps) {
  if (promoProducts.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {promoProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <Card 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onSelectProduct(product)}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-promo text-promo-foreground">
                    Promoção
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  {product.promo_banner_title && (
                    <p className="text-sm text-secondary font-medium mb-2">
                      {product.promo_banner_title}
                    </p>
                  )}
                  <span className="text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
