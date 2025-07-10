import { AcademicYearScopeTracker } from "../entity-trackers/academic-year-scope-tracker";

export class GradingSystem extends AcademicYearScopeTracker{
    id?: string;
    name!: string;
    scale!: number;
    isActive!: boolean;
    gradingScale?: number;
}

export class GradeSetup extends AcademicYearScopeTracker{
    id?: string;
    grade!: string;
    remark!: string;
    minMark!: number;
    maxMark!: number;
    gradingSystemId!: string;
    sortOrder!: number;
}