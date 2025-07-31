import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";

export class AcademicTerm extends AcademicCycleTracker {
    id?: string;
    name?: string;
    sortOrder?: number;
}

export class AcademicYear {
    id?: string;
    name!: string;
    isActive: boolean = true; 
    startDate!: Date; 
    endDate?: Date; 
    sortOrder?: number;
}

export class AcademicPeriod extends AcademicCycleTracker {
    id?: string;
    name?: string; 
    academicTermId?: string;
    academicYearName?: string;
    academicTermName?: string;
    isActive: boolean = true;
}