import { YearEntityTracker } from "../entity-trackers/year-entity-tracker";

export class Class extends YearEntityTracker{
    id?: string;
    name!: string;
    nextClassId?: string;
    previousClassId?: string;
    isActive!: boolean;
    classGroupId?: string;
    sortOrder?: number;
    nextClassName?: string;
    previousClassName?: string;
  }

  export class ClassExamType extends YearEntityTracker {
    id?: string;
    examTypeId!: string;
    overrideDefaultWeight!: boolean;
    isActive: boolean = true;
    weight?: number;
    classId?: string; 
  }

  export class ClassGroup extends YearEntityTracker {
    id?: string;
    name!: string;
  }
  
  export class ClassSubject extends YearEntityTracker {
    id?: string;
    subjectId!: string;
    isRequired: boolean = false;
    isActive: boolean = true;
    coefficient?: number;
    overrideDefaultCoefficient: boolean = false;
    classId?: string; 
  }