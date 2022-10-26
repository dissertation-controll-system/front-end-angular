import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/interfaces/app-state.interface';
import { login } from '../../store/authentication.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void { }

  onSubmit() {
    this.store.dispatch(
      login({
        username: this.loginForm.controls['username'].value!,
        password: this.loginForm.controls['password'].value!
      })
    );
  }
}
