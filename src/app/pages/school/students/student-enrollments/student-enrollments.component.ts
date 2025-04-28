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
import { SubjectService } from 'src/app/core/services/api/subject.service';
import { CourseService } from 'src/app/core/services/api/course.service';

@Component({
  selector: 'app-student-enrollments',
  templateUrl: './student-enrollments.component.html',
  styleUrl: './student-enrollments.component.scss'
})
export class StudentEnrollmentsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  studentEnrollmentCreateForm!: UntypedFormGroup;
  studentEnrollmentGetForm!: UntypedFormGroup;
  studentSubjectForm!: UntypedFormGroup;
  studentCourseForm!: UntypedFormGroup;
  studentEnrollments: any = [];
  academicYear: string | null = null;
  class: string | null = null;
  section: string | null = null;
  studentEnrollmentsToDisplay: any = [];
  students: any = [];
  submitted = false;

  selectedEnrollments: any[] = [];

  subjects: any = [];
  courses: any = [];
  
  headers: any = [
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'}, 
    { key: 'dateOfBirth', displayName: 'Date Of Birth' },
    { key: 'sex', displayName: 'Sex' },
    { key: 'admissionNumber', displayName: 'Admission Number' },
    { key: 'class', displayName: 'Class' },
    { key: 'section', displayName: 'Section' },
    { key: 'year', displayName: 'Year' },
  ]

  get fStudentEnrollmentCreateForm() {return this.studentEnrollmentCreateForm.controls;}
  get fStudentEnrollmentGetForm() {return this.studentEnrollmentGetForm.controls;}
  get fStudentSubjectForm() {return this.studentSubjectForm.controls;}
  get fStudentCourseForm() {return this.studentCourseForm.controls;}

  classes: any = [];
  classSections: any = [];
  academicYears: any = [];

  constructor( 
        private modalService: NgbModal,
        private studentService: StudentService,
        private studentEnrollmentCreateFormBuilder: UntypedFormBuilder,
        private studentEnrollmentGetFormBuilder: UntypedFormBuilder,
        private studentSubjectFormBuilder: UntypedFormBuilder,
        private studentCourseFormBuilder: UntypedFormBuilder,
        private classSectionService: ClassSectionService,
        private classService: ClassService,
        private academicService: AcademicService,
        private subjectService: SubjectService,
        private courseService: CourseService,
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

    this.studentSubjectForm = this.studentSubjectFormBuilder.group({
      subjectIds: [null, [Validators.required]],
      enrollmentIds: [null, [Validators.required]],
    });

    this.studentCourseForm = this.studentCourseFormBuilder.group({
      courseId: [null, [Validators.required]],
      studentIds: [null, [Validators.required]],
    });

    this.getLookUps();
    this.getClassSections();
    this.getClasses();
    this.getAcademicYears();
    this.getSubjects();
    this.getCourses();
    this.getStudentEnrollments();
  }

  addModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, {...this.mdModalConfig, backdrop: 'static'});
  }

  onCreateSubmit() {
    this.studentEnrollmentCreateForm.patchValue({studentIds: this.selectedEnrollments.map((item: any) => item.studentId)});
    this.submitted = true;
    if (this.studentEnrollmentCreateForm.invalid) {
      return;
    }
    this.toggleLoading();
    this.studentService.addStudentsEnrollment(this.studentEnrollmentCreateForm.value).pipe(finalize(() => {this.toggleLoading();})).subscribe({
        next: (response) => {
          if(response.success){
            SimpleAlerts.showSuccess();
            this.modalService.dismissAll();
            this.reset();
            this.getStudentEnrollments();
          }else{
            SimpleAlerts.showError(response.message);
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
  }

  onCreateStudentSubjects(){
    this.studentSubjectForm.patchValue({enrollmentIds: this.selectedEnrollments.map((item: any) => item.id)});
    this.submitted = true;
    if (this.studentSubjectForm.invalid) {
      return;
    }

    this.toggleLoading();
    this.studentService.addStudentSubjects(this.studentSubjectForm.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          SimpleAlerts.showSuccessWithOptions('Do you want to cancel selected items?').then((result) => {
            if (result) {
              this.reset();
              this.dismissModal();
              this.getStudentEnrollments();
            }else{
              this.modalService.dismissAll();
              return;
            }
          });
        }else{SimpleAlerts.showError(response.message);}
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    });
  }

  onDeleteStudentSubjects(){
    this.studentSubjectForm.patchValue({enrollmentIds: this.selectedEnrollments.map((item: any) => item.id)});
    this.submitted = true;
    if (this.studentSubjectForm.invalid) {
      return;
    }

    this.toggleLoading();
    this.studentService.deleteStudentSubjects(this.studentSubjectForm.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          SimpleAlerts.showSuccessWithOptions('Do you want to cancel selected items?').then((result) => {
            if (result) {
              this.reset();
              this.dismissModal();
              this.getStudentEnrollments();
            }else{
              this.studentSubjectForm.reset();
              this.modalService.dismissAll();
              return;
            }
          });
        }else{
          SimpleAlerts.showError(response.message);
        }
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    });
  }
 
  onCreateStudentCourse(){
    this.studentCourseForm.patchValue({studentIds: this.selectedEnrollments.map((item: any) => item.studentId)});
    this.submitted = true;
    if (this.studentCourseForm.invalid) {
      return;
    }
    this.toggleLoading();
    this.studentService.addStudentCourses(this.studentCourseForm.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          SimpleAlerts.showSuccessWithOptions('Do you want to cancel selected items?').then((result) => {
            if
            (result) {
              this.reset();
              this.dismissModal2();
              this.getStudentEnrollments();
            }else{
              this.studentCourseForm.reset();
              this.modalService.dismissAll();
              return;
            }
          });
        }else{
          SimpleAlerts.showError(response.message);
        }
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    });
  }

  onDeleteStudentCourse(){
    this.studentCourseForm.patchValue({studentIds: this.selectedEnrollments.map((item: any) => item.studentId)});
    this.submitted = true;
    if (this.studentCourseForm.invalid) {
      return;
    }
    this.toggleLoading();
    this.studentService.deleteStudentCourses(this.studentCourseForm.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          SimpleAlerts.showSuccessWithOptions('Do you want to cancel selected items?').then((result) => {
            if (result) {
              this.reset();
              this.dismissModal2();
              this.getStudentEnrollments();
            }else{
              this.studentCourseForm.reset();
              this.modalService.dismissAll();
              return;
            }
          });
        }else{
          SimpleAlerts.showError(response.message);
        }
      },
      error: (error) => {
       SimpleAlerts.showError(getErrorMessage(error));
      }
    }
  )};

  onDeleteSubmit(){
    SimpleAlerts.confirmDeleteDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        const enrollmentIds = this.selectedEnrollments.map((item: any) => item.id);
        this.studentService.deleteStudentEnrollment(enrollmentIds).pipe(
          finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
          next: (response) => {
            if(response.success){SimpleAlerts.showSuccess(); this.getStudentEnrollments();
            }else{SimpleAlerts.showError(response.message);}
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }else{
        return;
      }
    });
  }

  onDeleteClick(enrollment: any) {
    this.selectedEnrollments.push(enrollment);
    this.onDeleteSubmit();
  }

  reset() {
    this.submitted = false;
    this.studentEnrollmentCreateForm.reset();
    this.studentEnrollments = [];
    this.studentEnrollmentsToDisplay = [];
    this.selectedEnrollments = [];
  }

  getStudentEnrollments() {
    var classId = this.studentEnrollmentGetForm.get('classId')?.value;
    var classSectionId = this.studentEnrollmentGetForm.get('classSectionId')?.value;
    var academicYearId =  this.studentEnrollmentGetForm.get('academicYearId')?.value;
    this.toggleLoading();
    this.studentService.getStudentEnrollments(academicYearId, classId, classSectionId).pipe(finalize(() => this.toggleLoading())).subscribe({
        next: (response) => {
          this.studentEnrollments = response.data;
          if(this.studentEnrollments.length > 0){
            this.class = this.studentEnrollments[0].class.name;
            this.academicYear = this.studentEnrollments[0].academicYear.name;
            this.section = this.studentEnrollments[0].classSection?.name;
          }else{
            this.class = null;
            this.academicYear = null;
            this.section = null;
          }
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

  onSelectedRowsChange(selectedRows: any) {
    this.selectedEnrollments = selectedRows;
  }

  dismissModal() {
    this.modalService.dismissAll();
    SimpleAlerts.confirmCloseDialog('Would you like to unselect selected students?').then((result) => {
      if (result) {
        this.reset();
        this.getStudentEnrollments();
      }else{
        return;
      }
    });
  }

  dismissModal2() {
    this.modalService.dismissAll();
    this.reset();
    this.getStudentEnrollments();
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
        class: enrollment.class?.name || '#',
        studentId: enrollment.student?.id || '#',
        year: enrollment.academicYear?.name || '#',
        section: enrollment.classSection?.name || '#',
      };
    });
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe({
        next: (response) => {this.subjects = response.data;},
        error: (error) => {}
      });
  }

  getCourses() {
    this.courseService.getCourses().subscribe({
        next: (response) => {this.courses = response.data;},
        error: (error) => {}
      });
  }
}
