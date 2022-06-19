import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@shopati/products';
import { MessageService } from 'primeng/api';
import { Category, Product } from '@types';

@Component({
  selector: 'admin-productsform',
  templateUrl: './productsform.component.html',
})
export class ProductsformComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;

  isSubmitted = false;

  editMode = false;

  currentProductID = '';

  categories: Category[] = [];

  imageDisplay: string | ArrayBuffer = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe( cats => {
      this.categories = cats;
    })
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'successs',
          detail: `Product ${product.name} is created!`,
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Product is not created!',
        });
      }
    );
  }

  private _updateProduct(productData: FormData) {
    this.productsService
        .updateProduct(productData, this.currentProductID)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Product is updated!',
            });

            setTimeout(() => {
              this.location.back();
            })
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Product is not updated!',
            });
          }
        );
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editMode = true;

        this.currentProductID = params['id'];

        this.productsService
            .getProduct(params['id'])
            .subscribe( prod => {
              this.productForm['name'].setValue(prod.name);
              this.productForm['price'].setValue(prod.price);
              this.productForm['brand'].setValue(prod.brand);
              this.productForm['description'].setValue(prod.description);
              this.productForm['countInStock'].setValue(prod.countInStock);
              this.productForm['isFeatured'].setValue(prod.isFeatured);
              this.productForm['richDescription'].setValue(prod.richDescription);
              this.productForm['category'].setValue(prod.category.id);
              this.imageDisplay = prod.image as string;
              this.productForm['image'].setValidators([]);
              this.productForm['image'].updateValueAndValidity();
            });
      }
    })
  }

  // @ts-ignore
  onImageUpload(event) {
    const file = event.target.files[0];


    if(file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();


      const fileReader =  new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string | ArrayBuffer;
      }
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productForm).map(key => {
      productFormData.append(key, this.productForm[key].value)
    });
    
    if(this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  onCancel() {
    this.location.back();
  }
}
