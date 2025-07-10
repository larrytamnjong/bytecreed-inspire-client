import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";

export class AcademicTerm extends AcademicCycleTracker {
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

export class AcademicPeriod extends AcademicCycleTracker {
    id?: string;
    name?: string; 
    academicTermId?: string;
    academicYearName?: string;
    academicTermName?: string;
    isActive: boolean = true;
}