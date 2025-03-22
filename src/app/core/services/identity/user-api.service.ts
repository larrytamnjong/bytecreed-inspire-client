import { Injectable } from "@angular/core";
import { IdentityApiHttpService } from "../common/base-identity-api-http.service";
import { Observable } from "rxjs";
import { User } from "../../Models/identity/user";
import { RequestHelper } from "../common/request-helper";
import { UserLogin } from "../../Models/identity/user-login";


@Injectable()
export class UserApi {
  private readonly controller: string = "v1/users";

  constructor(private api: IdentityApiHttpService) {}

  registerUser(data: User): Observable<any> {
    return this.api.post(`${this.controller}/user`, RequestHelper.createServiceRequest(data));
  }

  loginUser(data: UserLogin): Observable<any> {
    return this.api.post(`${this.controller}/auth/login`, RequestHelper.createServiceRequest(data));
  }

  generateToken(refreshToken: string): Observable<any> {
    return this.api.post(`v1/institution-login-sessions/token`, RequestHelper.createServiceRequest({value: refreshToken}));
  }
}