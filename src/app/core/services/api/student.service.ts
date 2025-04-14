import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Student } from "src/app/core/Models/api/student";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";

@Injectable({ providedIn: 'root'})
export class StudentService {
    private readonly students_controller = 'v1/students';
  constructor(private apiService: ApiHttpService) {}

    registerStudents(data: any): Observable<ServiceResponse<Student[]>> {
        return this.apiService.post(this.students_controller, RequestHelper.createServiceRequest(data));
    }

    updateStudents(data: Student[]): Observable<ServiceResponse<Student[]>> {
        return this.apiService.put(`${this.students_controller}`, RequestHelper.createServiceRequest(data));
    }

    updateStudent(data: Student): Observable<ServiceResponse<Student>> {
        return this.apiService.put(`${this.students_controller}`, RequestHelper.createServiceRequest([data]));
    }
}