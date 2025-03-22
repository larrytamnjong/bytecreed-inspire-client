import { Injectable } from "@angular/core";
import { IdentityApiHttpService } from "../common/base-identity-api-http.service";
import { Observable } from "rxjs";


@Injectable()
export class InstitutionApi {
  private readonly institutionUserController: string = "v1/institution-users";

  constructor(private api: IdentityApiHttpService) {}

  getUserInstitutions(data: string): Observable<any> {
    return this.api.get(`${this.institutionUserController}/users/${data}/institutions`);
  }

  logInToInstitution(institutionId: string, applicationType?: number): Observable<any> {
    return this.api.post(`${this.institutionUserController}/user/institutions/${institutionId}/login?applicationType=${applicationType}`, {});
  }
}