import { Injectable } from "@angular/core";
import { IdentityApiHttpService } from "../common/base-identity-api-http.service";
import { Observable } from "rxjs";
import { RequestHelper } from "../common/service-request-helper";


@Injectable({ providedIn: 'root'})
export class InstitutionService {
  private readonly institution_user_controller: string = "v1/institution-users";
  private readonly institution_login_session: string = "v1/institution-login-sessions";

  constructor(private identityApiService: IdentityApiHttpService) {}

  getUserInstitutions(userId: string): Observable<any> {
    return this.identityApiService.get(`${this.institution_user_controller}/users/${userId}/institutions`);
  }

  logInToInstitution(institutionId: string, applicationType?: number): Observable<any> {
    return this.identityApiService.post(`${this.institution_user_controller}/user/institutions/${institutionId}/login?applicationType=${applicationType}`, {});
  }

  generateToken(refreshToken: string): Observable<any> {
    return this.identityApiService.post(`${this.institution_login_session}/token`, RequestHelper.createServiceRequest({value: refreshToken}));
  }
}