import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { ResultRequestNew, ResultResponseNew, StudentResultNew } from "../../Models/api/result";

@Injectable({ providedIn: "root" })
export class ReportCardService {
  private readonly result_controller: string = "v1/results";

  constructor(private apiService: ApiHttpService) {}
  //    getResult(result: any): Observable<ServiceResponse<Result>> {
  //     debugger
  //     const formData = new FormData();
  //     formData.append("data", result);
  //     return this.apiService.post(`${this.result_controller}/StudentResult`, formData);
  //   }
  // // getResult(result: any): Observable<ServiceResponse<StudentResultNew>> {
  // //   const requestPayload = {
  // //     data: result, 
  // //   };

  // //   return this.apiService.post(
  // //     `${this.result_controller}/studentresult`,
  // //     requestPayload
  // //   );
  // // }
  getResult(result: ResultRequestNew): Observable<ServiceResponse<ResultResponseNew>> {
    const requestPayload = {
      data: result, // Ensure this matches the expected structure in your API
    };

    return this.apiService.post(
      `${this.result_controller}/studentresult`,
      requestPayload
    );
  }
}
