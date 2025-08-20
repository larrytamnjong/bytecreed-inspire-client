import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { StudentService } from 'src/app/core/services/api/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { StudentEnrollment } from 'src/app/core/Models/api/student';
import { SubjectService } from 'src/app/core/services/api/subject.service';
import { Subject } from 'src/app/core/Models/api/subject';
import { FeeType } from 'src/app/core/Models/api/fee';
import { FeesService } from 'src/app/core/services/api/fees.service';


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
  studentEnrollments: any = [];
  studentEnrollmentsToDisplay: any = [];
  students: any = [];
  submitted = false;

  selectedEnrollments: any[] = [];

  feeTypes: any = [];
  subjects: any = [];
  classes: any = [];
  classSections: any = [];
  academicYears: any = [];
  
  activeYearClasses: any = [];
  activeYearClassSections: any = [];

  selectedStudentEnrollment: any = null;
  selectedStudentSelectedSubjects:  [] = [];
  selectedStudentSelectedFeeTypes: [] = [];
  selectedStudentSubjects: any = [];
  selectedStudentFeeTypes: any = [];
  selectedStudentSubjectHeaders: any = [
    { key: 'name', displayName: 'Name' },
    { key: 'description', displayName: 'Description' },
    { key: 'coefficient', displayName: 'Coefficient' },
    { key: 'code', displayName: 'Code' },
  ];

  selectedStudentFeeTypesHeaders: any = [
    { key: 'name', displayName: 'Name' },
    { key: 'amount', displayName: 'Amount' }
  ];
  
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

  constructor( 
        private modalService: NgbModal,
        private studentService: StudentService,
        private studentEnrollmentCreateFormBuilder: UntypedFormBuilder,
        private studentEnrollmentGetFormBuilder: UntypedFormBuilder,
        private studentSubjectFormBuilder: UntypedFormBuilder,
        private classSectionService: ClassSectionService,
        private classService: ClassService,
        private academicService: AcademicService,
        private subjectService: SubjectService,
        private feeTypeService: FeesService,
        protected override store: Store<{ data: RootReducerState }>, ) {
        super(store);
      }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Students'},{ label: 'Enrollment', active: true }];

    this.studentEnrollmentCreateForm = this.studentEnrollmentCreateFormBuilder.group({
      classId: [null, [Validators.required]],
      classSectionId: [null],
      studentIds: [null,[Validators.required]],
    });

    this.studentEnrollmentGetForm = this.studentEnrollmentGetFormBuilder.group({
      classId: [null],
      classSectionId: [null],
      academicYearId: [null],
    });

    this.studentEnrollmentGetForm.get("academicYearId")?.valueChanges.subscribe((value) => {
      if (value) {
        this.clearClassesAndClassSections();
        this.getClasses(value);
        this.getClassSections(value);
        this.getSubjects(value);
      } 
    });

    this.studentSubjectForm = this.studentSubjectFormBuilder.group({
      subjectIds: [null, [Validators.required]],
      enrollmentIds: [null, [Validators.required]],
    });

    this.getLookUps();
    this.getAcademicYears();
    this.getSubjects();
    this.getStudentEnrollments();
    this.getClassSections();
    this.getClasses();
    this.getFeeTypes();
  }

  addModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
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
    this.studentService.assignStudentSubjects(this.studentSubjectForm.value, this.studentEnrollmentGetForm.get("academicYearId")?.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          this.dismissModal();
          SimpleAlerts.showSuccess();
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
    this.studentService.deleteStudentSubjects(this.studentSubjectForm.value, this.studentEnrollmentGetForm.get("academicYearId")?.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          this.dismissModal();
          SimpleAlerts.showSuccess();
        }else{
          SimpleAlerts.showError(response.message);
        }
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    });
  }
 
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

  onEditClick(enrollment: any, content: any){
    this.selectedStudentEnrollment = enrollment;
    this.modalService.open(content, {...this.xlModalConfig, backdrop: 'static'});
    this.loadSelectedStudentSubjects();
    this.loadSelectedStudentFees();
  }

  loadSelectedStudentSubjects(){
    this.toggleLoading();
    this.studentService.getStudentSubjects([this.selectedStudentEnrollment.id], this.selectedStudentEnrollment.academicYearId ).pipe(finalize(() => {this.toggleLoading();})).subscribe({
      next: (response) => {
        if (response.data && response?.data[0]?.subjects) {
          this.selectedStudentSubjects = response.data[0].subjects.map((subject: Subject) => ({...subject}));
        } else {
          this.selectedStudentSubjects = [];
        }
      },
      error: (error) => {}
    });
  }

   loadSelectedStudentFees(){
    this.toggleLoading();
    this.studentService.getStudentFeeTypes([this.selectedStudentEnrollment.id], this.selectedStudentEnrollment.academicYearId ).pipe(finalize(() => {this.toggleLoading();})).subscribe({
      next: (response) => {
        if (response.data && response?.data[0]?.feeTypes) {
          this.selectedStudentFeeTypes = response.data[0].feeTypes.map((fees: FeeType) => ({...fees}));
        } else {
          this.selectedStudentFeeTypes = [];
        }
      },
      error: (error) => {}
    });
  }

  onSelectedStudentSubjectsSaveClick(){
    if (this.selectedStudentSelectedSubjects.length === 0) {
      return;
    }

    this.toggleLoading();
    var data = {
      subjectIds: this.selectedStudentSelectedSubjects, 
      enrollmentIds: [this.selectedStudentEnrollment.id]
    }

    this.studentService.assignStudentSubjects(data, this.studentEnrollmentGetForm.get("academicYearId")?.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          this.selectedStudentSelectedSubjects = [];
          this.loadSelectedStudentSubjects();
          SimpleAlerts.showSuccess();
        }else{SimpleAlerts.showError(response.message);}
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    });
  }

  onSelectedStudentFeeTypesSaveClick(){
    if (this.selectedStudentSelectedFeeTypes.length === 0) {
      return;
    }

    this.toggleLoading();
    var data = {
      feeTypeIds: this.selectedStudentSelectedFeeTypes, 
      enrollmentIds: [this.selectedStudentEnrollment.id]
    }

    this.studentService.assignStudentFeeType(data, this.studentEnrollmentGetForm.get("academicYearId")?.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          this.selectedStudentSelectedFeeTypes = [];
          this.loadSelectedStudentFees();
          SimpleAlerts.showSuccess();
        }else{SimpleAlerts.showError(response.message);}
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    });
  }

  onSelectedStudentSubjectDeleteClick(subject: any){
    SimpleAlerts.confirmDeleteDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        var data = {
          subjectIds: [subject.id], 
          enrollmentIds: [this.selectedStudentEnrollment.id]
        }
        this.studentService.deleteStudentSubjects(data, this.studentEnrollmentGetForm.get("academicYearId")?.value).pipe(finalize(() => this.toggleLoading())).subscribe({
          next: (response) => {
            if(response.success){
              this.loadSelectedStudentSubjects();
              SimpleAlerts.showSuccess();
            }else{SimpleAlerts.showError(response.message);}
          },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          }
        });
      }else{
        return;
      }
    });
  }

    onSelectedStudentFeeTypeDeleteClick(subject: any){
    SimpleAlerts.confirmDeleteDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        var data = {
          feeTypeIds: [subject.id], 
          enrollmentIds: [this.selectedStudentEnrollment.id]
        }
        this.studentService.unassignStudentFeeType(data, this.studentEnrollmentGetForm.get("academicYearId")?.value).pipe(finalize(() => this.toggleLoading())).subscribe({
          next: (response) => {
            if(response.success){
              this.loadSelectedStudentFees();
              SimpleAlerts.showSuccess();
            }else{SimpleAlerts.showError(response.message);}
          },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          }
        });
      }else{
        return;
      }
    });
  }

  reset() {
    this.submitted = false;
    this.studentSubjectForm.reset();
    this.studentEnrollmentCreateForm.reset();
    this.studentEnrollments = [];
    this.studentEnrollmentsToDisplay = [];
    this.selectedEnrollments = [];
  }

  getStudentEnrollments() {
    this.selectedEnrollments = [];
    var classId = this.studentEnrollmentGetForm.get('classId')?.value;
    var classSectionId = this.studentEnrollmentGetForm.get('classSectionId')?.value;
    var academicYearId =  this.studentEnrollmentGetForm.get('academicYearId')?.value;
    this.toggleLoading();
    this.studentService.getStudentEnrollments(academicYearId, classId, classSectionId, null).pipe(finalize(() => this.toggleLoading())).subscribe({
        next: (response) => {
          this.studentEnrollments = response.data;
          this.studentEnrollmentsToDisplay = this.setStudentEnrollmentsToDisplay(this.studentEnrollments);
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
  }

  onSelectedRowsChange(selectedRows: any) {
    this.selectedEnrollments = selectedRows;
  }

  dismissModal() {
    this.submitted = false;
    this.modalService.dismissAll();
    this.reset();
    this.getStudentEnrollments();
  }

  dismissStudentInfoModal(){
    this.modalService.dismissAll();
    this.selectedStudentEnrollment = null;
    this.selectedStudentSubjects = [];
  }

  getAcademicYears() {
    this.academicService.getAcademicYears().subscribe({
        next: (response) => {
          this.academicYears = response.data;
        },
        error: (error) => {}
      });
  }

   getClasses(academicYearId?: any) {
    if(!academicYearId){
       this.classService.getClasses().subscribe({
      next: (response) => {
        if(response.success)
          { this.activeYearClasses = response.data;}
      },
      error: () => {},
    });
    }else{
      this.classService.getClasses(academicYearId).subscribe({
        next: (response) => {
          if(response.success){ this.classes = response.data;}
        },
        error: () => {},
      });
    }
  }

  getClassSections(academicYearId?: any) {
    if(!academicYearId){
       this.classSectionService.getClassSections().subscribe({
        next: (response) => {
          if(response.success){
          this.activeYearClassSections = response.data;
          }
        },
        error: (error) => {},
      });
    }else{
      this.classSectionService.getClassSections(academicYearId).subscribe({
        next: (response) => {
          if(response.success){
          this.classSections = response.data;
          }
        },
        error: (error) => {},
      });
    }
  }

  clearClassesAndClassSections() {
    this.classes = [];
    this.classSections = [];
    this.studentEnrollmentGetForm.patchValue({classId: null, classSectionId: null});
  }

  getSubjects(academicYearId?: any) {
    this.subjectService.getSubjects(academicYearId).subscribe({
        next: (response) => {this.subjects = response.data;},
        error: (error) => {}
      });
  }

  getFeeTypes() {
  this.feeTypeService.getFeeTypes().subscribe({
      next: (response) => {
        this.feeTypes = response.data;
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
  });
}

  async onPrint() {
    this.toggleLoading();
    await this.generatePDF("student-subjects", "student-subjects.pdf");
    this.toggleLoading();
  }

}
