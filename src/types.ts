export interface Product {
  id: string;
  mmName: string;
  price: number;
  unit: string;
  category: string;
  icon?: string;
}

export interface CartLine {
  productId: string;
  mmName: string;
  price: number;
  quantity: number;
  unit: string;
  totalPrice: number;
}