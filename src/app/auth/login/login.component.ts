import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validator, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  get usernameForm(): AbstractControl {
    return this.loginForm.get('username') as AbstractControl
  }

  get passwordForm(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl
  }

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(value => {
      console.log(value)
      /*
      * Enter Your token in this variable (for test only)
      * */
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiwic2NwIjpbXSwiZXhwIjoxNjYzMjY3NzMyLCJpYXQiOjE2NjMyNjcxMzJ9.ZtBDgLoC4-8IwyQ54G_lX2DHRlXkju6RrnhFkMHhnHc';
      this.http.get('http://localhost:4200/api/faculty/1', {
        headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
      }).subscribe(value => console.log(value));
    });
  }
}
