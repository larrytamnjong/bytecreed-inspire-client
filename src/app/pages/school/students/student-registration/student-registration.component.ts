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

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.scss'
})
export class StudentRegistrationComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  studentForm!: UntypedFormGroup;
  addressForm!: UntypedFormGroup;
  extraForm!: UntypedFormGroup;
  reloadTable: boolean = false;
  submitted = false;
  isCreateMode = true;
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
  get fExtra() {return this.extraForm.controls;}

  classes: any = [];
  classSections: any = [];
  academicYears: any = [];

constructor( 
    private modalService: NgbModal,
    private studentService: StudentService,
    private studentFormBuilder: UntypedFormBuilder,
    private addressFormBuilder: UntypedFormBuilder,
    private extraFormBuilder: UntypedFormBuilder,
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

    this.extraForm = this.extraFormBuilder.group({
      autoEnroll: [false, [Validators.required]],
      classId: [null],
      classSectionId: [null],
      academicYearId: [null],
    });


    this.extraForm.get('autoEnroll')?.valueChanges.subscribe((autoEnroll: boolean) => {
      const classId = this.extraForm.get('classId');
      const classSectionId = this.extraForm.get('classSectionId');
      const academicYearId = this.extraForm.get('academicYearId');
  
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
    this.extraForm.get('classId')?.disable();
    this.extraForm.get('classSectionId')?.disable();
    this.extraForm.get('academicYearId')?.disable();
    this.isCreateMode = true;
    this.submitted = false;
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
    if (this.studentForm.invalid || this.addressForm.invalid) {
      return;
    }
    const student = this.studentForm.value;
    const address = this.addressForm.value;
    const extra = this.extraForm.value;
    student.address = address;
    student.sex =  Number(this.fStudent["sex"].value);
    
    if(this.isCreateMode){
      if(this.extraForm.invalid) {
        return;
      }

      this.toggleLoading();
      this.studentService.registerStudents({students: [student], ...extra}).pipe(
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
      countryId: address?.countryId,
      addressLine1: address?.addressLine1,
      addressLine2: address?.addressLine2,
      postalCode: address?.postalCode
    });
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
  }

  reset() {
    this.submitted = false;
    this.isCreateMode = true;
    this.addressForm.reset();
    this.studentForm.reset();
    this.studentForm.patchValue({status: 1})
    this.extraForm.reset();
    this.extraForm.patchValue({autoEnroll: false});
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

}
