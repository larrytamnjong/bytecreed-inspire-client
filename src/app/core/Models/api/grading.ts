export class GradingSystem{
    id?: string;
    name!: string;
    scale!: number;
    isActive!: boolean;
    gradingScale?: number;
}

export class GradeSetup{
    id?: string;
    grade!: string;
    remark!: string;
    minMark!: number;
    maxMark!: number;
    gradingSystemId!: string;
    sortOrder!: number;
}