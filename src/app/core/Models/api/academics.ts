import { AcademicYearScopeTracker } from "../entity-trackers/academic-year-scope-tracker";

export class AcademicTerm extends AcademicYearScopeTracker {
    id?: string;
    name?: string;
}

export class AcademicYear {
    id?: string;
    name!: string;
    isActive: boolean = true; 
    startDate!: Date; 
    endDate?: Date; 
}

export class AcademicPeriod extends AcademicYearScopeTracker {
    id?: string;
    name?: string; 
    academicTermId?: string;
    academicYearName?: string;
    academicTermName?: string;
    isActive: boolean = true;
}