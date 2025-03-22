import { Injectable } from "@angular/core";
import { IdentityApiHttpService } from "../common/base-identity-api-http.service";
import { Observable } from "rxjs";


@Injectable()
export class UserRoleApi {
  private readonly userRoleController: string = "v1/user-roles";

  constructor(private api: IdentityApiHttpService) {}

  getUserApplicationTypes(userId: string, institutionId: string): Observable<any> {
    return this.api.get(`${this.userRoleController}/user-application-types?userId=${userId}&institutionId=${institutionId}`);
  }
}