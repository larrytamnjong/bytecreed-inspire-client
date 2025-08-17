import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { HttpParams } from "@angular/common/http";
import { FeeType } from "../../Models/api/fee";


@Injectable({ providedIn: 'root'})
export class FeesService {
    private readonly FEE_TYPE_CONTROLLER: string = "v1/fee-types";
    private readonly CLASS_FEE_TYPES: string = "v1/class-fee-types";
    private readonly STUDENT_FEE_TYPES: string = "v1/student-fee-types";


  constructor(private apiService: ApiHttpService) {}

    addFeeType(data: any): Observable<ServiceResponse<FeeType[]>> {
        return this.apiService.post(`${this.FEE_TYPE_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
    }

    updateFeeType(data: any): Observable<ServiceResponse<FeeType[]>> {
        return this.apiService.put(`${this.FEE_TYPE_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
      }

    getFeeTypes(): Observable<ServiceResponse<FeeType[]>> {
        return this.apiService.get(`${this.FEE_TYPE_CONTROLLER}`);
    }

    deleteFeeType(id: string): Observable<ServiceResponse<any>> {
        return this.apiService.delete(`${this.FEE_TYPE_CONTROLLER}/${id}/fee-type`);
      }
}
