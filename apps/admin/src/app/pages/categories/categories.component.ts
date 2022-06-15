import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '@types';
import { CategoriesService } from '@shopati/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  endSubs$: Subject<any> = new Subject()

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(id).subscribe(
          () => {
            this._getCategories();
    
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Category deleted !',
            })
          },
          () => {
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
    this.categoriesService
        .getCategories()
        .pipe(takeUntil(this.endSubs$))
        .subscribe(categories => {
          this.categories = categories;
        });
  }
}
