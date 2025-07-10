import { AcademicYearScopeTracker } from "../entity-trackers/academic-year-scope-tracker";

export class Subject extends AcademicYearScopeTracker{
    id?: string;
    name!: string;
    description!: string;
    isActive!: boolean;
    coefficient!: number;
    code?: string;
}