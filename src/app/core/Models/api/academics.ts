import { YearEntityTracker } from "../entity-trackers/year-entity-tracker";

export class AcademicTerm extends YearEntityTracker {
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

export class AcademicPeriod extends YearEntityTracker {
    id?: string;
    name?: string; 
    academicTermId?: string;
    academicYearName?: string;
    academicTermName?: string;
    isActive: boolean = true;
}