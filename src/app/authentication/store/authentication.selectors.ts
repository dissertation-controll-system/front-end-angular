import { AuthenticationState } from './authentication.reducer';

export const authenticationFeatureKey = 'auth';

export interface AuthenticationSlice {
  [authenticationFeatureKey]: AuthenticationState;
}
