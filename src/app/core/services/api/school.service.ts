import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { RequestHelper } from "../common/service-request-helper";
import { ServiceResponse } from "../../Models/common/service-response";
import { School } from "../../Models/api/school";
import { Address } from "../../Models/common/address";

@Injectable({ providedIn: 'root'})
export class SchoolService {
    private readonly SCHOOL_CONTROLLER: string = "v1/schools";

  constructor(private apiService: ApiHttpService) {}

  getCurrentSchool(): Observable<ServiceResponse<{school: School, address?: Address}>> {
    return this.apiService.get(`${this.SCHOOL_CONTROLLER}/school`);
  }

  updateCurrentSchool(school: {school: School, address?: Address}): Observable<ServiceResponse<{school: School, address?: Address}>> {
    return this.apiService.put(`${this.SCHOOL_CONTROLLER}`, RequestHelper.createServiceRequest(school));
  }

}