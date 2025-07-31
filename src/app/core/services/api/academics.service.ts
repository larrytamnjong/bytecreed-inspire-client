import { Injectable } from "@angular/core";
import { RequestHelper } from "../common/service-request-helper";
import { Observable } from "rxjs";
import { ApiHttpService } from "../common/base-api-http.service";
import { ServiceResponse } from "../../Models/common/service-response";
import { AcademicTerm, AcademicYear, AcademicPeriod } from "../../Models/api/academics";
import { Rollover } from "../../Models/api/rollover";


@Injectable({ providedIn: 'root'})
export class AcademicService {
    private readonly ACADEMIC_YEAR_CONTROLLER: string = "v1/academic-years";
    private readonly ACADEMIC_TERM_CONTROLLER: string = "v1/academic-terms";
    private readonly ACADEMIC_PERIOD_CONTROLLER: string = "v1/academic-periods";
    private readonly ROLLOVER_CONTROLLER: string = "v1/rollovers";

    constructor(private apiService: ApiHttpService) {}

    getAcademicTerms(): Observable<ServiceResponse<AcademicTerm[]>> {
        return this.apiService.get(`${this.ACADEMIC_TERM_CONTROLLER}`);
    }

    createAcademicTerm(academicTerm: AcademicTerm): Observable<ServiceResponse<AcademicTerm[]>> {
        return this.apiService.post(`${this.ACADEMIC_TERM_CONTROLLER}`, RequestHelper.createServiceRequest([academicTerm]));
    }

    rollover(data: any): Observable<ServiceResponse<any>> {
        return this.apiService.post(`${this.ROLLOVER_CONTROLLER}`, RequestHelper.createServiceRequest(data));
    }

    getRollovers(): Observable<ServiceResponse<Rollover[]>> {
        return this.apiService.get(`${this.ROLLOVER_CONTROLLER}`);
    }

    deleteRollover(id: string): Observable<ServiceResponse<any>> {
        return this.apiService.delete(`${this.ROLLOVER_CONTROLLER}/${id}`);
    }

    updateAcademicTerm(academicTerm: AcademicTerm): Observable<ServiceResponse<AcademicTerm[]>> {
        return this.apiService.put(`${this.ACADEMIC_TERM_CONTROLLER}`, RequestHelper.createServiceRequest([academicTerm]));
    }

    deleteAcademicTerm(id: any): Observable<ServiceResponse<any>> {
        return this.apiService.delete(`${this.ACADEMIC_TERM_CONTROLLER}/${id}/academic-term`);
    }

    getAcademicYears(): Observable<ServiceResponse<AcademicYear[]>> {
        return this.apiService.get(`${this.ACADEMIC_YEAR_CONTROLLER}`);
    }

    createAcademicYear(academicYear: AcademicYear): Observable<ServiceResponse<AcademicYear>> {
        return this.apiService.post(`${this.ACADEMIC_YEAR_CONTROLLER}`, RequestHelper.createServiceRequest(academicYear));
    }

    updateAcademicYear(academicYear: AcademicYear): Observable<ServiceResponse<AcademicYear>> {
        return this.apiService.put(`${this.ACADEMIC_YEAR_CONTROLLER}`, RequestHelper.createServiceRequest(academicYear));
    }

    getAcademicPeriods(): Observable<ServiceResponse<AcademicPeriod[]>> {
        return this.apiService.get(`${this.ACADEMIC_PERIOD_CONTROLLER}`);
    }

    getActiveAcademicPeriod(): Observable<ServiceResponse<AcademicPeriod>> {
        return this.apiService.get(`${this.ACADEMIC_PERIOD_CONTROLLER}/active`);
    }

    getActiveAcademicYear(): Observable<ServiceResponse<AcademicYear>> {
        return this.apiService.get(`${this.ACADEMIC_YEAR_CONTROLLER}/active`);
    }

    createAcademicPeriod(academicPeriod: AcademicPeriod): Observable<ServiceResponse<AcademicPeriod>> {
        return this.apiService.post(`${this.ACADEMIC_PERIOD_CONTROLLER}`, RequestHelper.createServiceRequest(academicPeriod));
    }

    updateAcademicPeriod(academicPeriod: AcademicPeriod): Observable<ServiceResponse<AcademicPeriod>> {
        return this.apiService.put(`${this.ACADEMIC_PERIOD_CONTROLLER}`, RequestHelper.createServiceRequest(academicPeriod));
    }
}