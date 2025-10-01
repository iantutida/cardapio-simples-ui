import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OrderStatusTimeline } from '@/components/OrderStatusTimeline';
import { CheckCircle, Phone, Clock, Home } from 'lucide-react';
import { restaurantInfo } from '@/data/mockData';

export default function Confirmacao() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-success/10">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
          <p className="text-muted-foreground">
            Seu pedido foi recebido com sucesso
          </p>
        </div>

        {/* Order ID */}
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Código do Pedido</p>
            <p className="text-2xl font-bold text-primary">{orderId}</p>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Status do Pedido</h2>
            <OrderStatusTimeline currentStatus="RECEBIDO" />
          </CardContent>
        </Card>

        {/* Restaurant Info */}
        <Card className="mb-8">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">{restaurantInfo.name}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Horário de Funcionamento</p>
                  <p className="text-muted-foreground">{restaurantInfo.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Contato</p>
                  <p className="text-muted-foreground">{restaurantInfo.phone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/cliente')}
          >
            <Home className="h-4 w-4 mr-2" />
            Voltar à Vitrine
          </Button>
          <Button
            className="flex-1"
            onClick={() => window.location.reload()}
          >
            Acompanhar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}
