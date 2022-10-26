import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { SessionStorageService } from "../services/session-storage.service";
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { AuthorizationResponseDTO } from "../interfaces/authentication-dto.interface";
import { Router } from "@angular/router";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshToken$ = new BehaviorSubject<string | null>(null);

  constructor(
    private sessionStorageService: SessionStorageService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authRequest = request;
    const token = this.sessionStorageService.getToken();
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
      this.refreshToken$.next(null);

      const token = this.sessionStorageService.getRefreshToken();

      if (token)
        return this.authService.tokenRefresh(token).pipe(
          switchMap((response: AuthorizationResponseDTO) => {
            this.sessionStorageService.saveToken(response.tokens.access_token);
            this.refreshToken$.next(response.tokens.access_token);

            return next.handle(this.addTokenHeader(request, response.tokens.refresh_token));
          }),
          catchError((err) => {
            this.sessionStorageService.signOut();
            this.router.navigate(['/login']);

            return throwError(err);
          }),
          finalize(() => {
            this.isRefreshing = false;
          }),
        );
    }

    return this.refreshToken$.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string | null) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}
