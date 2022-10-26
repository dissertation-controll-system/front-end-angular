import { Inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  AuthorizationResponseDTO,
  LoginRequestDTO,
  SignupRequestDTO
} from "../interfaces/authentication-dto.interface";
import { API_URL_TOKEN } from "../constants/api-url.token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, @Inject(API_URL_TOKEN) private apiURL: string) {}

  login(loginBody: LoginRequestDTO): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.apiURL}/login`, loginBody);
  }

  signup(signupBody: SignupRequestDTO): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.apiURL}/signup`, signupBody);
  }

  tokenRefresh(refresh_token: string): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.apiURL}/token-refresh`, { refresh_token });
  }
}
