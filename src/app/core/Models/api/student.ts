import { Address } from "../common/address";
import { SexEnum, StudentStatusEnum } from "../../enums/look-up-table";
import { Class } from "./class";
import { Subject } from "./subject";
export class Student{
    id?: string;
    familyName!: string;
    givenNames!: string;
    dateOfBirth!: string;
    sex!: SexEnum;
    admissionNumber?: string | null;
    status?: StudentStatusEnum;
    userId?: string;
    addressId?: string;
    address?: Address;
}

export class StudentEnrollment{
    id?: string;
    studentId!: string;
    classId!: string;
    classSectionId?: string;
    academicYearId!: string;
    enrollmentDate?: string;
    student?: Student;
    class?: Class;
}

export class StudentCourse{
    id?: string;
    studentId!: string;
    student?: Student;
}

export class StudentSubject{
     student!: Student;
     subject!: Subject[];
}