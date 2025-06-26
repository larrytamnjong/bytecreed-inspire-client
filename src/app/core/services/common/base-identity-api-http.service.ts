import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root'})
  export class IdentityApiHttpService {
    constructor(private http: HttpClient) {}
  
    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
      });
      return headers;
    }
  
    get(endpoint: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<any> {
      return this.http.get(`${environment.IDENTITY_SERVER_URL}/${endpoint}`, {
        ...options, headers: this.getHeaders(),
      });
    }
  
    post(endpoint: string, data: any, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<any> {
      return this.http.post(`${environment.IDENTITY_SERVER_URL}/${endpoint}`, data, {
        ...options, headers: this.getHeaders(),
      });
    }
  
    put(endpoint: string, data: any, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<any> {
      return this.http.put(`${environment.IDENTITY_SERVER_URL}/${endpoint}`, data, {
        ...options, headers: this.getHeaders(),
      });
    }
  
    delete(endpoint: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<any> {
      return this.http.delete(`${environment.IDENTITY_SERVER_URL}/${endpoint}`, {
        ...options, headers: this.getHeaders(),
      });
    }
  }