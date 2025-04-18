import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Student, StudentEnrollment } from "src/app/core/Models/api/student";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { HttpParams } from "@angular/common/http";
@Injectable({ providedIn: 'root'})
export class StudentService {
    private readonly students_controller = 'v1/students';
    private readonly student_enrollment_controller = 'v1/student-enrollments';
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

    addStudentsEnrollment(data: any): Observable<ServiceResponse<StudentEnrollment>> {
        return this.apiService.post(this.student_enrollment_controller, RequestHelper.createServiceRequest(data));
    }

    deleteStudentEnrollment(data: any): Observable<ServiceResponse<StudentEnrollment>> {
        return this.apiService.delete(`${this.student_enrollment_controller}`, RequestHelper.createServiceRequest(data));
    }

    getStudentEnrollments(academicYearId: string | null, classId: string | null, sectionId: string | null): Observable<ServiceResponse<StudentEnrollment>> {
        let queryParams = new HttpParams();
        if (academicYearId) {
            queryParams = queryParams.set('academicYearId', academicYearId);
        }
        if (classId) {
            queryParams = queryParams.set('classId', classId);
        }
        if (sectionId) {
            queryParams = queryParams.set('classSectionId', sectionId);
        }
        return this.apiService.get(`${this.student_enrollment_controller}`, {params: queryParams});
    }
}