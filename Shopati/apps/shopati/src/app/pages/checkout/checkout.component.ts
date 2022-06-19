import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, OrdersService } from '@shopati/orders';
import { UsersService } from '@shopati/users';
import { Cart, Order, OrderItem } from '@types';

@Component({
  selector: 'shopati-checkout',
  templateUrl: './checkout.component.html',
  styles: [],
})
export class CheckoutComponent implements OnInit {
  // @ts-ignore
  checkoutFormGroup: FormGroup;

  isSubmitted = false;

  orderItems: OrderItem[] = [];

  userId = '609d65943373711346c5e950';
  
  countries: { id: string; name: string; }[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart() as Cart;

    this.orderItems = cart.items.map(item => ({
      product: item.productID,
      quantity: item.quantity,
    }));
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();

    console.log("COUNTRIES => ", this.countries);
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if(this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        // Redirect to thank you page (payment)
        this.cartService.emptyCart();
        this.router.navigate(['/thankyou']);
      },
      () => {
        // Display some message to user
      }
    )
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
