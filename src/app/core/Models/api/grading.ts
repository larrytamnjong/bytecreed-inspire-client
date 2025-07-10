import { YearEntityTracker } from "../entity-trackers/year-entity-tracker";

export class GradingSystem extends YearEntityTracker{
    id?: string;
    name!: string;
    scale!: number;
    isActive!: boolean;
    gradingScale?: number;
}

export class GradeSetup extends YearEntityTracker{
    id?: string;
    grade!: string;
    remark!: string;
    minMark!: number;
    maxMark!: number;
    gradingSystemId!: string;
    sortOrder!: number;
}