import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";

@Injectable({ providedIn: 'root'})
export class TeacherService {
  private readonly teacher_controller: string = "v1/teachers";

  constructor(private apiService: ApiHttpService) {}

  public addTeachers(data: any): Observable<ServiceResponse<any[]>> {
      return this.apiService.post(this.teacher_controller,RequestHelper.createServiceRequest([data]));
    }
  
    public deleteTeacher(data: any): Observable<ServiceResponse<any>> {
      return this.apiService.put(this.teacher_controller,RequestHelper.createServiceRequest([data]));
    }
}