import { Component, OnInit } from '@angular/core';
import { Category } from '@types';
import { CategoriesService } from '@shopati/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(id: string) {
    console.log("HEYYYYYYYYYYYYYY");

    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(id).subscribe(
          res => {
            this._getCategories();
    
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Category deleted !',
            })
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Category failed to delete.',
            })
          }
        );
      } 
    });
  }

  updateCategory(id: string) {
    this.router.navigateByUrl(`/categories/form/${id}`);
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}
