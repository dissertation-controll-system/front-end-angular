import { createAction, props } from '@ngrx/store';
import {
  AuthorizationResponseDTO,
  LoginRequestDTO,
  SignupRequestDTO
} from "../../shared/interfaces/authentication-dto.interface";
import { User } from "../../shared/interfaces/user.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const enum AuthenticationAction {
  Login = '[Authentication] Login',
  LoginSuccess = '[Authentication] Login Success',
  LoginFailed = '[Authentication] Login Failed',
  Logout = '[Authentication] Logout',
  Signup = '[Authentication] Signup',
  SignupSuccess = '[Authentication] Signup Success',
  SignupFailed = '[Authentication] Signup Failed',
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

export const signup = createAction(
  AuthenticationAction.Signup,
  props<SignupRequestDTO>()
);

export const signupSuccess = createAction(
  AuthenticationAction.SignupSuccess,
  props<User>()
);

export const signupFailed = createAction(
  AuthenticationAction.SignupFailed,
  props<{ errorResponse: HttpErrorResponse }>()
);
