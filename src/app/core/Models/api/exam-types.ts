export class ExamType{
    id?: string;
    name!: string;
    academicTermId!: string;
    useWeight: boolean = false;
    weight?: number;
    sortOrder?: number;
}