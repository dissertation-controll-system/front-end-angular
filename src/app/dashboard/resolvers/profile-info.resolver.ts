import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUserService } from "../../shared/services/app-user.service";
import { AppUserResponseDTO } from "../../shared/interfaces/app-user-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoResolver implements Resolve<AppUserResponseDTO> {

  constructor(private appUserService: AppUserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppUserResponseDTO> {
    return this.appUserService.getCurrentUserInfo();
  }
}
