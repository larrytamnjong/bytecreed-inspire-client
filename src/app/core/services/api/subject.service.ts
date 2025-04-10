import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { Subject } from "../../Models/api/subject";
import { RequestHelper } from "../common/service-request-helper";

@Injectable({ providedIn: 'root'})
export class SubjectService {
  private readonly subject_controller: string = "v1/subjects";
  constructor(private apiService: ApiHttpService) {}

  public getSubjects(): Observable<ServiceResponse<Subject[]>> {
    return this.apiService.get(`${this.subject_controller}`);
  }

  public addSubject(data: Subject): Observable<ServiceResponse<Subject[]>> {
    return this.apiService.post(`${this.subject_controller}`, RequestHelper.createServiceRequest([data]));
  }

  public updateSubject(data: Subject): Observable<ServiceResponse<Subject[]>> {
    return this.apiService.put(`${this.subject_controller}`, RequestHelper.createServiceRequest([data]));
  }

}