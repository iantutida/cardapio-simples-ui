import { useState } from 'react';
import { sampleOrders } from '@/data/mockData';
import { Order, OrderStatus } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPedidos() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success('Status atualizado com sucesso!');
  };

  const handlePaymentToggle = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, paymentConfirmed: !order.paymentConfirmed } : order
    ));
  };

  const ordersByStatus = {
    RECEBIDO: orders.filter(o => o.status === 'RECEBIDO'),
    EM_PREPARO: orders.filter(o => o.status === 'EM_PREPARO'),
    PRONTO: orders.filter(o => o.status === 'PRONTO'),
    ENTREGUE: orders.filter(o => o.status === 'ENTREGUE'),
    CANCELADO: orders.filter(o => o.status === 'CANCELADO'),
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Gestão de Pedidos</h1>
          <p className="text-sm text-muted-foreground">Acompanhe e gerencie pedidos em tempo real</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(ordersByStatus).slice(0, 4).map(([status, orderList]) => (
            <div key={status}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">
                  {status.replace('_', ' ')}
                </h2>
                <Badge variant="outline">{orderList.length}</Badge>
              </div>
              <div className="space-y-3">
                {orderList.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base flex items-center justify-between">
                        <span>{order.id}</span>
                        <StatusBadge status={order.status} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <div className="text-sm space-y-1">
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.customerPhone}
                        </p>
                        {order.address && (
                          <p className="text-muted-foreground flex items-center gap-1 line-clamp-1">
                            <MapPin className="h-3 w-3" />
                            {order.address}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-semibold text-primary">
                          R$ {order.total.toFixed(2)}
                        </span>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Detalhes do Pedido {order.id}</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                              <div>
                                <Label>Status do Pedido</Label>
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                                >
                                  <SelectTrigger className="mt-2">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="RECEBIDO">Recebido</SelectItem>
                                    <SelectItem value="EM_PREPARO">Em Preparo</SelectItem>
                                    <SelectItem value="PRONTO">Pronto</SelectItem>
                                    <SelectItem value="ENTREGUE">Entregue</SelectItem>
                                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-center justify-between">
                                <Label htmlFor="payment">Pagamento Confirmado</Label>
                                <Switch
                                  id="payment"
                                  checked={order.paymentConfirmed}
                                  onCheckedChange={() => handlePaymentToggle(order.id)}
                                />
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-semibold">Itens</h4>
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="text-sm">
                                    <p>{item.quantity}x {item.product.name}</p>
                                    {item.addons.length > 0 && (
                                      <p className="text-muted-foreground text-xs">
                                        + {item.addons.map(a => a.name).join(', ')}
                                      </p>
                                    )}
                                    {item.notes && (
                                      <p className="text-muted-foreground text-xs">
                                        Obs: {item.notes}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-1 text-sm pt-2 border-t">
                                <div className="flex justify-between">
                                  <span>Subtotal</span>
                                  <span>R$ {order.subtotal.toFixed(2)}</span>
                                </div>
                                {order.discount > 0 && (
                                  <div className="flex justify-between text-success">
                                    <span>Desconto</span>
                                    <span>- R$ {order.discount.toFixed(2)}</span>
                                  </div>
                                )}
                                {order.shipping > 0 && (
                                  <div className="flex justify-between">
                                    <span>Frete</span>
                                    <span>R$ {order.shipping.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between font-semibold text-base pt-2 border-t">
                                  <span>Total</span>
                                  <span>R$ {order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
