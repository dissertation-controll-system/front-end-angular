import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL_TOKEN } from "../constants/api-url.token";
import { Observable } from "rxjs";
import { AccountResponseDTO } from "../interfaces/account-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, @Inject(API_URL_TOKEN) private apiUrl: string) { }

  getCurrentAccount(): Observable<AccountResponseDTO> {
    return this.http.get<AccountResponseDTO>(`${this.apiUrl}/accounts/current`);
  }

}
