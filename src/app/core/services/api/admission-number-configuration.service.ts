import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { RequestHelper } from "../common/service-request-helper";
import { ServiceResponse } from "../../Models/common/service-response";
import { AdmissionNumberConfiguration } from "../../Models/api/admission-number-configuration";


@Injectable({ providedIn: 'root'})
export class AdmissionNumberConfigurationService {
    private readonly admission_number_configuration_controller: string = "v1/admission-number-configurations";
  constructor(private apiService: ApiHttpService) {}

   getAdmissionNumberConfiguration(): Observable<ServiceResponse<AdmissionNumberConfiguration>> {
      return this.apiService.get(`${this.admission_number_configuration_controller}`);
    }
  
    addOrUpdateAdmissionNumberConfiguration(data: AdmissionNumberConfiguration): Observable<ServiceResponse<AdmissionNumberConfiguration>> {
      return this.apiService.put(`${this.admission_number_configuration_controller}`, RequestHelper.createServiceRequest(data));
    }
}