import { Address } from "../common/address";
import { SexEnum, StudentStatusEnum } from "../../enums/look-up-table";
import { Class } from "./class";
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