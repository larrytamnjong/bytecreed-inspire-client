import { Injectable } from "@angular/core";
import { RequestHelper } from "../common/service-request-helper";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { AcademicTerm, AcademicYear, AcademicPeriod } from "../../Models/api/academics";


@Injectable({ providedIn: 'root'})
export class AcademicService {
    private readonly academic_year_controller: string = "v1/academic-years";
    private readonly academic_term_controller: string = "v1/academic-terms";
    private readonly academic_period_controller: string = "v1/academic-periods";

    constructor(private apiService: ApiHttpService) {}

    getAcademicTerms(): Observable<ServiceResponse<AcademicTerm[]>> {
        return this.apiService.get(`${this.academic_term_controller}`);
    }

    createAcademicTerm(academicTerm: AcademicTerm): Observable<ServiceResponse<AcademicTerm[]>> {
        return this.apiService.post(`${this.academic_term_controller}`, RequestHelper.createServiceRequest([academicTerm]));
    }

    updateAcademicTerm(academicTerm: AcademicTerm): Observable<ServiceResponse<AcademicTerm[]>> {
        return this.apiService.put(`${this.academic_term_controller}`, RequestHelper.createServiceRequest([academicTerm]));
    }

    getAcademicYears(): Observable<ServiceResponse<AcademicYear[]>> {
        return this.apiService.get(`${this.academic_year_controller}`);
    }

    createAcademicYear(academicYear: AcademicYear): Observable<ServiceResponse<AcademicYear>> {
        return this.apiService.post(`${this.academic_year_controller}`, RequestHelper.createServiceRequest(academicYear));
    }

    updateAcademicYear(academicYear: AcademicYear): Observable<ServiceResponse<AcademicYear>> {
        return this.apiService.put(`${this.academic_year_controller}`, RequestHelper.createServiceRequest(academicYear));
    }

    getAcademicPeriods(): Observable<ServiceResponse<AcademicPeriod[]>> {
        return this.apiService.get(`${this.academic_period_controller}`);
    }

    createAcademicPeriod(academicPeriod: AcademicPeriod): Observable<ServiceResponse<AcademicPeriod>> {
        return this.apiService.post(`${this.academic_period_controller}`, RequestHelper.createServiceRequest(academicPeriod));
    }

    updateAcademicPeriod(academicPeriod: AcademicPeriod): Observable<ServiceResponse<AcademicPeriod>> {
        return this.apiService.put(`${this.academic_period_controller}`, RequestHelper.createServiceRequest(academicPeriod));
    }
}