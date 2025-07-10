import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";

export class GradingSystem extends AcademicCycleTracker{
    id?: string;
    name!: string;
    scale!: number;
    isActive!: boolean;
    gradingScale?: number;
}

export class GradeSetup extends AcademicCycleTracker{
    id?: string;
    grade!: string;
    remark!: string;
    minMark!: number;
    maxMark!: number;
    gradingSystemId!: string;
    sortOrder!: number;
}