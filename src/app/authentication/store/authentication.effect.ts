import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { login, loginFailed, loginSuccess, logout, signup, signupFailed, signupSuccess } from './authentication.action';
import { AuthenticationService } from '../../shared/services/authentication.service';
import {
  AuthorizationResponseDTO,
  LoginRequestDTO,
  SignupRequestDTO
} from '../../shared/interfaces/authentication-dto.interface';
import { SessionStorageService } from "../../shared/services/session-storage.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap((action: LoginRequestDTO) =>
      this.authenticationService.login({ username: action.username, password: action.password }).pipe(
        map((response: AuthorizationResponseDTO) => loginSuccess({
          id: response.account.id,
          username: action.username,
          roles: response.account.roles,
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token
        })),
        catchError(errorResponse => of(loginFailed({ errorResponse })))
      )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(user => {
      this.sessionStorageService.saveToken(user.accessToken);
      this.sessionStorageService.saveRefreshToken(user.refreshToken);
      this.sessionStorageService.saveUser(user);
      this.router.navigate(['/dashboard']).then(() => {
        this.toastrService.success('Ви успішно увійшли у систему');
      });
    })
  ), { dispatch: false });

  loginFailed$ = createEffect(() => this.actions$.pipe(
    ofType(loginFailed),
    map(props => props.errorResponse.error.error),
    tap(error => {
      this.toastrService.error(error);
    })
  ), { dispatch: false });

  logout$ =  createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      this.router.navigate(['/login']).then(() => {
        this.toastrService.info('Закінчився термін дії сессії')
      });
      this.sessionStorageService.signOut();
    })
  ), { dispatch: false });

  signup$ =  createEffect(() => this.actions$.pipe(
    ofType(signup),
    switchMap((action: SignupRequestDTO) =>
      this.authenticationService.signup({
        username: action.username,
        email: action.email,
        password: action.password
      }).pipe(
        map((response: AuthorizationResponseDTO) => signupSuccess({
          id: response.account.id,
          username: action.username,
          roles: response.account.roles,
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token
        })),
        catchError(errorResponse => of(signupFailed({ errorResponse })))
      )
    )
  ));

  signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(signupSuccess),
    tap(user => {
      this.sessionStorageService.saveToken(user.accessToken);
      this.sessionStorageService.saveRefreshToken(user.refreshToken);
      this.sessionStorageService.saveUser(user);
      this.router.navigate(['/dashboard']).then(() => {
        this.toastrService.success('Ви успішно зареєструвалися');
      });
    })
  ), { dispatch: false });

  signupFailed$ = createEffect(() => this.actions$.pipe(
    ofType(signupFailed),
    map(props => {
      return props.errorResponse.error.error
    }),
    tap(error => {
      this.toastrService.error(error);
    })
  ), { dispatch: false });
}
