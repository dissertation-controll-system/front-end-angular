import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { signup } from "../../store/authentication.action";
import { Store } from "@ngrx/store";
import { AppState } from "../../../shared/interfaces/app-state.interface";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm = this.fb.group({
    username: ['', [Validators.pattern(new RegExp( '^[a-z](?:[a-z\d]|_(?=[a-z\d])){3,38}$')), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s])[\x00-\xFF]{6,}$')), Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  onSubmit(): void {
    this.store.dispatch(
      signup({
        username: this.registrationForm.controls['username'].value!,
        email: this.registrationForm.controls['email'].value!,
        password: this.registrationForm.controls['password'].value!
      })
    );
  }

}
