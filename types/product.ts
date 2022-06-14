import { Category } from "./category";

export interface Product {
    id?: string;
    name: string;
    image?: string;
    images?: string[];
    price: string | number;
    countInStock: string | number;
    category: Category;
    description: string;
    richDescription?: string;
    brand?: string;
    rating?: number;
    numReviews?: number;
    isFeatured: boolean;
    dateCreated?: string | Date;
}