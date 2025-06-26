import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { RequestHelper } from "../common/service-request-helper";
import { ServiceResponse } from "../../Models/common/service-response";
import { AdmissionNumberConfiguration } from "../../Models/api/admission-number-configuration";


@Injectable({ providedIn: 'root'})
export class AdmissionNumberConfigurationService {
    private readonly ADMISSION_NUMBER_CONFIGURATION_CONTROLLER: string = "v1/admission-number-configurations";
  constructor(private apiService: ApiHttpService) {}

   getAdmissionNumberConfiguration(): Observable<ServiceResponse<AdmissionNumberConfiguration>> {
      return this.apiService.get(`${this.ADMISSION_NUMBER_CONFIGURATION_CONTROLLER}`);
    }
  
    addOrUpdateAdmissionNumberConfiguration(data: AdmissionNumberConfiguration): Observable<ServiceResponse<AdmissionNumberConfiguration>> {
      return this.apiService.put(`${this.ADMISSION_NUMBER_CONFIGURATION_CONTROLLER}`, RequestHelper.createServiceRequest(data));
    }
}