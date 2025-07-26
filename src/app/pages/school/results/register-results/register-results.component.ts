import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/base.component";
import { Store } from "@ngrx/store";
import { RootReducerState } from "src/app/store";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TeacherService } from "src/app/core/services/api/teacher.service";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { StudentService } from "src/app/core/services/api/student.service";
import { finalize } from "rxjs/operators";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";
import { getErrorMessage } from "src/app/core/helpers/error-filter";
import { StudentEnrollment } from "src/app/core/Models/api/student";
import { GradingService } from "src/app/core/services/api/grading.service";
import { ResultService } from "src/app/core/services/api/result.service";
import { ClassService } from "src/app/core/services/api/class.service";
import { AcademicService } from "src/app/core/services/api/academics.service";
import { exportJsonToExcel } from "src/app/core/helpers/excel-utility";

@Component({
  selector: "app-register-results",
  templateUrl: "./register-results.component.html",
  styleUrl: "./register-results.component.scss",
})
export class RegisterResultsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  teacherSubjects: any = [];
  teacherClasses: any = [];
  teacherSections: any = [];
  studentEnrollments: any = [];
  academicPeriods: any = [];
  examTypes: any = [];
  scale: any = null;

  studentEnrollmentsToDisplay: any = [];
  studentsResults: any = [];

  editableConfig: { [Key: string]: any } = {
    result: {
      editable: true,
      type: "number",
      min: 0,
      max: 20,
    },
  };

  getStudentForm!: UntypedFormGroup;

  get fGetStudentForm() {
    return this.getStudentForm.controls;
  }

  headers: any = [
    { key: "admissionNumber", displayName: "Admission Number" },
    { key: "familyName", displayName: "Family Name" },
    { key: "givenNames", displayName: "Given Names" },
    { key: "sex", displayName: "Sex" },
    { key: "result", displayName: "Result" },
  ];

  constructor(
    private modalService: NgbModal,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private resultService: ResultService,
    private academicService: AcademicService,
    private classService: ClassService,
    private gradeService: GradingService,
    private getStudentFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>
  ) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Results" },
      { label: "Record", active: true },
    ];

    this.getStudentForm = this.getStudentFormBuilder.group({
      classId: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      classSectionId: [null],
      examTypeId: [null, [Validators.required]],
    });

    this.getStudentForm.get("classId")?.valueChanges.subscribe((value) => {
      if (value) {
        this.getExamTypes(value);
      }
    });

    this.getSubjects();
    this.getActiveAcademicPeriod();
    this.getClasses();
    this.getGradingScale();
    this.getSections();
    this.getLookUps();
  }

  isActionButtonDisabled(): boolean {
    return this.studentEnrollmentsToDisplay.length === 0;
  }


  getStudents() {
    if (this.getStudentForm.valid) {
      var classId = this.getStudentForm.get("classId")?.value;
      var classSectionId = this.getStudentForm.get("classSectionId")?.value;
      var academicYearId = this.getStudentForm.get("academicYearId")?.value;
      var subjectId = this.getStudentForm.get("subjectId")?.value;
      this.toggleLoading();
      this.studentService
        .getStudentEnrollments(
          academicYearId,
          classId,
          classSectionId,
          subjectId
        )
        .pipe(finalize(() => this.toggleLoading()))
        .subscribe({
          next: (response) => {
            this.studentEnrollments = response.data;
            if (this.studentEnrollments.length > 0) {
              this.setStudentEnrollmentsToDisplay(this.studentEnrollments);
              this.getResults();
            }
          },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          },
        });
    } else {
      SimpleAlerts.showWarning();
    }
  }

  getExamTypes(classId: any) {
    this.classService.getClassExamTypes(classId).subscribe({
      next: (response) => {
        if (response.success) {
          this.examTypes = response.data;
        }
      },
      error: () => {},
    });
  }

  setStudentEnrollmentsToDisplay(enrollments: StudentEnrollment[]): void {
    this.studentEnrollmentsToDisplay = enrollments.map((enrollment) => {
      return {
        id: enrollment.id,
        familyName: enrollment.student?.familyName || "#",
        givenNames: enrollment.student?.givenNames || "#",
        sex: enrollment.student?.sex || "#",
        admissionNumber: enrollment.student?.admissionNumber || "#",
        studentId: enrollment.student?.id || "#",
        result: 0,
      };
    });
  }

  getSubjects() {
    this.teacherService.getMySubjects().subscribe({
      next: (response) => {
        if (response.success) {
          this.teacherSubjects = response.data;
        }
      },
      error: () => {},
    });
  }

  openModal(content: any) {
    this.modalService.open(content, this.mdModalConfig);
  }

  resultEntered(event: any) {}

  dismissModal() {
    this.modalService.dismissAll();
  }

  getResults() {
    if (
      this.getStudentForm.invalid ||
      this.studentEnrollmentsToDisplay.length === 0
    ) {
      SimpleAlerts.showWarning();
      return;
    }

    const payload = {
      examTypeId: this.getStudentForm.get("examTypeId")?.value,
      academicPeriodId: this.academicPeriods[0]!.id!,
      subjectId: this.getStudentForm.get("subjectId")?.value,
      classId: this.getStudentForm.get("classId")?.value,
      classSectionId: this.getStudentForm.get("classSectionId")?.value,
    };

    this.toggleLoading();
    this.resultService
      .getResults(payload)
      .pipe(finalize(() => this.toggleLoading()))
      .subscribe({
        next: (response) => {
          if (response.success) {
            const resultsMap = new Map<string, number>();

            if (response.data?.studentResults?.length > 0) {
              response.data.studentResults.forEach((result: any) => {
                resultsMap.set(result.admissionNumber, result.requestScore);
              });

              this.studentEnrollmentsToDisplay =
                this.studentEnrollmentsToDisplay.map((student: any) => {
                  return {
                    ...student,
                    result: resultsMap.has(student.admissionNumber)
                      ? resultsMap.get(student.admissionNumber)
                      : 0,
                  };
                });
            }
          }
        },
        error: () => {},
      });
  }

  deleteResults(toDelete?: any) {
    SimpleAlerts.confirmDeleteDialog().then((result) => {
      if (result) {
        this.toggleLoading();

        const payload = {
          examTypeId: this.getStudentForm.get("examTypeId")?.value,
          academicPeriodId: this.academicPeriods[0]?.id,
          subjectId: this.getStudentForm.get("subjectId")?.value,
          classId: this.getStudentForm.get("classId")?.value,
          classSectionId: this.getStudentForm.get("classSectionId")?.value,
          requestGradingScale: this.scale?.id,
          deleteForEntireClass: !toDelete,
          admissionNumbers: toDelete ? [toDelete.admissionNumber] : [],
        };

        this.resultService
          .deleteResults(payload)
          .pipe(finalize(() => this.toggleLoading()))
          .subscribe({
            next: (response) => {
              if (response.success) {
                SimpleAlerts.showSuccess();
                this.getStudents();
              } else {
                SimpleAlerts.showError(response.message);
              }
            },
            error: (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
            },
          });
      }
    });
  }

  saveResults() {
    if (
      this.getStudentForm.invalid ||
      this.studentEnrollmentsToDisplay.length === 0
    ) {
      SimpleAlerts.showWarning();
      return;
    }

    const invalidResults = this.studentEnrollmentsToDisplay.some(
      (student: any) => {
        return student.result < 0 || student.result > 20;
      }
    );

    const payload = {
      examTypeId: this.getStudentForm.get("examTypeId")?.value,
      academicPeriodId: this.academicPeriods[0]!.id!,
      subjectId: this.getStudentForm.get("subjectId")?.value,
      classId: this.getStudentForm.get("classId")?.value,
      classSectionId: this.getStudentForm.get("classSectionId")?.value,
      requestGradingScale: this.scale!.id!,
      studentResults: this.studentEnrollmentsToDisplay.map((student: any) => ({
        admissionNumber: student.admissionNumber,
        requestScore: student.result,
      })),
    };
    SimpleAlerts.confirmDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        this.resultService
          .saveResults(payload)
          .pipe(finalize(() => this.toggleLoading()))
          .subscribe({
            next: (response) => {
              if (response.success) {
                SimpleAlerts.showSuccess();
                this.dismissModal();
                this.resetForm();
              } else {
                SimpleAlerts.showError(response.message);
              }
            },
            error: (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
            },
          });
      }
    });
  }

  resetForm() {}

  getGradingScale() {
    this.gradeService.getActiveGradingSystem().subscribe({
      next: (response) => {
        if (response.success) {
          this.scale = response.data?.scale;
        }
      },
      error: () => {},
    });
  }

  getClasses() {
    this.teacherService.getMyClasses().subscribe({
      next: (response) => {
        if (response.success) {
          this.teacherClasses = response.data;
        }
      },
      error: () => {},
    });
  }

  getSections() {
    this.teacherService.getMyClassSections().subscribe({
      next: (response) => {
        if (response.success) {
          this.teacherSections = response.data?.filter(section => section != null);
        }
      },
      error: () => {},
    });
  }

  getActiveAcademicPeriod() {
    this.academicService.getActiveAcademicPeriods().subscribe({
      next: (response) => {
        if (response.success) {
          this.academicPeriods = response.data;
        }
      },
      error: () => {},
    });
  }

  handleBatchUpload(data: any[]) {
    if (
      !this.studentEnrollmentsToDisplay ||
      this.studentEnrollmentsToDisplay.length === 0
    ) {
      SimpleAlerts.showWarning("Please load students first");
      this.dismissModal();
      return;
    }
    const validation = this.validateResults(data);
    if (!validation.isValid) {
      const invalidDetails = validation.invalidEntries
        .map((entry) => `${entry.result}`)
        .join(",");
      SimpleAlerts.showWarning("Invalid results", 30000, `${invalidDetails}`);
      return;
    }

    const resultsMap = new Map<string, number>();

    if (data?.length > 0) {
      data.forEach((r: any) => {
        resultsMap.set(r.admissionNumber, r.result);
      });

      this.studentEnrollmentsToDisplay = this.studentEnrollmentsToDisplay.map(
        (student: any) => {
          return {
            ...student,
            result: resultsMap.has(student.admissionNumber)
              ? resultsMap.get(student.admissionNumber)
              : 0,
          };
        }
      );
    }
  }

  downloadTemplate(): void {
    if (
      !this.studentEnrollmentsToDisplay ||
      this.studentEnrollmentsToDisplay.length === 0
    ) {
      SimpleAlerts.showWarning("Please load students first");
      return;
    }

    const templateData = this.studentEnrollmentsToDisplay.map(
      (student: any) => ({
        admissionNumber: student.admissionNumber,
        familyName: student.familyName,
        givenNames: student.givenNames,
        result: student.result,
      })
    );

    const className =
      this.teacherClasses.find(
        (c: any) => c.id === this.getStudentForm.value.classId
      )?.name || "Class";
    const subjectName =
      this.teacherSubjects.find(
        (s: any) => s.id === this.getStudentForm.value.subjectId
      )?.name || "Subject";
    const examTypeName =
      this.examTypes.find(
        (e: any) => e.examTypeId === this.getStudentForm.value.examTypeId
      )?.name || "Exam";

    const fileName = `${className}_${subjectName}_${examTypeName}_Template.xlsx`;

    exportJsonToExcel(templateData, fileName);
  }

  private validateResults(results: any[]): {
    isValid: boolean;
    invalidEntries: any[];
  } {
    if (!this.scale) {
      return { isValid: false, invalidEntries: [] };
    }

    const maxScore = this.scale!;
    const minScore = 0;

    const invalidEntries = results.filter((item) => {
      const resultValue = Number(item.result);
      return (
        isNaN(resultValue) || resultValue < minScore || resultValue > maxScore
      );
    });

    return {
      isValid: invalidEntries.length === 0,
      invalidEntries: invalidEntries,
    };
  }
}
