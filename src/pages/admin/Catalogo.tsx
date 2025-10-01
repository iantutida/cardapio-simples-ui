import { useState } from 'react';
import { products, categories as mockCategories } from '@/data/mockData';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCatalogo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSaveProduct = () => {
    toast.success('Produto salvo com sucesso!');
    setEditingProduct(null);
  };

  const filteredProducts = productList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <p className="text-sm text-muted-foreground">Gerencie categorias, produtos e opcionais</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="produtos" className="w-full">
          <TabsList>
            <TabsTrigger value="categorias">Categorias</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="opcionais">Opcionais</TabsTrigger>
          </TabsList>

          <TabsContent value="categorias" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Categorias</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Categoria
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockCategories.filter(c => c !== 'Todos').map((category, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="font-medium">{category}</span>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="produtos" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <CardTitle>Produtos</CardTitle>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar produto..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Novo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Novo Produto</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label>Nome do Produto</Label>
                              <Input placeholder="Ex: Pizza Margherita" />
                            </div>
                            <div className="col-span-2">
                              <Label>Descrição</Label>
                              <Textarea placeholder="Descrição detalhada do produto..." rows={3} />
                            </div>
                            <div>
                              <Label>Preço (R$)</Label>
                              <Input type="number" step="0.01" placeholder="0.00" />
                            </div>
                            <div>
                              <Label>Categoria</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockCategories.filter(c => c !== 'Todos').map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2">
                              <Label>URL da Imagem</Label>
                              <Input placeholder="https://..." />
                            </div>
                            <div className="flex items-center justify-between col-span-2 p-4 border rounded-lg">
                              <div>
                                <Label>Em Promoção</Label>
                                <p className="text-sm text-muted-foreground">
                                  Produto aparecerá no carrossel de promoções
                                </p>
                              </div>
                              <Switch />
                            </div>
                            <div className="col-span-2">
                              <Label>Título do Banner de Promoção</Label>
                              <Input placeholder="Ex: Pizza do Dia - 20% OFF" />
                            </div>
                            <div className="flex items-center justify-between col-span-2 p-4 border rounded-lg">
                              <div>
                                <Label>Produto Ativo</Label>
                                <p className="text-sm text-muted-foreground">
                                  Produto visível para os clientes
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                          <Button className="w-full" onClick={handleSaveProduct}>
                            Salvar Produto
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          {product.promo_flag && (
                            <Badge variant="outline" className="bg-promo/10 text-promo border-promo">
                              Promoção
                            </Badge>
                          )}
                          {!product.active && (
                            <Badge variant="outline" className="bg-muted">
                              Inativo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {product.description}
                        </p>
                        <p className="text-sm font-medium mt-1">R$ {product.price.toFixed(2)}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opcionais" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Grupos de Opcionais</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Grupo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Bordas</h3>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Min: 0 | Max: 1
                    </p>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between text-sm">
                        <span>Borda Recheada Catupiry</span>
                        <span className="font-medium">+ R$ 5,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Borda Recheada Cheddar</span>
                        <span className="font-medium">+ R$ 5,00</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Adicionais</h3>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Min: 0 | Max: 5
                    </p>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between text-sm">
                        <span>Extra Bacon</span>
                        <span className="font-medium">+ R$ 4,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cebola Caramelizada</span>
                        <span className="font-medium">+ R$ 3,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Molho Especial</span>
                        <span className="font-medium">+ R$ 2,00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
