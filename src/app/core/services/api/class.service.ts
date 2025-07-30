import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Class, ClassGroup, ClassSubject } from "../../Models/api/class";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { ClassExamType } from "../../Models/api/class";
import { HttpParams } from "@angular/common/http";


@Injectable({ providedIn: 'root'})
export class ClassService {
    private readonly CLASS_CONTROLLER: string = "v1/classes";
    private readonly CLASS_EXAM_TYPE_CONTROLLER: string = "v1/class-exam-types";
    private readonly CLASS_GROUP_CONTROLLER: string = "v1/class-groups";
    private readonly CLASS_SUBJECT_CONTROLLER: string = "v1/class-subjects";

  constructor(private apiService: ApiHttpService) {}

    getClasses(academicYearId?: any): Observable<ServiceResponse<Class[]>> {
       let queryParams = new HttpParams();
        if (academicYearId) {
            queryParams = queryParams.set('academicYearId', academicYearId);
        }
      return this.apiService.get(`${this.CLASS_CONTROLLER}`, {params: queryParams});
    }

    updateClass(data: Class): Observable<ServiceResponse<Class[]>> {
        return this.apiService.put(`${this.CLASS_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
      }
  
    addClass(data: Class): Observable<ServiceResponse<Class[]>> {
        return this.apiService.post(`${this.CLASS_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
      }

    deleteClass(id: string): Observable<ServiceResponse<Class>> {
        return this.apiService.delete(`${this.CLASS_CONTROLLER}/${id}/class`);
      }

    addClassExamType(data: any): Observable<ServiceResponse<ClassExamType[]>> {
        return this.apiService.post(`${this.CLASS_EXAM_TYPE_CONTROLLER}`, RequestHelper.createServiceRequest(data));
      }

    getClassExamTypes(classId: any): Observable<ServiceResponse<ClassExamType[]>> {
        return this.apiService.get(`${this.CLASS_EXAM_TYPE_CONTROLLER}/${classId}/exam-types`);
      }

    deleteClassExamType(data: any): Observable<ServiceResponse<ClassExamType>> {
        return this.apiService.delete(`${this.CLASS_EXAM_TYPE_CONTROLLER}`, RequestHelper.createServiceRequest(data));
      }
    
    addClassGroup(data: any): Observable<ServiceResponse<ClassGroup[]>> {
        return this.apiService.post(`${this.CLASS_GROUP_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
      }

    updateClassGroup(data: any): Observable<ServiceResponse<ClassGroup[]>> {
        return this.apiService.put(`${this.CLASS_GROUP_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
      }
    
    updateOrAddClassesSubjects(data: any): Observable<ServiceResponse<ClassSubject[]>> {
        return this.apiService.put(`${this.CLASS_SUBJECT_CONTROLLER}`, RequestHelper.createServiceRequest(data));
      }
    
    getClassSubjects(classId: any): Observable<ServiceResponse<ClassSubject[]>> {
        return this.apiService.get(`${this.CLASS_SUBJECT_CONTROLLER}/${classId}/subjects`);
      }

    deleteClassSubject(data: any): Observable<ServiceResponse<ClassSubject>> {
        return this.apiService.delete(`${this.CLASS_SUBJECT_CONTROLLER}`, RequestHelper.createServiceRequest(data));
      }
}
