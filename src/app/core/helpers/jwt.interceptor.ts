import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { TokenService } from '../services/authentication/token-service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private tokenService: TokenService,
        public router:Router
    ) { }

    intercept( request: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
      
        if (this.tokenService.generateToken()) {
            const token = this.tokenService.getToken();
            if (token) { 
                request = request.clone({setHeaders: { Authorization: `Bearer ${token}`,},});
            }
          }
          
          return next.handle(request).pipe(
            catchError((error) => {
              if (error.status === 401) {
                this.tokenService.signOut();
                this.router.navigate(['/auth/login']);
              }
              return throwError(() => error); 
            })
          );
    }
}
