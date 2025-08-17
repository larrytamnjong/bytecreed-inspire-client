import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";

export class FeeType extends AcademicCycleTracker {
    id?: string;
    name!: string
    amount: number = 0;
}