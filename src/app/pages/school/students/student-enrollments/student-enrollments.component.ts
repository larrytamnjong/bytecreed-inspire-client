import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { Address } from 'src/app/core/Models/common/address';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { StudentService } from 'src/app/core/services/api/student.service';
import { Student } from 'src/app/core/Models/api/student';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { exportJsonToExcel } from 'src/app/core/helpers/excel-utility';
import { studentSampleTemplate } from 'src/app/core/samples/student-sample';
import { formatDateToLocalISOString } from 'src/app/core/helpers/date-utility';
import { StudentEnrollment } from 'src/app/core/Models/api/student';

@Component({
  selector: 'app-student-enrollments',
  templateUrl: './student-enrollments.component.html',
  styleUrl: './student-enrollments.component.scss'
})
export class StudentEnrollmentsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  studentEnrollmentCreateForm!: UntypedFormGroup;
  studentEnrollmentGetForm!: UntypedFormGroup;
  studentEnrollments: any = [];
  studentEnrollmentsToDisplay: any = [];
  submitted = false;

  enrollmentIdsToDelete: string[] = [];
  
  headers: any = [
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'}, 
    { key: 'dateOfBirth', displayName: 'Date Of Birth' },
    { key: 'sex', displayName: 'Sex' },
    { key: 'admissionNumber', displayName: 'Admission Number' },
    { key: 'class', displayName: 'Class' },
  ]

  get fStudentEnrollmentCreateForm() {return this.studentEnrollmentCreateForm.controls;}
  get fStudentEnrollmentGetForm() {return this.studentEnrollmentGetForm.controls;}

  classes: any = [];
  classSections: any = [];
  academicYears: any = [];

  constructor( 
        private modalService: NgbModal,
        private studentService: StudentService,
        private studentEnrollmentCreateFormBuilder: UntypedFormBuilder,
        private studentEnrollmentGetFormBuilder: UntypedFormBuilder,
        private classSectionService: ClassSectionService,
        private classService: ClassService,
        private academicService: AcademicService,
        protected override store: Store<{ data: RootReducerState }>, ) {
        super(store);
      }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Students'},{ label: 'Enrollment', active: true }];

    this.studentEnrollmentCreateForm = this.studentEnrollmentCreateFormBuilder.group({
      classId: [null, [Validators.required]],
      classSectionId: [null],
      academicYearId: [null, [Validators.required]],
      studentIds: [null,[Validators.required]],
    });

    this.studentEnrollmentGetForm = this.studentEnrollmentGetFormBuilder.group({
      classId: [null],
      classSectionId: [null],
      academicYearId: [null],
    });

    this.getLookUps();
    this.getClassSections();
    this.getClasses();
    this.getAcademicYears();
  }

  addModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }

  onCreateSubmit() {
    this.submitted = true;
    if (this.studentEnrollmentCreateForm.invalid) {
      return;
    }
    
    this.modalService.dismissAll();
      this.studentService.addStudentsEnrollment(this.studentEnrollmentCreateForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.reset();})
      ).subscribe({
        next: (response) => {
          if(response.success){
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
  }

  onDeleteSubmit(){
    SimpleAlerts.confirmDeleteDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        this.studentService.deleteStudentEnrollment(this.enrollmentIdsToDelete).pipe(
          finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
          next: (response) => {
            if(response.success){SimpleAlerts.showSuccess();
            }else{SimpleAlerts.showError(response.message);}
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }else{
        return;
      }
    });
  }

  reset() {
    this.submitted = false;
    this.studentEnrollmentCreateForm.reset();
    this.studentEnrollments = [];
  }

  getStudentEnrollments() {
    var classId = this.studentEnrollmentGetForm.get('classId')?.value;
    var classSectionId = this.studentEnrollmentGetForm.get('classSectionId')?.value;
    var academicYearId =  this.studentEnrollmentGetForm.get('academicYearId')?.value;
    this.toggleLoading();
    this.studentService.getStudentEnrollments(academicYearId, classId, classSectionId).pipe(finalize(() => this.toggleLoading()))
    .subscribe({
        next: (response) => {
          this.studentEnrollments = response.data;
          this.setStudentEnrollmentsToDisplay(this.studentEnrollments);
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
  }

  getClasses() {
    this.classService.getClasses().subscribe({
      next: (response) => {
        if(response.success){ this.classes = response.data;}
      },
      error: () => {},
    });
  }

  getAcademicYears() {
    this.academicService.getAcademicYears().subscribe({
        next: (response) => {
          this.academicYears = response.data;
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
  }

  getClassSections() {
    this.classSectionService.getClassSections().subscribe({
      next: (response) => {
        if(response.success){
        this.classSections = response.data;
        }
      },
      error: (error) => {},
    });
  }

  setStudentEnrollmentsToDisplay(enrollments: StudentEnrollment[]): void {
    this.studentEnrollmentsToDisplay = enrollments.map((enrollment) => {
      return {
        id: enrollment.id,
        familyName: enrollment.student?.familyName || '#',
        givenNames: enrollment.student?.givenNames || '#',
        dateOfBirth: enrollment.student?.dateOfBirth || '#',
        sex: enrollment.student?.sex || '#',
        admissionNumber: enrollment.student?.admissionNumber || '#',
        class: enrollment.class?.name || '#'
      };
    });
  }
  
}
