import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  items: CartItem[];
  className?: string;
}

export function CartSummary({ items, className }: CartSummaryProps) {
  const navigate = useNavigate();
  
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.product.price * item.quantity;
    const addonsTotal = item.addons.reduce((addonSum, addon) => addonSum + addon.price, 0) * item.quantity;
    return sum + itemTotal + addonsTotal;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Carrinho vazio</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Carrinho ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="flex-1">
                {item.quantity}x {item.product.name}
              </span>
              <span className="font-medium">
                R$ {((item.product.price + item.addons.reduce((s, a) => s + a.price, 0)) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Subtotal</span>
            <span className="text-primary">R$ {subtotal.toFixed(2)}</span>
          </div>
        </div>
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => navigate('/cliente/carrinho')}
        >
          Ver Carrinho
        </Button>
      </CardContent>
    </Card>
  );
}
