import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '@shopati/products';
import { Category } from '@types';

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}
