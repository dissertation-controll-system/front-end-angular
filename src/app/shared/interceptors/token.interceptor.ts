import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { TokenStorageService } from "../services/token-storage.service";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { AuthorizationResponseDTO } from "../interfaces/authentication-dto.interface";
import { Router } from "@angular/router";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authRequest = request;
    const token = this.tokenService.getToken();
    if (token != null) {
      authRequest = this.addTokenHeader(request, token);
    }

    return next.handle(authRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && !authRequest.url.includes('/login') && error.status === 401) {
          return this.handle401Error(authRequest, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();

      if (token)
        return this.authService.tokenRefresh(token).pipe(
          switchMap((response: AuthorizationResponseDTO) => {
            this.isRefreshing = false;

            this.tokenService.saveToken(response.tokens.access_token);
            this.refreshTokenSubject.next(response.tokens.access_token);

            return next.handle(this.addTokenHeader(request, response.tokens.refresh_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.tokenService.signOut();
            this.router.navigate(['/login']);
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}
