import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { Subject } from "../../Models/api/subject";
import { RequestHelper } from "../common/service-request-helper";

@Injectable({ providedIn: 'root'})
export class SubjectService {
  private readonly SUBJECT_CONTROLLER: string = "v1/subjects";
  constructor(private apiService: ApiHttpService) {}

  public getSubjects(): Observable<ServiceResponse<Subject[]>> {
    return this.apiService.get(`${this.SUBJECT_CONTROLLER}`);
  }

  public addSubject(data: Subject): Observable<ServiceResponse<Subject[]>> {
    return this.apiService.post(`${this.SUBJECT_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
  }

  public updateSubject(data: Subject): Observable<ServiceResponse<Subject[]>> {
    return this.apiService.put(`${this.SUBJECT_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
  }

}