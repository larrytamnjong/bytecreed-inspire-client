export enum LookUpTableEnum {
  Sex = 1,
  Locales = 2,
  StudentStatus = 3,
  ApplicationTypes = 4,
  ActiveAndInactiveStatus = 5,
  YesOrNoResponse = 6,
  PaymentStatus = 7,
  PaymentMethods = 8,
  PaymentTypes = 9
}

export enum SexEnum {
  Male = 1,
  Female = 2,
}

export enum StudentStatusEnum {
  Active = 1,
  Graduated = 2,
  DroppedOut = 3,
  Expelled = 4,
}

export enum ActiveAndInactiveStatusEnum {
  Active = 1,
  Inactive = 0,
}

export enum YesOrNoResponseEnum {
  Yes = 1,
  No = 0,
}

export enum PaymentStatusEnum {
  Processing = 1,
  Completed = 2,
  Cancelled = 3,
  Rejected = 4,
}

export enum PaymentMethodsEnum {
  Cash = 1,
  MTNCameroonMobileMoney = 2,
  OrangeCameroonMobileMoney = 3,
  Bank = 4
}

export enum PaymentTypesEnum {
  Income = 1,
  Expense = 2,
  Refund = 3,
  SchoolFees = 4
}
