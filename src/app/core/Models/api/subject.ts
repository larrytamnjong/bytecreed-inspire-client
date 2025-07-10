import { YearEntityTracker } from "../entity-trackers/year-entity-tracker";

export class Subject extends YearEntityTracker{
    id?: string;
    name!: string;
    description!: string;
    isActive!: boolean;
    coefficient!: number;
    code?: string;
}