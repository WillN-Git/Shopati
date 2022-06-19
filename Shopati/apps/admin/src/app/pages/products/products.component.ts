import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@shopati/products';
import { Product } from '@types'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }

  deleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(id).subscribe(
          () => {
            this._getProducts();

            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Product is deleted !',
            })
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Product failed to delete.',
            })
          }
        );
      }
    });
  }

  updateProduct(id: string) {
    this.router.navigateByUrl(`/products/form/${id}`);
  }

  private _getProducts() {
    this.productsService
        .getProducts()
        .pipe(takeUntil(this.endSubs$))
        .subscribe(prod => {
          this.products = prod;
        });
  }
}
