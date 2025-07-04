import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Class, ClassGroup, ClassSubject } from "../../Models/api/class";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { ClassExamType } from "../../Models/api/class";


@Injectable({ providedIn: 'root'})
export class ClassService {
    private readonly CLASS_CONTROLLER: string = "v1/classes";
    private readonly CLASS_EXAM_TYPE_CONTROLLER: string = "v1/class-exam-types";
    private readonly CLASS_GROUP_CONTROLLER: string = "v1/class-groups";
    private readonly CLASS_SUBJECT_CONTROLLER: string = "v1/class-subjects";

  constructor(private apiService: ApiHttpService) {}

    getClasses(): Observable<ServiceResponse<Class[]>> {
      return this.apiService.get(`${this.CLASS_CONTROLLER}`);
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

    deleteClassExamType(examTypeId: string, classes: any): Observable<ServiceResponse<ClassExamType>> {
        return this.apiService.delete(`${this.CLASS_EXAM_TYPE_CONTROLLER}/${examTypeId}/classes`, RequestHelper.createServiceRequest(classes));
      }
    
    addClassGroup(data: any): Observable<ServiceResponse<ClassGroup[]>> {
        return this.apiService.post(`${this.CLASS_GROUP_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
      }

    updateClassGroup(data: any): Observable<ServiceResponse<ClassGroup[]>> {
        return this.apiService.put(`${this.CLASS_GROUP_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
      }
    
    // addClassesSubject(data: any): Observable<ServiceResponse<ClassSubject[]>> {
    //     return this.apiService.post(`${this.class_subject_controller}`, RequestHelper.createServiceRequest(data));
    //   }
    
    updateOrAddClassesSubjects(data: any): Observable<ServiceResponse<ClassSubject[]>> {
        return this.apiService.put(`${this.CLASS_SUBJECT_CONTROLLER}`, RequestHelper.createServiceRequest(data));
      }
    
    getClassSubjects(classId: any): Observable<ServiceResponse<ClassSubject[]>> {
        return this.apiService.get(`${this.CLASS_SUBJECT_CONTROLLER}/${classId}/subjects`);
      }

    deleteClassSubject(subjectId: string, data: any): Observable<ServiceResponse<ClassSubject>> {
        return this.apiService.delete(`${this.CLASS_SUBJECT_CONTROLLER}/${subjectId}/classes`, RequestHelper.createServiceRequest(data));
      }
}
