import { Injectable } from "@angular/core";
import { IdentityApiHttpService } from "../common/base-identity-api-http.service";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";


@Injectable({ providedIn: 'root'})
export class FileService {
  constructor(private apiService: ApiHttpService) {}
}