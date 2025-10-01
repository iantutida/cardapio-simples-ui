import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, addonGroups } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success('Produto adicionado ao carrinho!');
    navigate('/cliente');
  };

  const allAddons = addonGroups.flatMap(g => g.items);
  const selectedAddonObjects = allAddons.filter(a => selectedAddons.includes(a.id));
  const addonsTotal = selectedAddonObjects.reduce((sum, addon) => sum + addon.price, 0);
  const totalPrice = (product.price + addonsTotal) * quantity;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.promo_flag && (
              <Badge className="absolute top-4 right-4 bg-promo text-promo-foreground">
                Promoção
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
              {product.promo_banner_title && (
                <p className="text-secondary font-semibold mt-2">
                  {product.promo_banner_title}
                </p>
              )}
            </div>

            <div className="text-3xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </div>

            {/* Addons */}
            {addonGroups.map((group) => (
              <Card key={group.id}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">
                    {group.name}
                    {group.max > 0 && (
                      <span className="text-sm text-muted-foreground ml-2">
                        (escolha até {group.max})
                      </span>
                    )}
                  </h3>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedAddons.includes(item.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAddons([...selectedAddons, item.id]);
                              } else {
                                setSelectedAddons(selectedAddons.filter(id => id !== item.id));
                              }
                            }}
                          />
                          <label className="text-sm">{item.name}</label>
                        </div>
                        <span className="text-sm font-medium">
                          {item.price > 0 ? `+ R$ ${item.price.toFixed(2)}` : 'Grátis'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">Observações</label>
              <Textarea
                placeholder="Ex: Sem cebola, bem passado..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantidade:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho - R$ {totalPrice.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
