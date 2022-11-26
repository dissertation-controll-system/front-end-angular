import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authenticationReducer } from './store/authentication.reducer';
import { authenticationFeatureKey } from './store/authentication.selectors';
import { AuthenticationEffects } from './store/authentication.effect';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    StoreModule.forFeature(authenticationFeatureKey, authenticationReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
    StoreDevtoolsModule.instrument({
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  exports: [LoginComponent],
  providers: [HttpClient]
})
export class AuthModule {}
