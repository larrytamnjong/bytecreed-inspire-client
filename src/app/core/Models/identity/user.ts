import { SexEnum } from "../../enums/sex";
export class User {
  id?: string;
  familyName!: string;
  givenNames!: string;
  phone!: string;
  email?: string;
  locale?: string;
  whatsAppPhone?: string;
  password?: string;
  sex!: SexEnum;
}
