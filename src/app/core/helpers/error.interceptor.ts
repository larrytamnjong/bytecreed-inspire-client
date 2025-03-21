import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/authentication/token-service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.tokenService.signOut();
                location.reload();
            }else if (err.status === 403) {
                this.router.navigate(["/auth/errors/unauthorized"]);
            }
            const error = err.error.message || err.statusText;
            return  throwError(() => error); 
        }))
    }
}
