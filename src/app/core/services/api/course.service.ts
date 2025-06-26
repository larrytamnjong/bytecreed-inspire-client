import { Injectable } from "@angular/core";
import { ServiceResponse } from "../../Models/common/service-response";
import { Course } from "../../Models/api/course";
import { Observable } from "rxjs";
import { RequestHelper } from "../common/service-request-helper";
import { ApiHttpService } from "../common/base-api-http.service";


@Injectable({ providedIn: 'root'})
export class CourseService {
    private readonly COURSE_CONTROLLER: string = "v1/courses";
    constructor(private apiService: ApiHttpService) {}
  
  public getCourses(): Observable<ServiceResponse<Course[]>> {
    return this.apiService.get(`${this.COURSE_CONTROLLER}`);
  }
  public addCourse(data: Course): Observable<ServiceResponse<Course[]>> {
    return this.apiService.post(`${this.COURSE_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
  }
  public updateCourse(data: Course): Observable<ServiceResponse<Course[]>> {
    return this.apiService.put(`${this.COURSE_CONTROLLER}`, RequestHelper.createServiceRequest([data]));
  }
  public deleteCourse(id: string): Observable<ServiceResponse<any>> {
    return this.apiService.delete(`${this.COURSE_CONTROLLER}/${id}/course`);
  }
}