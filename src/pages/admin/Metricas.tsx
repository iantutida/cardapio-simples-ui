import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, Package, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMetricas() {
  const handleExportCSV = () => {
    toast.success('Exportando relatório...');
  };

  const todayMetrics = {
    totalOrders: 24,
    totalRevenue: 1567.80,
    topProducts: [
      { name: 'Pizza Margherita', quantity: 12, revenue: 478.80 },
      { name: 'Burger Smash', quantity: 18, revenue: 538.20 },
      { name: 'Açaí 500ml', quantity: 8, revenue: 199.20 },
      { name: 'Coca-Cola 350ml', quantity: 15, revenue: 90.00 },
      { name: 'Brownie de Chocolate', quantity: 6, revenue: 95.40 }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Métricas e Relatórios</h1>
              <p className="text-sm text-muted-foreground">Dashboard de vendas e desempenho</p>
            </div>
            <Button onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayMetrics.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% em relação a ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                R$ {todayMetrics.totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +8% em relação a ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                R$ {(todayMetrics.totalRevenue / todayMetrics.totalOrders).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                -3% em relação a ontem
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Produtos do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayMetrics.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.quantity} unidades vendidas
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      R$ {product.revenue.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Period Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Segunda-feira</span>
                  <span className="font-medium">R$ 1.234,56</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Terça-feira</span>
                  <span className="font-medium">R$ 1.456,78</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quarta-feira</span>
                  <span className="font-medium">R$ 1.567,89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quinta-feira</span>
                  <span className="font-medium">R$ 1.678,90</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sexta-feira</span>
                  <span className="font-medium">R$ 2.345,67</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sábado</span>
                  <span className="font-medium">R$ 2.789,01</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-3">
                  <span>Total da Semana</span>
                  <span className="text-primary">R$ 11.072,81</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métodos de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Entrega</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Retirada</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Local (Mesa)</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
