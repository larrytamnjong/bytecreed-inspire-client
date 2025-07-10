import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";

export class Subject extends AcademicCycleTracker{
    id?: string;
    name!: string;
    description!: string;
    isActive!: boolean;
    coefficient!: number;
    code?: string;
}