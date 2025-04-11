import { Injectable } from "@angular/core";
import { GradeSetup, GradingSystem } from "../../Models/api/grading";
import { Observable } from "rxjs";
import { ServiceResponse } from "../../Models/common/service-response";
import { ApiHttpService } from "../common/base-api-http.service";
import { RequestHelper } from "../common/service-request-helper";


@Injectable({ providedIn: 'root'})
export class GradingService {    
    private readonly grading_system_controller = 'v1/grading-systems';
    private readonly grade_setup_controller = 'v1/grade-setups';   
  constructor(private apiService: ApiHttpService) {}

  public getGradingSystems(): Observable<ServiceResponse<GradingSystem[]>> {
    return this.apiService.get(this.grading_system_controller);
  }

  public addGradingSystem(data: GradingSystem): Observable<ServiceResponse<GradingSystem[]>> {
    return this.apiService.post(this.grading_system_controller, RequestHelper.createServiceRequest(data));
  }

  public updateGradingSystem(data: GradingSystem): Observable<ServiceResponse<GradingSystem[]>> {
    return this.apiService.put(this.grading_system_controller, RequestHelper.createServiceRequest(data));
  }

  public getGradeSetups() : Observable<ServiceResponse<GradeSetup[]>> {
    return this.apiService.get(this.grade_setup_controller);
  }

  public addGradeSetup(gradeSetup: GradeSetup) :  Observable<ServiceResponse<GradeSetup[]>> {
    return this.apiService.post(this.grade_setup_controller, RequestHelper.createServiceRequest([gradeSetup]));
  }
  
  public updateGradeSetup(gradeSetup: GradeSetup) :  Observable<ServiceResponse<GradeSetup[]>> {
    return this.apiService.put(this.grade_setup_controller, RequestHelper.createServiceRequest([gradeSetup]));
  }

  public deleteGradeSetup(gradeSetupId: string) :  Observable<ServiceResponse<any>> {
    return this.apiService.delete(`${this.grade_setup_controller}/${gradeSetupId}`);
  }
}