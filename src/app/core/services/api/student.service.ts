import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Student, StudentCourse, StudentEnrollment, StudentSubject } from "src/app/core/Models/api/student";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { HttpParams } from "@angular/common/http";
@Injectable({ providedIn: 'root'})
export class StudentService {
    private readonly STUDENTS_CONTROLLER = 'v1/students';
    private readonly STUDENT_ENROLLMENT_CONTROLLER = 'v1/student-enrollments';
    private readonly STUDENT_COURSE_CONTROLLER = 'v1/student-courses';
    private readonly STUDENT_SUBJECT_CONTROLLER = 'v1/student-subjects';

  constructor(private apiService: ApiHttpService) {}

    registerStudents(data: any): Observable<ServiceResponse<Student[]>> {
        return this.apiService.post(this.STUDENTS_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    updateStudents(data: Student[]): Observable<ServiceResponse<Student[]>> {
        return this.apiService.put(`${this.STUDENTS_CONTROLLER}`, RequestHelper.createServiceRequest(data));
    }

    updateStudent(data: Student): Observable<ServiceResponse<Student>> {
        return this.apiService.put(`${this.STUDENTS_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
    }

    addStudentsEnrollment(data: any): Observable<ServiceResponse<StudentEnrollment>> {
        return this.apiService.post(this.STUDENT_ENROLLMENT_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    deleteStudentEnrollment(data: any): Observable<ServiceResponse<StudentEnrollment>> {
        return this.apiService.delete(`${this.STUDENT_ENROLLMENT_CONTROLLER}`, RequestHelper.createServiceRequest(data));
    }

    getStudentEnrollments(academicYearId: string | null, classId: string | null, sectionId: string | null, subjectId: string | null): Observable<ServiceResponse<StudentEnrollment>> {
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

        if (subjectId) {
            queryParams = queryParams.set('subjectId', subjectId);
        }
        
        return this.apiService.get(`${this.STUDENT_ENROLLMENT_CONTROLLER}`, {params: queryParams});
    }

    addStudentSubjects(data: any): Observable<ServiceResponse<StudentSubject[]>> {
        return this.apiService.post(this.STUDENT_SUBJECT_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    deleteStudentSubjects(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.delete(`${this.STUDENT_SUBJECT_CONTROLLER}`, RequestHelper.createServiceRequest(data));
    }

    getStudentSubjects(data: any): Observable<ServiceResponse<StudentSubject[]>> {
        return this.apiService.post(`${this.STUDENT_SUBJECT_CONTROLLER}/subjects`, RequestHelper.createServiceRequest(data));
    }

    addStudentCourses(data: any): Observable<ServiceResponse<StudentCourse[]>> {
        return this.apiService.post(this.STUDENT_COURSE_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    deleteStudentCourses(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.delete(`${this.STUDENT_COURSE_CONTROLLER}`, RequestHelper.createServiceRequest(data));
    }

    getCourseStudents(courseId: string): Observable<ServiceResponse<StudentCourse[]>> {
        return this.apiService.get(`${this.STUDENT_COURSE_CONTROLLER}/${courseId}/students`);
    }
}