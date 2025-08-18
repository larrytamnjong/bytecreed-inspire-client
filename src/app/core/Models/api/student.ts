import { Address } from "../common/address";
import { SexEnum, StudentStatusEnum } from "../../enums/look-up-table";
import { Class } from "./class";
import { Subject } from "./subject";
import { AcademicYear } from "./academics";
import { ClassSection } from "./class-section";
import { FeeType } from "./fee";
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
    academicYear?: AcademicYear;
    classSection?: ClassSection;
}

export class StudentCourse{
    id?: string;
    studentId!: string;
    student?: Student;
}

export class StudentSubject{
     student!: Student;
     subjects!: Subject[];
}

export class StudentFeeType {
     student!: Student;
     feeTypes!: FeeType[];
}