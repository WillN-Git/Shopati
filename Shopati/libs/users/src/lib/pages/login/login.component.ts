import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'shopati-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  loginFormGroup: FormGroup;

  isSubmitted = false;

  authError = false;

  authErrorMessage = 'Email and/or password is wrong.';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginFormGroup.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe((user) => {
          this.authError = false;
          if(user.token) {
            this.localstorageService.setToken(user.token);
          }
          this.router.navigate(['/']);
        }, (error: HttpErrorResponse) => {
          this.authError = true;

          if(error.status !== 400) {
            this.authErrorMessage = 'Error in the server, please try again later!';
          }
        })
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
