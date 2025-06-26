import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { ClassSection } from "../../Models/api/class-section";
import { RequestHelper } from "../common/service-request-helper";

@Injectable({ providedIn: 'root'})
export class ClassSectionService {
    private readonly CLASS_SECTION_CONTROLLER: string = "v1/class-sections";
  constructor(private apiService: ApiHttpService) {}

  getClassSections(): Observable<ServiceResponse<ClassSection[]>> {
    return this.apiService.get(`${this.CLASS_SECTION_CONTROLLER}`);
  }

  addClassSection(data: ClassSection): Observable<ServiceResponse<ClassSection>> {
    return this.apiService.post(`${this.CLASS_SECTION_CONTROLLER}/class-section`, RequestHelper.createServiceRequest(data));
  }

  updateClassSection(data: ClassSection): Observable<ServiceResponse<ClassSection>> {
    return this.apiService.put(`${this.CLASS_SECTION_CONTROLLER}/class-section`, RequestHelper.createServiceRequest(data));
  }
}