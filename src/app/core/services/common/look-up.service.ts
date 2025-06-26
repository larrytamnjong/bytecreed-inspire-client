import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "./base-api-http.service";
import { LookUpView } from "../../Models/common/look-up-view";
import { forkJoin, map } from "rxjs";

@Injectable({ providedIn: 'root'})
export class LookUpService {
  private readonly LOOK_UP_CONTROLLER: string = "v1/look-ups";
  private readonly LOOK_UP_DATA_CONTROLLER: string = "v1/look-up-data";
  private readonly COUNTRIES_CONTROLLER: string = "v1/countries";

  constructor(private api: ApiHttpService) {}

  private getLookUps(): Observable<any> {
    return this.api.get(`${this.LOOK_UP_CONTROLLER}`);
  }

  private getLookUpData(): Observable<any> {
    return this.api.get(`${this.LOOK_UP_DATA_CONTROLLER}`);
  }

  private getCountries(): Observable<any> {
    return this.api.get(`${this.COUNTRIES_CONTROLLER}`);
  }

  getAll(): Observable<LookUpView> {
    return forkJoin({
        lookUp: this.getLookUps().pipe(map(response => response?.data || [])),
        lookUpData: this.getLookUpData().pipe(map(response => response?.data || [])),
        countries: this.getCountries().pipe(map(response => response?.data || [])),
    });
  }
}