import { useState } from 'react';
import { sampleOrders } from '@/data/mockData';
import { Order, OrderStatus } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, BellOff, Volume2, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function DesktopFilaPedidos() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success('Status atualizado!');
  };

  const playTestSound = () => {
    toast.info('🔔 Som de teste tocando...');
  };

  const ordersByStatus = {
    RECEBIDO: orders.filter(o => o.status === 'RECEBIDO'),
    EM_PREPARO: orders.filter(o => o.status === 'EM_PREPARO'),
    PRONTO: orders.filter(o => o.status === 'PRONTO'),
  };

  const newOrdersCount = ordersByStatus.RECEBIDO.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Fila de Pedidos - Desktop</h1>
              <p className="text-sm text-muted-foreground">
                Sistema de acompanhamento para o restaurante
              </p>
            </div>
            <div className="flex items-center gap-4">
              {newOrdersCount > 0 && (
                <Badge className="bg-warning text-warning-foreground animate-pulse">
                  {newOrdersCount} {newOrdersCount === 1 ? 'novo pedido' : 'novos pedidos'}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="gap-2"
              >
                {soundEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                {soundEnabled ? 'Som Ativado' : 'Som Desativado'}
              </Button>
              <Button variant="outline" size="sm" onClick={playTestSound} className="gap-2">
                <Volume2 className="h-4 w-4" />
                Testar Som
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Kanban View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recebido */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Novos Pedidos</h2>
              <Badge variant="outline" className="bg-status-pending/10 text-status-pending">
                {ordersByStatus.RECEBIDO.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {ordersByStatus.RECEBIDO.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-status-pending">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="font-bold">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="text-sm space-y-1">
                      <p className="font-semibold">{order.customerName}</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {order.customerPhone}
                      </p>
                      {order.deliveryMode === 'ENTREGA' && order.address && (
                        <p className="text-muted-foreground flex items-start gap-1">
                          <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{order.address}</span>
                        </p>
                      )}
                      {order.deliveryMode === 'LOCAL' && order.tableNumber && (
                        <p className="text-muted-foreground">
                          Mesa: {order.tableNumber}
                        </p>
                      )}
                      {order.deliveryMode === 'RETIRADA' && (
                        <p className="text-muted-foreground">
                          Retirada no Local
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 text-sm">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity}x {item.product.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-bold text-primary">
                        R$ {order.total.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(order.id, 'EM_PREPARO')}
                      >
                        Iniciar Preparo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Em Preparo */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Em Preparo</h2>
              <Badge variant="outline" className="bg-status-preparing/10 text-status-preparing">
                {ordersByStatus.EM_PREPARO.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {ordersByStatus.EM_PREPARO.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-status-preparing">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="font-bold">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="text-sm space-y-1">
                      <p className="font-semibold">{order.customerName}</p>
                      <p className="text-muted-foreground">{order.deliveryMode}</p>
                    </div>

                    <div className="space-y-1 text-sm">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity}x {item.product.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-bold text-primary">
                        R$ {order.total.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleStatusChange(order.id, 'PRONTO')}
                      >
                        Marcar Pronto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pronto */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Prontos</h2>
              <Badge variant="outline" className="bg-status-ready/10 text-status-ready">
                {ordersByStatus.PRONTO.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {ordersByStatus.PRONTO.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-status-ready">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="font-bold">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="text-sm space-y-1">
                      <p className="font-semibold">{order.customerName}</p>
                      <p className="text-muted-foreground">{order.deliveryMode}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-bold text-primary">
                        R$ {order.total.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-success hover:bg-success/90"
                        onClick={() => handleStatusChange(order.id, 'ENTREGUE')}
                      >
                        Finalizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
