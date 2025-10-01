# APSOO - Cardápio Online | Guia de Componentes

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Design System](#design-system)
3. [Componentes Reutilizáveis](#componentes-reutilizáveis)
4. [Navegação entre Telas](#navegação-entre-telas)
5. [Dados Fictícios](#dados-fictícios)

---

## 🎨 Visão Geral

Sistema de cardápio online desenvolvido como mock de baixa/média fidelidade para o projeto acadêmico APSOO. O sistema possui três interfaces principais:

- **Cliente**: Navegação de produtos, carrinho e checkout
- **Admin**: Gestão de catálogo, pedidos, cupons e métricas
- **Desktop**: Fila de pedidos em tempo real para o restaurante

---

## 🎨 Design System

### Paleta de Cores (HSL)

```css
/* Primárias */
--primary: hsl(243, 75%, 59%)        /* Índigo #4F46E5 */
--secondary: hsl(172, 82%, 40%)      /* Teal #14B8A6 */

/* Feedback */
--success: hsl(142, 71%, 45%)        /* Verde #22C55E */
--warning: hsl(25, 95%, 53%)         /* Laranja #F97316 */
--destructive: hsl(0, 84%, 60%)      /* Vermelho #EF4444 */

/* Status de Pedidos */
--status-pending: hsl(45, 93%, 47%)      /* Amarelo */
--status-preparing: hsl(25, 95%, 53%)    /* Laranja */
--status-ready: hsl(142, 71%, 45%)       /* Verde */
--status-delivered: hsl(172, 82%, 40%)   /* Teal */
--status-cancelled: hsl(0, 84%, 60%)     /* Vermelho */

/* Neutros */
--background: hsl(210, 40%, 98%)     /* Cinza muito claro */
--foreground: hsl(222, 47%, 11%)     /* Cinza escuro */
--muted: hsl(210, 40%, 96%)
--border: hsl(214, 32%, 91%)
```

### Tipografia

**Fonte**: Inter (400, 500, 600, 700)

```
Títulos H1: 32px / 2rem / font-bold
Títulos H2: 24px / 1.5rem / font-semibold
Títulos H3: 20px / 1.25rem / font-semibold
Corpo: 16px / 1rem / font-normal
Pequeno: 14px / 0.875rem / font-normal
Rótulos: 12px / 0.75rem / font-medium
```

### Espaçamento

```
Base: 4px (0.25rem)
Pequeno: 8px (0.5rem)
Médio: 16px (1rem)
Grande: 24px (1.5rem)
Extra Grande: 32px (2rem)
```

### Border Radius

```
--radius: 0.5rem (8px)
lg: var(--radius)
md: calc(var(--radius) - 2px)
sm: calc(var(--radius) - 4px)
```

---

## 🧩 Componentes Reutilizáveis

### ProductCard

**Propósito**: Exibir produto em grid/lista

**Arquivo**: `src/components/ProductCard.tsx`

**Props**:
- `product: Product` - Objeto do produto
- `onViewDetails: (product: Product) => void` - Callback ao clicar

**Estados**:
- Normal: card básico com hover
- Promoção: badge "Promoção" no canto superior direito
- Hover: sombra e escala da imagem

**Exemplo de uso**:
```tsx
<ProductCard 
  product={product} 
  onViewDetails={(p) => navigate(`/produto/${p.id}`)} 
/>
```

---

### PromoCarousel

**Propósito**: Carrossel de produtos em promoção

**Arquivo**: `src/components/PromoCarousel.tsx`

**Props**:
- `promoProducts: Product[]` - Lista de produtos em promoção
- `title?: string` - Título do carrossel (padrão: "🔥 Promoções Especiais")
- `onSelectProduct: (product: Product) => void` - Callback ao selecionar

**Características**:
- Carrossel responsivo (1 col mobile, 2 tablet, 3 desktop)
- Navegação com setas
- Badge de promoção em cada card

---

### CategoryChips

**Propósito**: Filtro de categorias em chips

**Arquivo**: `src/components/CategoryChips.tsx`

**Props**:
- `categories: string[]` - Lista de categorias
- `selectedCategory: string` - Categoria ativa
- `onSelectCategory: (category: string) => void` - Callback de seleção

**Estados**:
- Ativo: background primary
- Inativo: outline
- Hover: transição suave

---

### StatusBadge

**Propósito**: Badge de status do pedido

**Arquivo**: `src/components/StatusBadge.tsx`

**Props**:
- `status: OrderStatus` - Status atual
- `className?: string` - Classes adicionais

**Variantes**:
- RECEBIDO: amarelo
- EM_PREPARO: laranja
- PRONTO: verde
- ENTREGUE: teal
- CANCELADO: vermelho

---

### OrderStatusTimeline

**Propósito**: Timeline visual do status do pedido

**Arquivo**: `src/components/OrderStatusTimeline.tsx`

**Props**:
- `currentStatus: OrderStatus` - Status atual do pedido

**Características**:
- Linha de progresso animada
- Ícones para cada etapa
- Destaque do status atual com pulse
- Tratamento especial para pedidos cancelados

**Etapas**:
1. Recebido (Clock)
2. Em Preparo (Package)
3. Pronto (CheckCircle)
4. Entregue (Truck)

---

### CartSummary

**Propósito**: Resumo do carrinho (sidebar ou bottom sheet)

**Arquivo**: `src/components/CartSummary.tsx`

**Props**:
- `items: CartItem[]` - Itens do carrinho
- `className?: string` - Classes adicionais

**Características**:
- Lista de itens com quantidades
- Cálculo automático de subtotal
- CTA para ver carrinho completo
- Estado vazio com ícone e mensagem

---

## 🗺️ Navegação entre Telas

### Rotas do Cliente

```
/cliente                              → Vitrine (Home)
/cliente/produto/:id                  → Detalhes do Produto
/cliente/carrinho                     → Carrinho
/cliente/checkout                     → Checkout (3 passos)
/cliente/confirmacao/:orderId         → Confirmação/Status
```

### Rotas do Admin

```
/admin                                → Login
/admin/pedidos                        → Gestão de Pedidos
/admin/catalogo                       → Catálogo (Categorias/Produtos/Opcionais)
/admin/cupons                         → Cupons de Desconto
/admin/metricas                       → Métricas e Relatórios
```

### Rotas Desktop (Restaurante)

```
/desktop/fila                         → Fila de Pedidos Tempo Real
```

---

## 📊 Fluxos Principais

### Fluxo do Cliente

1. **Vitrine** (`/cliente`)
   - Header com logo, horário e contato
   - Carrossel de promoções
   - Filtro por categorias (chips)
   - Grid de produtos
   - Sidebar/bottom sheet com resumo do carrinho

2. **Página de Produto** (`/cliente/produto/:id`)
   - Imagem grande do produto
   - Descrição detalhada
   - Seleção de opcionais (checkboxes com min/max)
   - Campo de observações
   - Controle de quantidade (stepper)
   - CTA "Adicionar ao Carrinho"

3. **Carrinho** (`/cliente/carrinho`)
   - Lista de itens com imagem, nome, opcionais, quantidade
   - Edição de quantidade (stepper)
   - Remoção de itens
   - Campo para aplicar cupom
   - Resumo: subtotal, desconto, total
   - CTA "Finalizar Pedido"

4. **Checkout - 3 Passos** (`/cliente/checkout`)
   - **Passo 1 - Identificação**: nome e telefone
   - **Passo 2 - Modalidade**: Entrega (endereço), Retirada ou Local (mesa)
   - **Passo 3 - Revisão**: resumo completo + valores
   - Stepper visual no topo
   - Sidebar com resumo de valores

5. **Confirmação** (`/cliente/confirmacao/:orderId`)
   - Ícone de sucesso
   - Código do pedido em destaque
   - Timeline de status (começa em RECEBIDO)
   - Card com dados do restaurante
   - Botões: "Voltar à Vitrine" e "Acompanhar Pedido"

---

### Fluxo do Admin

1. **Login** (`/admin`)
   - Card centralizado
   - Email e senha
   - Link "Esqueceu a senha?" (placeholder)

2. **Pedidos** (`/admin/pedidos`)
   - Layout Kanban: 4 colunas (RECEBIDO, EM_PREPARO, PRONTO, ENTREGUE)
   - Card de pedido: código, cliente, contato, itens, valor
   - Botão "Ver Detalhes" abre drawer lateral
   - Drawer: alterar status (select), toggle pagamento, lista de itens, valores

3. **Catálogo** (`/admin/catalogo`)
   - Tabs: Categorias | Produtos | Opcionais
   - **Categorias**: lista simples com botão editar
   - **Produtos**: busca, listagem com foto/nome/preço/badges, modal de criação/edição
   - **Opcionais**: grupos (min/max) com lista de itens e preços

4. **Cupons** (`/admin/cupons`)
   - Listagem de cupons: código, tipo (PERCENT/FREESHIP), validade, usos
   - Modal de criação: código, tipo, valor, data de validade

5. **Métricas** (`/admin/metricas`)
   - Cards de resumo: Pedidos Hoje, Faturamento, Ticket Médio
   - Top 5 produtos do dia (lista numerada)
   - Desempenho semanal (lista de valores)
   - Métodos de entrega (barras de progresso)
   - Botão "Exportar CSV"

---

### Fluxo Desktop (Restaurante)

1. **Fila de Pedidos** (`/desktop/fila`)
   - Header fixo com contadores e controles de som
   - Badge pulsante para novos pedidos
   - Toggle de som (ativado/desativado)
   - Botão "Testar Som"
   - Layout Kanban: 3 colunas (RECEBIDO, EM_PREPARO, PRONTO)
   - Cards compactos com info essencial
   - Botões de ação rápida: "Iniciar Preparo", "Marcar Pronto", "Finalizar"
   - Cores na borda esquerda indicam status

---

## 📦 Dados Fictícios

**Restaurante**: Sabor & Arte  
**Slogan**: Delícias artesanais feitas com amor  
**Horário**: Seg-Sex: 11h-23h | Sáb-Dom: 12h-00h  
**Telefone**: (11) 98765-4321  
**Frete**: R$ 8,00 - R$ 15,00

### Produtos de Exemplo

1. **Pizza Margherita** - R$ 39,90 (Promoção: Pizza do Dia - 20% OFF)
2. **Burger Smash** - R$ 29,90
3. **Açaí 500ml** - R$ 24,90 (Promoção: Promoção Verão)
4. **Coca-Cola 350ml** - R$ 6,00
5. **Brownie de Chocolate** - R$ 15,90
6. **Pizza Calabresa** - R$ 42,90

### Opcionais

**Bordas**:
- Borda Recheada Catupiry: +R$ 5,00
- Borda Recheada Cheddar: +R$ 5,00

**Adicionais**:
- Extra Bacon: +R$ 4,00
- Cebola Caramelizada: +R$ 3,00
- Molho Especial: +R$ 2,00

**Complementos Açaí**:
- Granola: Grátis
- Leite em Pó: +R$ 2,00
- Morango: +R$ 3,00
- Banana: Grátis
- Paçoca: +R$ 2,50

### Cupons

- **SABOR10**: 10% de desconto no subtotal
- **FRETEGRATIS**: Frete grátis

---

## 🎯 Critérios de Aceite Atendidos

✅ Todas as 11 telas da especificação presentes  
✅ Hierarquia visual clara com tipografia consistente  
✅ Componentes padronizados e reutilizáveis  
✅ Fluxos navegáveis de ponta a ponta  
✅ Versões responsivas (mobile, tablet, desktop)  
✅ Design system definido (cores HSL, tokens semânticos)  
✅ Acessibilidade básica (contraste, área de toque)  
✅ Microinterações (hover, transições)  
✅ Dados fictícios populados  
✅ Máquina de estados de pedidos respeitada  
✅ Promoções com título customizável  
✅ Telefone como chave do CRM  
✅ Frete aleatório estimado  
✅ Checkout em 3 passos com stepper visual  
✅ Timeline de status animada  
✅ Interface desktop compacta para fila de pedidos  

---

## 🚀 Como Navegar no Mock

1. **Acesso Inicial**: A aplicação redireciona para `/cliente` (vitrine)

2. **Explorar como Cliente**:
   - Navegar produtos por categoria
   - Clicar em um produto para ver detalhes
   - Adicionar ao carrinho (com opcionais)
   - Ir para carrinho e aplicar cupom
   - Finalizar pedido (3 passos)
   - Ver confirmação com código do pedido

3. **Explorar como Admin**:
   - Acessar `/admin` e fazer login
   - Ver pedidos em tempo real em `/admin/pedidos`
   - Gerenciar catálogo em `/admin/catalogo`
   - Criar cupons em `/admin/cupons`
   - Ver métricas em `/admin/metricas`

4. **Explorar Desktop do Restaurante**:
   - Acessar `/desktop/fila`
   - Ver fila de pedidos em kanban
   - Alterar status dos pedidos
   - Testar notificações sonoras

---

## 📐 Responsividade

### Breakpoints

```css
Mobile: < 768px
Tablet: 768px - 1023px
Desktop: ≥ 1024px
```

### Estratégia Mobile-First

- Grid colapsa para 1 coluna no mobile
- Sidebar vira bottom sheet
- Tabs se ajustam automaticamente
- Cards empilhados verticalmente
- Menu inferior fixo para carrinho
- Admin com scroll horizontal em tabelas grandes

---

## 🎨 Paleta de Componentes Shadcn Utilizados

- Button (variantes: default, outline, ghost, secondary)
- Card (com CardHeader, CardTitle, CardContent)
- Input, Textarea, Label
- Select, Checkbox, Switch, RadioGroup
- Dialog, Sheet (drawer lateral)
- Tabs
- Badge
- Carousel
- Toast/Sonner (notificações)
- Separator

---

## 📝 Notas Técnicas

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS com design system customizado
- **Roteamento**: React Router v6
- **Componentes**: Shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Estado**: useState para mock (futuramente Context API ou Zustand)
- **Validação**: Não implementada neste mock (futuramente Zod + React Hook Form)

---

**Desenvolvido para o projeto acadêmico APSOO | 2025**
