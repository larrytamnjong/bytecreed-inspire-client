// // export class Result{
// //     admissionNumber ?: string
// // }
export class ResultBaseNew {
  studentId!: string;
  academicPeriodId!: string;
  classId!: string;
  grades?: GradeSetupResponseNew[];
  classProfiles?: ClassProfileResponse[];
  disciplines?: DisciplineResponseNew[];
  finalResults?: FinalResultResponseNew[];
  schools?:SchoolResponseNew[];
  academicPeriodName?: string;
}

export class StudentResultNew {
  admissionNumber!: string;
  subjectName?: string;
  coefficient: number = 0;
  seq1: number = 0;
  seq2: number = 0;
  term: number = 0;
  total: number = 0;
  subjectAvg: number = 0;
  rank?: number;
  grade?: string;
  remark?: string;
}

export class ResultRequestNew extends ResultBaseNew {
  studentResults!: StudentResultNew[];
}

export class ResultResponseNew extends ResultBaseNew {
  studentResults!: StudentResultNew[];
}

export class GradeSetupResponseNew {
  grade!: string;
  remark!: string;
  minMark!: number;
  maxMark!: number;
  sortOrder!: number;
}

export class ClassProfileResponse {
  classAverage!: number;
  highestAverage!: number;
  lowestAverage!: number;
  percentagePass!: number;
  medianAverage!: number;
}

export class DisciplineResponseNew {
  disciplineTypeName!: string;
  remarks!: string;
}

export class FinalResultResponseNew {
  numberOfSubjectsRegistered!: number;
  numberOfSubjectsSat!: number;
  numberOfSubjectsPassed!: number;
  average!: number;
  rank!: number;
}

export class SchoolResponseNew {
  school!: School;
  address?: Address;
}

export class School {
  institutionId!: string;
  name!: string;
  phone!: string;
  email?: string;
  logoFileId?: string;
  addressId?: string;
  address?: Address;
}

export class Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
}