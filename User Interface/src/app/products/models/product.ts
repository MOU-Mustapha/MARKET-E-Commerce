export interface product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
export interface cartProduct {
  item: {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };
  quantity: number;
}
