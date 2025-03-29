import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/general/token.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InstitutionService } from '../services/identity/institution.service';
import { switchMap } from 'rxjs/operators';
import { filter, take } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private tokenService: TokenService, private router: Router, private institutionService: InstitutionService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    if (!this.tokenService.getRefreshToken()) {
                        this.tokenService.clearSessionData();
                        this.router.navigate(["/auth/login"]);
                    } else {
                        return this.handle401Error(request, next);
                    }
                } else if (error.status === 403) {
                    this.router.navigate(['/auth/errors/unauthorized']);
                }
                return throwError(() => error);
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({setHeaders: {Authorization: `Bearer ${token}` }});}
    

      private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.institutionService.generateToken(this.tokenService.getRefreshToken()!).pipe(
                switchMap((response: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(response.data.jwtToken.value);
                    return next.handle(this.addToken(request, response.data.jwtToken.value));
                }),
                catchError((err) => {
                    this.isRefreshing = false;
                    this.tokenService.clearSessionData();
                    this.router.navigate(["/auth/login"]);
                    return throwError(() => err);
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => next.handle(this.addToken(request, token!)))
            );
        }
    }
}
