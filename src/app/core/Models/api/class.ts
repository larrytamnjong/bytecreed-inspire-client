import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";

export class Class extends AcademicCycleTracker{
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

  export class ClassExamType extends AcademicCycleTracker {
    id?: string;
    examTypeId!: string;
    overrideDefaultWeight!: boolean;
    isActive: boolean = true;
    weight?: number;
    classId?: string; 
  }

  export class ClassGroup extends AcademicCycleTracker {
    id?: string;
    name!: string;
  }
  
  export class ClassSubject extends AcademicCycleTracker {
    id?: string;
    subjectId!: string;
    isRequired: boolean = false;
    isActive: boolean = true;
    coefficient?: number;
    overrideDefaultCoefficient: boolean = false;
    classId?: string; 
    subjectName?: string;
  }

   export class ClassFeeType extends AcademicCycleTracker {
    id?: string;
    feeTypeId!: string;
    isRequired?: boolean;
    overrideDefaultAmount!: boolean;
    classId?: string; 
    className?: string;
    amount?: number;
  }