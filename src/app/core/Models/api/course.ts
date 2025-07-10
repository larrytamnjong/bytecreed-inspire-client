import { AcademicYearScopeTracker } from "../entity-trackers/academic-year-scope-tracker";
export class Course extends AcademicYearScopeTracker {
    id?: string;
    name!: string;
}