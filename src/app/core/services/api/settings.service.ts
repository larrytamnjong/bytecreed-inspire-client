import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { RequestHelper } from "../common/service-request-helper";
import { ServiceResponse } from "../../Models/common/service-response";
import { AdmissionNumberSettings } from "../../Models/api/admission-number-settings";

@Injectable({ providedIn: 'root'})
export class SettingsService {
    private readonly ADMISSION_NUMBER_SETTINGS_CONTROLLER: string = "v1/admission-number-settings";
  constructor(private apiService: ApiHttpService) {}

   getAdmissionNumberSettings(): Observable<ServiceResponse<AdmissionNumberSettings>> {
      return this.apiService.get(`${this.ADMISSION_NUMBER_SETTINGS_CONTROLLER}`);
    }
  
    addOrUpdateAdmissionNumberSettings(data: AdmissionNumberSettings): Observable<ServiceResponse<AdmissionNumberSettings>> {
      return this.apiService.put(`${this.ADMISSION_NUMBER_SETTINGS_CONTROLLER}`, RequestHelper.createServiceRequest(data));
    }
}