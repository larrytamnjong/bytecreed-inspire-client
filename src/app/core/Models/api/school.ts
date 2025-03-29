import { Address } from "../common/address";

export class School{
    institutionId!: string;
    name!: string;
    phone!: string;
    email?: string;
    logoFileId?: string;
    addressId?: string;
    address?: Address;
}