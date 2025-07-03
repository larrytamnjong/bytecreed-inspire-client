import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";

@Injectable({ providedIn: 'root'})
export class ResultService {
  private readonly RESULT_CONTROLLER: string = "v1/results";


  constructor(private apiService: ApiHttpService) {}

    public saveResults(data: any): Observable<ServiceResponse<any[]>> {
        return this.apiService.post(this.RESULT_CONTROLLER,RequestHelper.createServiceRequest(data));
    }

    public getResults(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.post(this.RESULT_CONTROLLER,RequestHelper.createServiceRequest(data));
    }

    public deleteResults(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.delete(this.RESULT_CONTROLLER,RequestHelper.createServiceRequest(data));
    }
 
}