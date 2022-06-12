import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@types';
import { CategoriesService } from '@shopati/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categoriesform',
  templateUrl: './categoriesform.component.html',
  styles: [],
})
export class CategoriesformComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;

  isSubmitted = false;

  editMode = false;

  currentCategoryID = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    })

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryID,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value,
    } 

    if(this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  onCancel() {
    this.location.back();
  }

  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editMode = true;

        this.currentCategoryID = params['id'];

        this.categoriesService
            .getCategoryId(params['id'])
            .subscribe( cat => {
              this.categoryForm['name'].setValue(cat.name);
              this.categoryForm['icon'].setValue(cat.icon);
              this.categoryForm['color'].setValue(cat.color);
            });
      }
    })
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      res => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Category is updated!',
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Category is not updated!',
        });
      }
    );
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      res => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Category is created!',
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Category is not created!',
        });
      }
    );
  }
}
