import { YearEntityTracker } from "../entity-trackers/year-entity-tracker";
export class Course extends YearEntityTracker {
    id?: string;
    name!: string;
}