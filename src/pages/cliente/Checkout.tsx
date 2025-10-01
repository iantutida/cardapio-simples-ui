import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check } from 'lucide-react';
import { DeliveryMode } from '@/types';
import { restaurantInfo } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('ENTREGA');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const subtotal = 95.80;
  const discount = 9.58;
  const shipping = deliveryMode === 'ENTREGA' ? 10.00 : 0;
  const total = subtotal - discount + shipping;

  const handleConfirmOrder = () => {
    navigate('/cliente/confirmacao/ORD-003');
  };

  const steps = [
    { number: 1, title: 'Identificação' },
    { number: 2, title: 'Entrega' },
    { number: 3, title: 'Revisão' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => step === 1 ? navigate('/cliente/carrinho') : setStep(step - 1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-muted -z-10" />
            <div
              className="absolute top-5 left-0 h-1 bg-primary transition-all duration-300 -z-10"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-4 bg-background transition-colors",
                    s.number <= step
                      ? "border-primary text-primary"
                      : "border-muted text-muted-foreground"
                  )}
                >
                  {s.number < step ? <Check className="h-5 w-5" /> : s.number}
                </div>
                <p className="mt-2 text-sm font-medium hidden sm:block">{s.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div>
            {step === 1 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Identificação</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        placeholder="Digite seu nome"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="(11) 98765-4321"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Usaremos para entrar em contato sobre o pedido
                      </p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setStep(2)}>
                    Continuar
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Modalidade de Entrega</h2>
                  <RadioGroup value={deliveryMode} onValueChange={(v) => setDeliveryMode(v as DeliveryMode)}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="ENTREGA" id="entrega" />
                      <Label htmlFor="entrega" className="flex-1 cursor-pointer">
                        Entrega
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="RETIRADA" id="retirada" />
                      <Label htmlFor="retirada" className="flex-1 cursor-pointer">
                        Retirada no Local
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="LOCAL" id="local" />
                      <Label htmlFor="local" className="flex-1 cursor-pointer">
                        Consumir no Local
                      </Label>
                    </div>
                  </RadioGroup>

                  {deliveryMode === 'ENTREGA' && (
                    <div>
                      <Label htmlFor="address">Endereço de Entrega</Label>
                      <Textarea
                        id="address"
                        placeholder="Rua, número, complemento, bairro..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}

                  {deliveryMode === 'LOCAL' && (
                    <div>
                      <Label htmlFor="table">Número da Mesa</Label>
                      <Input
                        id="table"
                        placeholder="Ex: 15"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                      />
                    </div>
                  )}

                  <Button className="w-full" onClick={() => setStep(3)}>
                    Continuar
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Revisão do Pedido</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Identificação</p>
                      <p className="text-muted-foreground">{customerName}</p>
                      <p className="text-muted-foreground">{customerPhone}</p>
                    </div>

                    <div>
                      <p className="font-medium">Entrega</p>
                      <p className="text-muted-foreground">
                        {deliveryMode === 'ENTREGA' && `Entrega: ${address}`}
                        {deliveryMode === 'RETIRADA' && 'Retirada no local'}
                        {deliveryMode === 'LOCAL' && `Mesa ${tableNumber}`}
                      </p>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-success">
                        <span>Desconto</span>
                        <span>- R$ {discount.toFixed(2)}</span>
                      </div>
                      {shipping > 0 && (
                        <div className="flex justify-between">
                          <span>Frete</span>
                          <span>R$ {shipping.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span className="text-primary">R$ {total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleConfirmOrder}>
                    Confirmar Pedido
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="hidden lg:block">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">Resumo</h3>
                <div className="space-y-2 text-sm">
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
                  {shipping > 0 && (
                    <div className="flex justify-between">
                      <span>Frete estimado</span>
                      <span>R$ {shipping.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
