import { SexEnum } from "../../enums/look-up-table";

export class Personnel{
    familyName!: string;
    givenNames!: string;
    dateOfBirth!: string;
    sex!: SexEnum;
    dateOfEmployment!: string;
    addressId?: string;
    userId? : string;
}