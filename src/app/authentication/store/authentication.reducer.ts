import { createReducer, on } from '@ngrx/store';
import { loginFailed, loginSuccess, logout, signup, signupFailed, signupSuccess } from './authentication.action';
import { User } from '../../shared/interfaces/user.interface';

export interface AuthenticationState {
  user?: User;
  isAuthenticated: boolean;
}

export const initialState: AuthenticationState = {
  isAuthenticated: false
};

export const authenticationReducer = createReducer<AuthenticationState>(
  initialState,
  on(loginSuccess, (state, action) => ({
    user: {
      id: action.id,
      username: action.username,
      roles: action.roles,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken
    },
    isAuthenticated: true
  })),
  on(loginFailed, () => ({ ...initialState, isAuthenticated: false })),
  on(logout, () => ({ ...initialState, isAuthenticated: false })),
  on(signupSuccess, (state, action) => ({
    user: {
      id: action.id,
      username: action.username,
      roles: action.roles,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken
    },
    isAuthenticated: true
  })),
  on(signupFailed, () => ({ ...initialState, isAuthenticated: false}))
);
