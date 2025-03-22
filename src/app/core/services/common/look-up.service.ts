import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "./base-api-http.service";
import { LookUpView } from "../../Models/common/look-up-view";
import { forkJoin, map } from "rxjs";


@Injectable()
export class LookUpApi {
  private readonly look_up_controller: string = "v1/look-ups";
  private readonly look_up_data_controller: string = "v1/look-up-data";

  constructor(private api: ApiHttpService) {}

  getLookUps(): Observable<any> {
    return this.api.get(`${this.look_up_controller}`);
  }

  getLookUpData(): Observable<any> {
    return this.api.get(`${this.look_up_data_controller}`);
  }

  getAll(): Observable<LookUpView> {
    return forkJoin({
        lookUp: this.getLookUps().pipe(map(response => response?.data || [])),
        lookUpData: this.getLookUpData().pipe(map(response => response?.data || [])),
    });
  }

}