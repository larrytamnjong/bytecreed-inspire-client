import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class ResultService {
  private readonly RESULT_CONTROLLER: string = "v1/results";

  constructor(private apiService: ApiHttpService) {}

    public saveResults(data: any): Observable<ServiceResponse<any[]>> {
        return this.apiService.put(this.RESULT_CONTROLLER,RequestHelper.createServiceRequest(data));
    }

    public getResults(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.post(this.RESULT_CONTROLLER,RequestHelper.createServiceRequest(data));
    }

    public deleteResults(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.delete(this.RESULT_CONTROLLER,RequestHelper.createServiceRequest(data));
    }

     public calculatePeriodRankings(academicPeriodId: any): Observable<ServiceResponse<any>> {
         let queryParams = new HttpParams();
         queryParams = queryParams.set('academicPeriodId', academicPeriodId);

        return this.apiService.put(`${this.RESULT_CONTROLLER}/period-rankings`, null, {params: queryParams});
    }

    public calculateYearlyRankings(academicYearId: any): Observable<ServiceResponse<any>> {
         let queryParams = new HttpParams();
         queryParams = queryParams.set('academicYearId', academicYearId);

        return this.apiService.put(`${this.RESULT_CONTROLLER}/year-rankings`, null, {params: queryParams});
    }
 
}