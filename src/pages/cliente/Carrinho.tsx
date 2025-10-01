import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Minus, Plus, X, Tag } from 'lucide-react';
import { products, addonGroups } from '@/data/mockData';
import { CartItem } from '@/types';
import { toast } from 'sonner';

export default function Carrinho() {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  
  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: products[0],
      quantity: 1,
      addons: [addonGroups[0].items[0]],
      notes: 'Sem cebola'
    },
    {
      product: products[1],
      quantity: 2,
      addons: [addonGroups[1].items[0]],
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => {
    const itemTotal = item.product.price * item.quantity;
    const addonsTotal = item.addons.reduce((addonSum, addon) => addonSum + addon.price, 0) * item.quantity;
    return sum + itemTotal + addonsTotal;
  }, 0);

  const discount = appliedCoupon === 'SABOR10' ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode === 'SABOR10' || couponCode === 'FRETEGRATIS') {
      setAppliedCoupon(couponCode);
      toast.success('Cupom aplicado com sucesso!');
      setCouponCode('');
    } else {
      toast.error('Cupom inválido');
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newItems = [...cartItems];
    newItems[index].quantity = newQuantity;
    setCartItems(newItems);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/cliente')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {item.addons.length > 0 && (
                        <div className="text-sm text-muted-foreground mb-2">
                          {item.addons.map(addon => addon.name).join(', ')}
                        </div>
                      )}
                      
                      {item.notes && (
                        <div className="text-sm text-muted-foreground mb-2">
                          Obs: {item.notes}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold">
                          R$ {((item.product.price + item.addons.reduce((s, a) => s + a.price, 0)) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Resumo do Pedido</h3>
                
                {/* Coupon */}
                <div>
                  <label className="block text-sm font-medium mb-2">Cupom de Desconto</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={!!appliedCoupon}
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between mt-2 text-sm text-success">
                      <span>✓ Cupom {appliedCoupon} aplicado</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedCoupon(null)}
                      >
                        Remover
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Desconto</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/cliente/checkout')}
                >
                  Finalizar Pedido
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
