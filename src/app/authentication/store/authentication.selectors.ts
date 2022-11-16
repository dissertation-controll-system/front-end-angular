import { createSelector } from "@ngrx/store";
import { AuthenticationState } from './authentication.reducer';
import { User } from "../../shared/interfaces/user.interface";

export const authenticationFeatureKey = 'auth';

export interface AuthenticationSlice {
  [authenticationFeatureKey]: AuthenticationState;
}

export const selectUsername = createSelector(
  (state: AuthenticationSlice) => state[authenticationFeatureKey].user,
  (state?: User) => state?.username
)
