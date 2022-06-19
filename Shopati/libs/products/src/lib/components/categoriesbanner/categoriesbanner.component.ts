import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '@types';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'shopati-categoriesbanner',
  templateUrl: './categoriesbanner.component.html',
  styles: [],
})
export class CategoriesbannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
        .getCategories()
        .pipe(takeUntil(this.endSubs$))
        .subscribe(categories => {
          this.categories = categories;
        });
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
