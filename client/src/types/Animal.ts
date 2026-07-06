export interface Animal {
  _id: string;
  category: string;
  breed: string;
  age: number;
  gender: string;
  weight?: number;
  price: number;
  description?: string;
  photoUrl?: string;
  location: string;
  sellerName: string;
  sellerContact: string;
  status: string;
  createdAt: string;
}
