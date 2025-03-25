import { Injectable } from "@angular/core";
import { IdentityApiHttpService } from "../common/base-identity-api-http.service";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root'})
export class RoleService {
  constructor(private apiService: IdentityApiHttpService) {}

}