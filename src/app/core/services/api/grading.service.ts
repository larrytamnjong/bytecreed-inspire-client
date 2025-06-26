import { Injectable } from "@angular/core";
import { GradeSetup, GradingSystem } from "../../Models/api/grading";
import { Observable } from "rxjs";
import { ServiceResponse } from "../../Models/common/service-response";
import { ApiHttpService } from "../common/base-api-http.service";
import { RequestHelper } from "../common/service-request-helper";


@Injectable({ providedIn: 'root'})
export class GradingService {    
    private readonly GRADING_SYSTEM_CONTROLLER = 'v1/grading-systems';
    private readonly GRADE_SETUP_CONTROLLER = 'v1/grade-setups';   
  constructor(private apiService: ApiHttpService) {}

  public getGradingSystems(): Observable<ServiceResponse<GradingSystem[]>> {
    return this.apiService.get(this.GRADING_SYSTEM_CONTROLLER);
  }

  public addGradingSystem(data: GradingSystem): Observable<ServiceResponse<GradingSystem[]>> {
    return this.apiService.post(this.GRADING_SYSTEM_CONTROLLER, RequestHelper.createServiceRequest(data));
  }

  public updateGradingSystem(data: GradingSystem): Observable<ServiceResponse<GradingSystem[]>> {
    return this.apiService.put(this.GRADING_SYSTEM_CONTROLLER, RequestHelper.createServiceRequest(data));
  }

  public getGradeSetups() : Observable<ServiceResponse<GradeSetup[]>> {
    return this.apiService.get(this.GRADE_SETUP_CONTROLLER);
  }

  public addGradeSetup(gradeSetup: GradeSetup) :  Observable<ServiceResponse<GradeSetup[]>> {
    return this.apiService.post(this.GRADE_SETUP_CONTROLLER, RequestHelper.createServiceRequest([gradeSetup]));
  }
  
  public updateGradeSetup(gradeSetup: GradeSetup) :  Observable<ServiceResponse<GradeSetup[]>> {
    return this.apiService.put(this.GRADE_SETUP_CONTROLLER, RequestHelper.createServiceRequest([gradeSetup]));
  }

  public deleteGradeSetup(gradeSetupId: string) :  Observable<ServiceResponse<any>> {
    return this.apiService.delete(`${this.GRADE_SETUP_CONTROLLER}/${gradeSetupId}`);
  }
}