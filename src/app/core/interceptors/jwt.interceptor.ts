import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { TokenService } from '../services/general/token.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService,public router:Router) { }

    intercept( request: HttpRequest<any>, next: HttpHandler) {
        if (this.tokenService.isTokenValid()) {
            const token = this.tokenService.getToken();
            request = request.clone({setHeaders: { Authorization: `Bearer ${token}`,},});
            return next.handle(request);
          }else{
            return next.handle(request);
          }
    }
}
