import { AcademicYearScopeTracker } from "../entity-trackers/academic-year-scope-tracker";

export class Class extends AcademicYearScopeTracker{
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

  export class ClassExamType extends AcademicYearScopeTracker {
    id?: string;
    examTypeId!: string;
    overrideDefaultWeight!: boolean;
    isActive: boolean = true;
    weight?: number;
    classId?: string; 
  }

  export class ClassGroup extends AcademicYearScopeTracker {
    id?: string;
    name!: string;
  }
  
  export class ClassSubject extends AcademicYearScopeTracker {
    id?: string;
    subjectId!: string;
    isRequired: boolean = false;
    isActive: boolean = true;
    coefficient?: number;
    overrideDefaultCoefficient: boolean = false;
    classId?: string; 
  }