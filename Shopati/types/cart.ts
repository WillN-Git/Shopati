export interface Cart {
    items: CartItem[];
}

export interface CartItem {
    productID: string;
    quantity: number;
}

export interface CartItemDetailed {
    product: any;
    quantity: number;
}