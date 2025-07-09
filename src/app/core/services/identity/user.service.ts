import { Injectable } from "@angular/core";
import { IdentityApiHttpService } from "../common/base-identity-api-http.service";
import { Observable } from "rxjs";
import { User } from "../../Models/identity/user";
import { RequestHelper } from "../common/service-request-helper";
import { UserLogin } from "../../Models/identity/user-login";

@Injectable({ providedIn: 'root'})
export class UserService {
  private readonly controller: string = "v1/users";
  private readonly user_role_controller: string = "v1/user-roles";


  constructor(private apiService: IdentityApiHttpService) {}

  registerUser(data: User): Observable<any> {
    return this.apiService.post(`${this.controller}/user`, RequestHelper.createServiceRequest(data));
  }

  loginUser(data: UserLogin): Observable<any> {
    return this.apiService.post(`${this.controller}/auth/login`, RequestHelper.createServiceRequest(data));
  }

  whatsAppLogin(data: any): Observable<any> {
    return this.apiService.post(`${this.controller}/auth/otpless/login`, RequestHelper.createServiceRequest(data));
  }

  getUserApplicationTypes(userId: string, institutionId: string): Observable<any> {
    return this.apiService.get(`${this.user_role_controller}/user-application-types?userId=${userId}&institutionId=${institutionId}`);
  }
}