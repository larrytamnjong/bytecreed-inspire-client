export class Class {
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

  export class ClassExamType {
    id?: string;
    examTypeId!: string;
    overrideDefaultWeight!: boolean;
    isActive: boolean = true;
    weight?: number;
    classId?: string; 
  }

  export class ClassGroup {
    id?: string;
    name!: string;
  }
  
  export class ClassSubject {
    id?: string;
    subjectId!: string;
    isRequired: boolean = false;
    isActive: boolean = true;
    coefficient?: number;
    overrideDefaultCoefficient: boolean = false;
    classId?: string; 
  }