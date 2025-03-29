import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "./base-api-http.service";
import { LookUpView } from "../../Models/common/look-up-view";
import { forkJoin, map } from "rxjs";

@Injectable({ providedIn: 'root'})
export class LookUpService {
  private readonly look_up_controller: string = "v1/look-ups";
  private readonly look_up_data_controller: string = "v1/look-up-data";
  private readonly countries_controller: string = "v1/countries";

  constructor(private api: ApiHttpService) {}

  private getLookUps(): Observable<any> {
    return this.api.get(`${this.look_up_controller}`);
  }

  private getLookUpData(): Observable<any> {
    return this.api.get(`${this.look_up_data_controller}`);
  }

  private getCountries(): Observable<any> {
    return this.api.get(`${this.countries_controller}`);
  }

  getAll(): Observable<LookUpView> {
    return forkJoin({
        lookUp: this.getLookUps().pipe(map(response => response?.data || [])),
        lookUpData: this.getLookUpData().pipe(map(response => response?.data || [])),
        countries: this.getCountries().pipe(map(response => response?.data || [])),
    });
  }
}