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
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.scss'
})
export class StudentRegistrationComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  studentSampleTemplate = studentSampleTemplate;
  studentForm!: UntypedFormGroup;
  addressForm!: UntypedFormGroup;
  enrollmentForm!: UntypedFormGroup;
  reloadTable: boolean = false;
  submitted = false;
  isCreateMode = true;

  isBatchCreateMode = false;
  studentBatch: Student[] = [];

  headers: any = [
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'}, 
    { key: 'dateOfBirth', displayName: 'Date Of Birth' },
    { key: 'sex', displayName: 'Sex' },
    { key: 'admissionNumber', displayName: 'Admission Number' },
    { key: 'status', displayName: 'Status' },
  ]

  get fStudent() {return this.studentForm.controls;}
  get fAddress() {return this.addressForm.controls;}
  get fEnrollment() {return this.enrollmentForm.controls;}

  classes: any = [];
  classSections: any = [];
  academicYears: any = [];

constructor( 
    private modalService: NgbModal,
    private studentService: StudentService,
    private studentFormBuilder: UntypedFormBuilder,
    private addressFormBuilder: UntypedFormBuilder,
    private enrollmentFormBuilder: UntypedFormBuilder,
    private classSectionService: ClassSectionService,
    private classService: ClassService,
    private academicService: AcademicService,
    protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Students'},{ label: 'Registration', active: true }];

    this.studentForm = this.studentFormBuilder.group({
      id: [null],
      familyName: [null, [Validators.required]],
      givenNames: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      sex: [null,[Validators.required]],
      admissionNumber: [null],
      status: [1],
      userId: [null],
      addressId: [null]
    });

    this.addressForm = this.addressFormBuilder.group({
      countryId: [null],
      addressLine1: [null],
      addressLine2: [null],
      postalCode: [null]
    });

    this.enrollmentForm = this.enrollmentFormBuilder.group({
      autoEnroll: [false, [Validators.required]],
      classId: [null],
      classSectionId: [null],
      academicYearId: [null],
    });


    this.enrollmentForm.get('autoEnroll')?.valueChanges.subscribe((autoEnroll: boolean) => {
      const classId = this.enrollmentForm.get('classId');
      const classSectionId = this.enrollmentForm.get('classSectionId');
      const academicYearId = this.enrollmentForm.get('academicYearId');
  
      if (autoEnroll === true) {
        classId?.setValidators([Validators.required]);
        academicYearId?.setValidators([Validators.required]);
        classId?.enable();
        academicYearId?.enable();
        classSectionId?.enable();
      } else {
        classId?.clearValidators();
        academicYearId?.clearValidators();
        classId?.setValue(null); 
        academicYearId?.setValue(null);
        classId?.disable();
        academicYearId?.disable();
        classSectionId?.disable();
      }
  
      classId?.updateValueAndValidity();
    });

    this.getLookUps();
    this.getClassSections();
    this.getClasses();
    this.getAcademicYears();
  }

   addModal(content: any) {
    this.isCreateMode = true;
    this.submitted = false;
    this.enrollmentForm.get('classId')?.disable();
    this.enrollmentForm.get('classSectionId')?.disable();
    this.enrollmentForm.get('academicYearId')?.disable();
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }

  addBatchModal(content: any) {
    this.isBatchCreateMode = true;
    this.isCreateMode = true
    this.submitted = false;
    this.enrollmentForm.get('classId')?.disable();
    this.enrollmentForm.get('classSectionId')?.disable();
    this.enrollmentForm.get('academicYearId')?.disable();
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }
  
  editModal(content: any, student: Student) {
    this.isCreateMode = false;
    this.submitted = false;
    this.setStudentValues(student);
    this.setAddressValues(student.address);
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }

  onSubmitStudent() {
    this.submitted = true;

    if(this.enrollmentForm.invalid) {
      return;
    }
    const enrollment = this.enrollmentForm.value;

    if(this.isBatchCreateMode) {
      if(this.studentBatch.length < 1) {
        return;
      }
      this.toggleLoading();

      this.studentBatch = this.studentBatch.map(student => {
        return {
          ...student,
          dateOfBirth: formatDateToLocalISOString(new Date(student.dateOfBirth))
        };
      });

      this.studentService.registerStudents({students: this.studentBatch, ...enrollment}).pipe(
        finalize(() => {this.toggleLoading();})).subscribe({
        next: (response) => {
          if(!response.success) {SimpleAlerts.showError(response.message);}
          if (response.success) {SimpleAlerts.showSuccess();}
          this.toggleReloadTable();
          this.dismissModal();
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
    }else{
    if (this.studentForm.invalid || this.addressForm.invalid) {
      return;
    }

    const student = this.studentForm.value;
    const address = this.addressForm.value;
    student.address = address;
    student.sex =  Number(this.fStudent["sex"].value);
    student.dateOfBirth = formatDateToLocalISOString(new Date(this.studentForm.get('dateOfBirth')?.value));

    if(this.isCreateMode){
      this.toggleLoading();
      this.studentService.registerStudents({students: [student], ...enrollment}).pipe(
        finalize(() => {this.toggleLoading();})
      ).subscribe({
        next: (response) => {
          if(!response.success) {SimpleAlerts.showError(response.message);}
          if (response.success) {SimpleAlerts.showSuccess();}
          this.toggleReloadTable();
          this.dismissModal();
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
    }else{
      SimpleAlerts.confirmDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.studentService.updateStudent(student).pipe(
            finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(!response.success) {SimpleAlerts.showError(response.message);}
              if (response.success) {SimpleAlerts.showSuccess();}
              this.toggleReloadTable();
              this.dismissModal();
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
  }
}
  onSelectedRowsChange(event: any){

  }

  setStudentValues(student: Student) {
    this.studentForm.setValue({
      id: student.id,
      familyName: student.familyName,
      givenNames: student.givenNames,
      dateOfBirth: student.dateOfBirth,
      sex: student.sex,
      admissionNumber: student.admissionNumber,
      status: student.status,
      userId: student.userId,
      addressId: student.addressId
    });
  }
  
  setAddressValues(address?: Address) {
    this.addressForm.setValue({
      countryId: address?.countryId ?? null,
      addressLine1: address?.addressLine1 ?? null,
      addressLine2: address?.addressLine2 ?? null,
      postalCode: address?.postalCode ?? null
    });
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
  }

  reset() {
    this.submitted = false;
    this.isBatchCreateMode = false;
    this.isCreateMode = true;
    this.studentBatch = [];
    this.addressForm.reset();
    this.studentForm.reset();
    this.studentForm.patchValue({status: 1})
    this.enrollmentForm.reset();
    this.enrollmentForm.patchValue({autoEnroll: false});
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

  toggleReloadTable(){
    this.reloadTable = !this.reloadTable;
  }

  handleBatchUpload(data: any[]) {
    this.studentBatch = data;
  }

  downloadSampleTemplate(): void {
    exportJsonToExcel(this.studentSampleTemplate, 'student_template.xlsx');
  }

}