import { Injectable } from '@angular/core';
import { Cart, CartItem } from '@types';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart | null> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart = this.CART;

    const initCart = (cart) ? JSON.parse(cart) : { items: [] };

    localStorage.setItem(CART_KEY, JSON.stringify(initCart));
    this.cart$.next(initCart);
  }

  emptyCart() {
    const initCart: Cart = {
      items: [],
    };
    
    localStorage.setItem(CART_KEY, JSON.stringify(initCart));
    this.cart$.next(initCart);
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): boolean {
    if(typeof this.CART === 'string') {
      const cart: Cart = JSON.parse(this.CART as string);
      const cartItemExist = cart.items.find(item => item.productID === cartItem.productID);

      if(cartItemExist) {
        cart.items.map(item => {
          if(item.productID === cartItem.productID) {
            if(updateCartItem) {
              item.quantity = cartItem.quantity;
            } else {
              item.quantity += cartItem.quantity;
            }
            
            return;
          }
        });
      } else {
        cart.items.push(cartItem);
      }

      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      this.cart$.next(cart);
      return true;
    } else {
      return false;
    }
  }

  deleteCartItem(productID: string) {
    const cart = this.getCart();
    const newCart = cart?.items.filter((item) => item.productID != productID);

    if(cart?.items)
      cart.items = newCart as CartItem[];
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }

  private get CART(): string | null {
    return localStorage.getItem(CART_KEY);
  }

  getCart(): Cart | null {
    if(this.CART) {
      return JSON.parse(this.CART);
    } else {
      return null;
    }
  }
}
