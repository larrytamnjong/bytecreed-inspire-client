import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceRequest } from "../../Models/common/service-request";
import { ExamType } from "../../Models/api/exam-types";
import { RequestHelper } from "../common/service-request-helper";
import { ServiceResponse } from "../../Models/common/service-response";

@Injectable({ providedIn: 'root'})
export class ExamTypeService {
  private readonly exam_type_controller: string = "v1/exam-types"; 
  constructor(private apiService: ApiHttpService) {}

    getExamTypes(): Observable<ServiceResponse<ExamType[]>> {
        return this.apiService.get(`${this.exam_type_controller}`);
    }

    createExamType(examType: ExamType): Observable<ServiceResponse<ExamType[]>> {
        return this.apiService.post(`${this.exam_type_controller}`, RequestHelper.createServiceRequest([examType]));
    }

    updateExamType(examType: ExamType): Observable<ServiceResponse<ExamType[]>> {
        return this.apiService.put(`${this.exam_type_controller}`, RequestHelper.createServiceRequest([examType]));
    }
}