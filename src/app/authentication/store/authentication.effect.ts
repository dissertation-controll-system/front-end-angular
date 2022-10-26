import { login, loginFailed, loginSuccess, logout } from './authentication.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AuthorizationResponseDTO, LoginRequestDTO } from '../../shared/interfaces/authentication-dto.interface';
import { SessionStorageService } from "../../shared/services/session-storage.service";

@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private sessionStorageService: SessionStorageService,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap((action: LoginRequestDTO) =>
      this.authenticationService.login({ username: action.username, password: action.password }).pipe(
        tap((response) => {
          console.log(response)
        }),
        map((response: AuthorizationResponseDTO) => loginSuccess({
          id: response.account.id,
          username: action.username,
          roles: response.account.roles,
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token
        })),
        catchError((error) => of(loginFailed({ error })))
      )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(user => {
      console.log(user);
      this.sessionStorageService.saveToken(user.accessToken);
      this.sessionStorageService.saveRefreshToken(user.refreshToken);
      this.sessionStorageService.saveUser(user);
    })
  ), { dispatch: false });

  loginFailed$ = createEffect(() => this.actions$.pipe(
    ofType(loginFailed)
  ), { dispatch: false });

  logout$ =  createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      this.sessionStorageService.signOut();
    })
  ))
}
