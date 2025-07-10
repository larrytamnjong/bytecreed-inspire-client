import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";
export class Course extends AcademicCycleTracker {
    id?: string;
    name!: string;
}