export type Item = {
    id: string;
    en: string;
    mm: string;
    img: string;
    cat: string;
  };
  
  export type CartLine = {
    productId: string;
    mmName: string;
    price: number;
    quantity: number;
    unit: string;
    totalPrice: number;
  };