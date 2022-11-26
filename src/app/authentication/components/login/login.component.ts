import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/interfaces/app-state.interface';
import { login } from '../../store/authentication.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  onSubmit(): void {
    this.store.dispatch(
      login({
        username: this.loginForm.controls['username'].value!,
        password: this.loginForm.controls['password'].value!
      })
    );
  }
}
