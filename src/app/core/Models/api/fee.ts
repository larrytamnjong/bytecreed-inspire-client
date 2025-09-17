import { AcademicCycleTracker } from "../entity-trackers/academic-cycle-tracker";
import { Student } from "./student";

export class FeeType extends AcademicCycleTracker {
    id?: string;
    name!: string
    amount: number = 0;
}

export class FeePaymentRequest{
    amount!: number;
    enrollmentId!: string;
}

export class FeePayment{
    id?: string;
    studentId?: string;
    academicYearId?: string;
    totalFeeAmount?: number;
    PaidAmount?: number;
    remainingBalance?: number;
    referenceNumber?: string;
    paymentDate?: string;
    student?: Student;
    Recipient?: string;
    paymentMethodName?: string;
}