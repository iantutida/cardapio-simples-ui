import { useState } from 'react';
import { coupons } from '@/data/mockData';
import { Coupon } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCupons() {
  const [couponList, setCouponList] = useState<Coupon[]>(coupons);

  const handleSaveCoupon = () => {
    toast.success('Cupom salvo com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Cupons de Desconto</h1>
          <p className="text-sm text-muted-foreground">Gerencie cupons e promoções</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Cupons</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Cupom
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Cupom</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Código do Cupom</Label>
                      <Input placeholder="Ex: SABOR10" className="uppercase" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use letras maiúsculas e números
                      </p>
                    </div>
                    <div>
                      <Label>Tipo de Desconto</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENT">Percentual</SelectItem>
                          <SelectItem value="FREESHIP">Frete Grátis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Valor (%)</Label>
                      <Input type="number" placeholder="10" />
                    </div>
                    <div>
                      <Label>Validade</Label>
                      <Input type="date" />
                    </div>
                    <Button className="w-full" onClick={handleSaveCoupon}>
                      Salvar Cupom
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {couponList.map((coupon, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{coupon.code}</h3>
                      <Badge variant="outline">
                        {coupon.type === 'PERCENT' ? `${coupon.value}% OFF` : 'Frete Grátis'}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>
                        Validade: {new Date(coupon.validUntil).toLocaleDateString('pt-BR')}
                      </span>
                      <span>•</span>
                      <span>Usos: {coupon.usageCount}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
