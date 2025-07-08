import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class ResultReportService {
  private readonly RESULT_REPORT_CONTROLLER: string = "v1/result-reports";


  constructor(private apiService: ApiHttpService) {}

    public getReportCards(academicPeriodId: any, classId: any, classSectionId: any): Observable<ServiceResponse<any[]>> {
        let queryParams = new HttpParams();
        if (classSectionId) {
            queryParams = queryParams.set('classSectionId', classSectionId);
        }
        if (classId) {
            queryParams = queryParams.set('classId', classId);
        }
        if (academicPeriodId) {
            queryParams = queryParams.set('academicPeriodId', academicPeriodId);
        }
        return this.apiService.post(`${this.RESULT_REPORT_CONTROLLER}/report-cards`, {params: queryParams});
    }

    public getTranscripts(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.post(`${this.RESULT_REPORT_CONTROLLER}/transcripts`,RequestHelper.createServiceRequest(data));
    }

    public getMasterSheets(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.post(`${this.RESULT_REPORT_CONTROLLER}/master-sheets`,RequestHelper.createServiceRequest(data));
    }

}