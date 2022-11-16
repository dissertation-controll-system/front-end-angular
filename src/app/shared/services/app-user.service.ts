import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL_TOKEN } from "../constants/api-url.token";
import { AppUserResponseDTO, AppUserUpdateDTO } from "../interfaces/app-user-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient, @Inject(API_URL_TOKEN) private apiUrl: string) { }

  getCurrentUserInfo(): Observable<AppUserResponseDTO> {
    return this.http.get<AppUserResponseDTO>(`${this.apiUrl}/app-users/current`);
  }

  updateCurrentUserInfo(userId: number, appUserInfo: AppUserUpdateDTO): Observable<AppUserResponseDTO> {
    return this.http.put<AppUserResponseDTO>(`${this.apiUrl}/app-users/${userId}`, appUserInfo);
  }

}
