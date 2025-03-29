import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";


@Injectable({ providedIn: 'root'})
export class AddressService {
  constructor(private apiService: ApiHttpService) {}
}