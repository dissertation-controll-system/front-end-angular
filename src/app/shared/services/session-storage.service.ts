import { Injectable } from '@angular/core';
import { User } from "../interfaces/user.interface";

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refresh-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user?.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user) as User;
    }
    return null
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  isLoggedIn() {
    const token = this.getToken();
    if(token) {
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      return parsedPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
