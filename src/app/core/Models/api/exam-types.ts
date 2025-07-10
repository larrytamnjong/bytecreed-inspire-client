import { YearEntityTracker } from "../entity-trackers/year-entity-tracker";

export class ExamType extends YearEntityTracker{
    id?: string;
    name!: string;
    academicTermId!: string;
    useWeight: boolean = false;
    weight?: number;
    sortOrder?: number;
}