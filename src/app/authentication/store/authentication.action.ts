import { createAction, props } from '@ngrx/store';
import { LoginRequestDTO } from "../../shared/interfaces/authentication-dto.interface";
import { User } from "../../shared/interfaces/user.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorResponseDTO } from "../../shared/interfaces/api.interface";

export const enum AuthenticationAction {
  Login = '[Authentication] Login',
  LoginSuccess = '[Authentication] Login Success',
  LoginFailed = '[Authentication] Login Failed',
  Logout = '[Authentication] Logout'
}

export const login = createAction(
  AuthenticationAction.Login,
  props<LoginRequestDTO>()
);
export const loginSuccess = createAction(
  AuthenticationAction.LoginSuccess,
  props<User>()
);
export const loginFailed = createAction(
  AuthenticationAction.LoginFailed,
  props<{ errorResponse: HttpErrorResponse }>()
);
export const logout = createAction(AuthenticationAction.Logout);
