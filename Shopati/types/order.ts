import { OrderItem, User } from './';

export interface Order {
    id?: string;
    orderItems: OrderItem | OrderItem[];
    shippingAddress1: string;
    shippingAddress2?: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    status: number;
    totalPrice?: string;
    user: User | string;
    dateOrdered?: string;
}