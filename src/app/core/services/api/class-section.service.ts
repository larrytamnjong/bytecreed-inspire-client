import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { ClassSection } from "../../Models/api/class-section";
import { RequestHelper } from "../common/service-request-helper";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class ClassSectionService {
    private readonly CLASS_SECTION_CONTROLLER: string = "v1/class-sections";
  constructor(private apiService: ApiHttpService) {}

  getClassSections(academicYearId?: any): Observable<ServiceResponse<ClassSection[]>> {
     let queryParams = new HttpParams();
      if (academicYearId) {
          queryParams = queryParams.set('academicYearId', academicYearId);
      }
    return this.apiService.get(`${this.CLASS_SECTION_CONTROLLER}`, {params: queryParams});
  }

  addClassSection(data: ClassSection): Observable<ServiceResponse<ClassSection>> {
    return this.apiService.post(`${this.CLASS_SECTION_CONTROLLER}/class-section`, RequestHelper.createServiceRequest(data));
  }

  updateClassSection(data: ClassSection): Observable<ServiceResponse<ClassSection>> {
    return this.apiService.put(`${this.CLASS_SECTION_CONTROLLER}/class-section`, RequestHelper.createServiceRequest(data));
  }
}