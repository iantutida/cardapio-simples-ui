import { Product, AddonGroup, Coupon, Order } from '@/types';

export const restaurantInfo = {
  name: "Sabor & Arte",
  tagline: "Delícias artesanais feitas com amor",
  primaryColor: "#4F46E5",
  secondaryColor: "#14B8A6",
  hours: "Seg-Sex: 11h-23h | Sáb-Dom: 12h-00h",
  phone: "(11) 98765-4321",
  freteMin: 8,
  freteMax: 15,
};

export const categories = [
  "Todos",
  "Pizzas",
  "Burgers",
  "Açaís",
  "Bebidas",
  "Sobremesas"
];

export const products: Product[] = [
  {
    id: "1",
    name: "Pizza Margherita",
    description: "Molho de tomate artesanal, mussarela de búfala, manjericão fresco e azeite extravirgem",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
    category: "Pizzas",
    promo_flag: true,
    promo_banner_title: "Pizza do Dia - 20% OFF",
    active: true
  },
  {
    id: "2",
    name: "Burger Smash",
    description: "Blend 180g smash, queijo cheddar, cebola caramelizada, picles e molho especial",
    price: 29.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    category: "Burgers",
    promo_flag: false,
    active: true
  },
  {
    id: "3",
    name: "Açaí 500ml",
    description: "Açaí puro batido com banana, acompanha granola, banana e mel",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop",
    category: "Açaís",
    promo_flag: true,
    promo_banner_title: "Promoção Verão",
    active: true
  },
  {
    id: "4",
    name: "Coca-Cola 350ml",
    description: "Refrigerante gelado",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&h=600&fit=crop",
    category: "Bebidas",
    promo_flag: false,
    active: true
  },
  {
    id: "5",
    name: "Brownie de Chocolate",
    description: "Brownie artesanal com chocolate belga e nozes",
    price: 15.90,
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&h=600&fit=crop",
    category: "Sobremesas",
    promo_flag: false,
    active: true
  },
  {
    id: "6",
    name: "Pizza Calabresa",
    description: "Molho de tomate, mussarela, calabresa artesanal e cebola",
    price: 42.90,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
    category: "Pizzas",
    promo_flag: false,
    active: true
  }
];

export const addonGroups: AddonGroup[] = [
  {
    id: "1",
    name: "Borda (escolha 1)",
    min: 0,
    max: 1,
    items: [
      { id: "a1", name: "Borda Recheada Catupiry", price: 5.00 },
      { id: "a2", name: "Borda Recheada Cheddar", price: 5.00 }
    ]
  },
  {
    id: "2",
    name: "Adicionais",
    min: 0,
    max: 5,
    items: [
      { id: "a3", name: "Extra Bacon", price: 4.00 },
      { id: "a4", name: "Cebola Caramelizada", price: 3.00 },
      { id: "a5", name: "Molho Especial", price: 2.00 }
    ]
  },
  {
    id: "3",
    name: "Complementos Açaí (até 3)",
    min: 0,
    max: 3,
    items: [
      { id: "a6", name: "Granola", price: 0.00 },
      { id: "a7", name: "Leite em Pó", price: 2.00 },
      { id: "a8", name: "Morango", price: 3.00 },
      { id: "a9", name: "Banana", price: 0.00 },
      { id: "a10", name: "Paçoca", price: 2.50 }
    ]
  }
];

export const coupons: Coupon[] = [
  {
    code: "SABOR10",
    type: "PERCENT",
    value: 10,
    validUntil: new Date("2025-12-31"),
    usageCount: 45
  },
  {
    code: "FRETEGRATIS",
    type: "FREESHIP",
    value: 0,
    validUntil: new Date("2025-06-30"),
    usageCount: 23
  }
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "João Silva",
    customerPhone: "(11) 98765-4321",
    items: [
      {
        product: products[0],
        quantity: 1,
        addons: [
          { id: "a1", name: "Borda Recheada Catupiry", price: 5.00 }
        ],
        notes: "Sem cebola"
      }
    ],
    subtotal: 39.90,
    discount: 0,
    shipping: 10.00,
    total: 49.90,
    deliveryMode: "ENTREGA",
    address: "Rua das Flores, 123 - Centro",
    status: "RECEBIDO",
    paymentConfirmed: false,
    createdAt: new Date()
  },
  {
    id: "ORD-002",
    customerName: "Maria Santos",
    customerPhone: "(11) 91234-5678",
    items: [
      {
        product: products[1],
        quantity: 2,
        addons: [
          { id: "a3", name: "Extra Bacon", price: 4.00 }
        ]
      }
    ],
    subtotal: 59.80,
    discount: 5.98,
    shipping: 0,
    total: 53.82,
    deliveryMode: "RETIRADA",
    status: "EM_PREPARO",
    paymentConfirmed: true,
    createdAt: new Date()
  }
];
