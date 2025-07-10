import { AcademicYearScopeTracker } from "../entity-trackers/academic-year-scope-tracker";

export class ExamType extends AcademicYearScopeTracker{
    id?: string;
    name!: string;
    academicTermId!: string;
    useWeight: boolean = false;
    weight?: number;
    sortOrder?: number;
}