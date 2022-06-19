import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@shopati/users';
import { User } from '@types';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

@Component({
  selector: 'admin-usersform',
  templateUrl: './usersform.component.html',
  styles: [],
})
export class UsersformComponent implements OnInit {
  // @ts-ignore
  form: FormGroup

  isSubmitted = false;

  editMode = false;

  currentUserID = '';

  countries: { id: string, name: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._checkEditMode();
  }

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));

    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' }))
                          .map(entry => ({
                            id: entry[0],
                            name: entry[1],
                          }))
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if(params['id']) {
        this.editMode = true;

        this.currentUserID = params['id'];

        this.usersService.getUser(params['id']).subscribe(user => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['apartment'].setValue(user.apartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['country'].setValue(user.country);

          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }

    const user: User = {
      id: this.currentUserID,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
      password: this.userForm['password'].value,
    }

    if(this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  onCancel() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'User is updated!',
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'User is not updated!',
        })
      }
    )
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: `User is ${user.name} is created`,
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'User is not created!',
        });
      }
    );
  }
}
