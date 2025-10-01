# Mapa de Navegação - APSOO Cardápio Online

```
┌─────────────────────────────────────────────────────────────┐
│                      RAIZ (/)                               │
│                 Redireciona → /cliente                      │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
  ┌───────────┐       ┌───────────┐      ┌──────────────┐
  │  CLIENTE  │       │   ADMIN   │      │   DESKTOP    │
  └───────────┘       └───────────┘      └──────────────┘


═══════════════════════════════════════════════════════════════
                    FLUXO DO CLIENTE
═══════════════════════════════════════════════════════════════

/cliente
┌──────────────────────────────────────────────┐
│            VITRINE (HOME)                    │
│  • Header (logo, horário, contato)          │
│  • Carrossel de promoções                   │
│  • Filtro por categorias (chips)            │
│  • Grid de produtos (ProductCard)           │
│  • Sidebar/Bottom: CartSummary              │
└──────────────────────────────────────────────┘
                │
                │ [Click em produto]
                ▼
/cliente/produto/:id
┌──────────────────────────────────────────────┐
│        DETALHES DO PRODUTO                   │
│  • Imagem grande + badge promoção           │
│  • Descrição                                │
│  • Opcionais (checkbox, min/max)            │
│  • Observações (textarea)                   │
│  • Quantidade (stepper)                     │
│  • CTA: Adicionar ao Carrinho               │
└──────────────────────────────────────────────┘
                │
                │ [Adicionar ao carrinho]
                ▼
/cliente/carrinho
┌──────────────────────────────────────────────┐
│              CARRINHO                        │
│  • Lista de itens (imagem, nome, qty)       │
│  • Editar quantidade                        │
│  • Remover itens                            │
│  • Campo cupom (aplicar/remover)            │
│  • Resumo: subtotal, desconto, total        │
│  • CTA: Ir para Checkout                    │
└──────────────────────────────────────────────┘
                │
                │ [Finalizar pedido]
                ▼
/cliente/checkout
┌──────────────────────────────────────────────┐
│          CHECKOUT (3 PASSOS)                 │
│                                              │
│  [Stepper: 1 ─ 2 ─ 3]                       │
│                                              │
│  PASSO 1: Identificação                     │
│    • Nome                                   │
│    • Telefone (chave CRM)                   │
│                                              │
│  PASSO 2: Modalidade                        │
│    • Entrega (form endereço)                │
│    • Retirada                               │
│    • Local (nº mesa)                        │
│                                              │
│  PASSO 3: Revisão                           │
│    • Dados de identificação                 │
│    • Dados de entrega                       │
│    • Subtotal + Desconto + Frete = Total    │
│    • CTA: Confirmar Pedido                  │
└──────────────────────────────────────────────┘
                │
                │ [Confirmar]
                ▼
/cliente/confirmacao/:orderId
┌──────────────────────────────────────────────┐
│         CONFIRMAÇÃO / STATUS                 │
│  • Ícone de sucesso ✓                       │
│  • Código do pedido (ORD-XXX)               │
│  • OrderStatusTimeline                      │
│    (RECEBIDO → EM_PREPARO → PRONTO →        │
│     ENTREGUE / CANCELADO)                   │
│  • Card com dados do restaurante            │
│  • Botões: Voltar à Vitrine / Acompanhar    │
└──────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════
                     FLUXO DO ADMIN
═══════════════════════════════════════════════════════════════

/admin
┌──────────────────────────────────────────────┐
│              LOGIN ADMIN                     │
│  • Card centralizado                        │
│  • Email                                    │
│  • Senha                                    │
│  • Link: Esqueceu a senha?                  │
│  • CTA: Entrar                              │
└──────────────────────────────────────────────┘
                │
                │ [Login bem-sucedido]
                ▼
/admin/pedidos
┌──────────────────────────────────────────────┐
│         GESTÃO DE PEDIDOS (KANBAN)           │
│  ┌─────────┬─────────┬─────────┬─────────┐  │
│  │RECEBIDO │EM_PREP. │ PRONTO  │ENTREGUE │  │
│  │         │         │         │         │  │
│  │ Card    │ Card    │ Card    │ Card    │  │
│  │ Card    │ Card    │         │         │  │
│  └─────────┴─────────┴─────────┴─────────┘  │
│                                              │
│  [Click "Ver Detalhes" → Drawer Lateral]    │
│    • Alterar status (select)                │
│    • Toggle pagamento confirmado            │
│    • Lista de itens + opcionais             │
│    • Valores (subtotal, desconto, total)    │
└──────────────────────────────────────────────┘

/admin/catalogo
┌──────────────────────────────────────────────┐
│             CATÁLOGO                         │
│  [Tabs: Categorias | Produtos | Opcionais]  │
│                                              │
│  TAB CATEGORIAS:                            │
│    • Lista de categorias                    │
│    • Botão: Nova Categoria                  │
│                                              │
│  TAB PRODUTOS:                              │
│    • Campo de busca                         │
│    • Lista de produtos (foto, nome, preço)  │
│    • Badges: Promoção, Inativo              │
│    • Botão: Novo Produto                    │
│    • Modal de criação/edição (form completo)│
│                                              │
│  TAB OPCIONAIS:                             │
│    • Grupos de opcionais (min/max)          │
│    • Lista de itens + preços                │
│    • Botão: Novo Grupo                      │
└──────────────────────────────────────────────┘

/admin/cupons
┌──────────────────────────────────────────────┐
│          CUPONS DE DESCONTO                  │
│  • Lista de cupons:                         │
│    - Código (ex: SABOR10)                   │
│    - Tipo (PERCENT / FREESHIP)              │
│    - Validade                               │
│    - Contador de usos                       │
│  • Botão: Novo Cupom                        │
│  • Modal de criação/edição                  │
└──────────────────────────────────────────────┘

/admin/metricas
┌──────────────────────────────────────────────┐
│       MÉTRICAS E RELATÓRIOS                  │
│  ┌───────────┬──────────────┬──────────────┐ │
│  │Pedidos Hj │Faturamento Hj│Ticket Médio  │ │
│  │    24     │  R$ 1567,80  │  R$ 65,33    │ │
│  └───────────┴──────────────┴──────────────┘ │
│                                              │
│  Top 5 Produtos do Dia:                     │
│    1. Pizza Margherita    R$ 478,80         │
│    2. Burger Smash        R$ 538,20         │
│    3. Açaí 500ml          R$ 199,20         │
│    4. Coca-Cola           R$  90,00         │
│    5. Brownie             R$  95,40         │
│                                              │
│  Desempenho Semanal (lista de valores)      │
│  Métodos de Entrega (barras de progresso)   │
│                                              │
│  Botão: Exportar CSV                        │
└──────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════
                FLUXO DESKTOP (RESTAURANTE)
═══════════════════════════════════════════════════════════════

/desktop/fila
┌──────────────────────────────────────────────┐
│      FILA DE PEDIDOS (TEMPO REAL)            │
│  Header:                                     │
│    • Badge: X novos pedidos (pulsante)      │
│    • Toggle: Som Ativado/Desativado         │
│    • Botão: Testar Som                      │
│                                              │
│  [KANBAN: 3 Colunas]                        │
│  ┌───────────┬────────────┬──────────┐      │
│  │  NOVOS    │ EM PREPARO │  PRONTOS │      │
│  │ PEDIDOS   │            │          │      │
│  │           │            │          │      │
│  │  Card     │   Card     │   Card   │      │
│  │  [Iniciar]│[Pronto]    │[Entregar]│      │
│  │           │            │          │      │
│  │  Card     │            │          │      │
│  │  [Iniciar]│            │          │      │
│  └───────────┴────────────┴──────────┘      │
│                                              │
│  Cards compactos:                           │
│    • Código do pedido                       │
│    • Cliente + telefone                     │
│    • Modalidade (entrega/retirada/mesa)     │
│    • Valor total                            │
│    • Botão de ação rápida                   │
│    • Borda colorida por status              │
└──────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════
                   MÁQUINA DE ESTADOS
═══════════════════════════════════════════════════════════════

Status do Pedido (OrderStatus):

    RECEBIDO
       │
       ▼
   EM_PREPARO
       │
       ▼
     PRONTO
       │
       ▼
    ENTREGUE

   [Qualquer status pode ir para CANCELADO]

Regras:
• Fluxo linear obrigatório (não pode pular etapas)
• Admin pode alterar o status manualmente
• Desktop permite mudança rápida (botões de ação)
• Timeline visual mostra progresso no lado do cliente


═══════════════════════════════════════════════════════════════
                    COMPONENTES CHAVE
═══════════════════════════════════════════════════════════════

ProductCard          → Vitrine
PromoCarousel        → Vitrine
CategoryChips        → Vitrine
CartSummary          → Vitrine, Carrinho
StatusBadge          → Admin Pedidos, Desktop
OrderStatusTimeline  → Confirmação Cliente


═══════════════════════════════════════════════════════════════
                   DADOS E INTEGRAÇÕES
═══════════════════════════════════════════════════════════════

Mock Data (src/data/mockData.ts):
• restaurantInfo
• categories
• products (6 produtos de exemplo)
• addonGroups (bordas, adicionais, complementos)
• coupons (SABOR10, FRETEGRATIS)
• sampleOrders (2 pedidos de exemplo)

Types (src/types/index.ts):
• Product
• AddonGroup, AddonItem
• CartItem
• Coupon
• Order
• OrderStatus (enum)
• DeliveryMode (enum)
• CouponType (enum)
```

---

**Nota**: Este mapa representa os wireframes/mocks estáticos. Em produção, os dados viriam de um backend (Supabase/API) e haveria autenticação real, validações, pagamentos online, etc.

**Projeto Acadêmico APSOO | 2025**
