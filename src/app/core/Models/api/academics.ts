export class AcademicTerm {
    id?: string;
    name?: string;
}

export class AcademicYear {
    id?: string;
    name!: string;
    isActive: boolean = true; 
    startDate!: Date; 
    endDate?: Date; 
}

export class AcademicPeriod {
    id?: string;
    name?: string; 
    academicYearId?: string;
    academicTermId?: string;
    academicYearName?: string;
    academicTermName?: string;
    isActive: boolean = true;
}