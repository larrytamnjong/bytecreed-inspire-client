import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";

export class ExamType extends AcademicCycleTracker{
    id?: string;
    name!: string;
    academicTermId!: string;
    useWeight: boolean = false;
    weight?: number;
    sortOrder?: number;
}