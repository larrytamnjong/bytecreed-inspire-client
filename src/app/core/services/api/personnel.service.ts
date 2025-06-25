import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { Personnel } from "../../Models/api/personnel";
import { RequestHelper } from "../common/service-request-helper";

@Injectable({ providedIn: "root" })
export class PersonnelService {
  private readonly personnel_controller: string = "v1/personnel";

  constructor(private apiService: ApiHttpService) {}

  public createPersonnel(data: any): Observable<ServiceResponse<Personnel[]>> {
    return this.apiService.post(this.personnel_controller,RequestHelper.createServiceRequest([data]));
  }

  public updatePersonnel(data: any): Observable<ServiceResponse<Personnel[]>> {
    return this.apiService.put(this.personnel_controller,RequestHelper.createServiceRequest([data]));
  }

  public deletePersonnel(id: any): Observable<ServiceResponse<any>> {
    return this.apiService.delete(`${this.personnel_controller}/${id}`);
  }
}
