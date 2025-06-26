import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { Class, ClassGroup, ClassSubject } from "../../Models/api/class";
import { ServiceResponse } from "../../Models/common/service-response";
import { RequestHelper } from "../common/service-request-helper";
import { ClassExamType } from "../../Models/api/class";


@Injectable({ providedIn: 'root'})
export class ClassService {
    private readonly class_controller: string = "v1/classes";
    private readonly class_exam_type_controller: string = "v1/class-exam-types";
    private readonly class_group_controller: string = "v1/class-groups";
    private readonly class_subject_controller: string = "v1/class-subjects";

  constructor(private apiService: ApiHttpService) {}

    getClasses(): Observable<ServiceResponse<Class[]>> {
      return this.apiService.get(`${this.class_controller}`);
    }

    updateClass(data: Class): Observable<ServiceResponse<Class[]>> {
        return this.apiService.put(`${this.class_controller}`, RequestHelper.createServiceRequest([data]));
      }
  
    addClass(data: Class): Observable<ServiceResponse<Class[]>> {
        return this.apiService.post(`${this.class_controller}`, RequestHelper.createServiceRequest([data]));
      }

    deleteClass(id: string): Observable<ServiceResponse<Class>> {
        return this.apiService.delete(`${this.class_controller}/${id}/class`);
      }

    addClassExamType(data: any): Observable<ServiceResponse<ClassExamType[]>> {
        return this.apiService.post(`${this.class_exam_type_controller}`, RequestHelper.createServiceRequest(data));
      }

    getClassExamTypes(classId: any): Observable<ServiceResponse<ClassExamType[]>> {
        return this.apiService.get(`${this.class_exam_type_controller}/${classId}/exam-types`);
      }

    deleteClassExamType(examTypeId: string, classes: any): Observable<ServiceResponse<ClassExamType>> {
        return this.apiService.delete(`${this.class_exam_type_controller}/${examTypeId}/classes`, RequestHelper.createServiceRequest(classes));
      }
    
    addClassGroup(data: any): Observable<ServiceResponse<ClassGroup[]>> {
        return this.apiService.post(`${this.class_group_controller}`, RequestHelper.createServiceRequest([data]));
      }

    updateClassGroup(data: any): Observable<ServiceResponse<ClassGroup[]>> {
        return this.apiService.put(`${this.class_group_controller}`, RequestHelper.createServiceRequest([data]));
      }
    
    // addClassesSubject(data: any): Observable<ServiceResponse<ClassSubject[]>> {
    //     return this.apiService.post(`${this.class_subject_controller}`, RequestHelper.createServiceRequest(data));
    //   }
    
    updateOrAddClassesSubjects(data: any): Observable<ServiceResponse<ClassSubject[]>> {
        return this.apiService.put(`${this.class_subject_controller}`, RequestHelper.createServiceRequest(data));
      }
    
    getClassSubjects(classId: any): Observable<ServiceResponse<ClassSubject[]>> {
        return this.apiService.get(`${this.class_subject_controller}/${classId}/subjects`);
      }

    deleteClassSubject(subjectId: string, data: any): Observable<ServiceResponse<ClassSubject>> {
        return this.apiService.delete(`${this.class_subject_controller}/${subjectId}/classes`, RequestHelper.createServiceRequest(data));
      }
}
