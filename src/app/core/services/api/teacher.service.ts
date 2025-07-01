import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class TeacherService {
  private readonly TEACHER_CONTROLLER: string = "v1/teachers";
  private readonly TEACHER_CLASS_CONTROLLER: string = "v1/teacher-classes";
  private readonly TEACHER_SUBJECT_CONTROLLER: string = "v1/teacher-subjects";

  constructor(private apiService: ApiHttpService) {}

    public addTeachers(data: any): Observable<ServiceResponse<any[]>> {
        return this.apiService.post(this.TEACHER_CONTROLLER,RequestHelper.createServiceRequest(data));
    }

    public deleteTeacher(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.delete(this.TEACHER_CONTROLLER,RequestHelper.createServiceRequest(data));
    }

    public getTeachers(): Observable<ServiceResponse<any[]>> {
         return this.apiService.get(`${this.TEACHER_CONTROLLER}`);
    }
 
    public addTeacherClasses(data: any): Observable<ServiceResponse<any[]>> {
        return this.apiService.post(this.TEACHER_CLASS_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    public deleteTeacherClasses(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.delete(this.TEACHER_CLASS_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    public getTeacherWithClasses(data: any, classSectionId: any): Observable<ServiceResponse<any>> {
        let queryParams = new HttpParams();
        if (classSectionId) {
            queryParams = queryParams.set('classSectionId', classSectionId);
        }
        return this.apiService.post(`${this.TEACHER_CONTROLLER}/classes`, RequestHelper.createServiceRequest(data), {params: queryParams});
    }

   public addTeacherSubjects(data: any): Observable<ServiceResponse<any[]>> {
        return this.apiService.post(this.TEACHER_SUBJECT_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    public removeTeacherSubjects(data: any): Observable<ServiceResponse<any[]>> {
        return this.apiService.delete(this.TEACHER_SUBJECT_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    public getTeacherSubjects(data: any): Observable<ServiceResponse<any[]>> {
        return this.apiService.post(this.TEACHER_SUBJECT_CONTROLLER, RequestHelper.createServiceRequest(data));
    }

    public getMyClasses(): Observable<ServiceResponse<any[]>> {
        return this.apiService.get(`${this.TEACHER_CLASS_CONTROLLER}/my-classes`);
    }

    public getMySubjects(): Observable<ServiceResponse<any[]>> {
        return this.apiService.get(`${this.TEACHER_SUBJECT_CONTROLLER}/my-subjects`);
    }

    public getMyClassSections(): Observable<ServiceResponse<any[]>> {
        return this.apiService.get(`${this.TEACHER_CLASS_CONTROLLER}/my-class-sections`);
    }
}