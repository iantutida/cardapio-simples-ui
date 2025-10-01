// Types for the APSOO project

export type OrderStatus = 'RECEBIDO' | 'EM_PREPARO' | 'PRONTO' | 'ENTREGUE' | 'CANCELADO';
export type DeliveryMode = 'RETIRADA' | 'ENTREGA' | 'LOCAL';
export type CouponType = 'PERCENT' | 'FREESHIP';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  promo_flag: boolean;
  promo_banner_title?: string;
  active: boolean;
}

export interface AddonGroup {
  id: string;
  name: string;
  min: number;
  max: number;
  items: AddonItem[];
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addons: AddonItem[];
  notes?: string;
}

export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  validUntil: Date;
  usageCount: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  deliveryMode: DeliveryMode;
  address?: string;
  tableNumber?: string;
  status: OrderStatus;
  paymentConfirmed: boolean;
  createdAt: Date;
}
