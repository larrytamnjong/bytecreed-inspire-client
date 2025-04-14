import { Address } from "../common/address";
import { SexEnum, StudentStatusEnum } from "../../enums/look-up-table";
export class Student{
    id?: string;
    familyName!: string;
    givenNames!: string;
    dateOfBirth?: Date;
    sex!: SexEnum;
    admissionNumber?: string;
    status?: StudentStatusEnum;
    userId?: string;
    addressId?: string;
    address?: Address;
}