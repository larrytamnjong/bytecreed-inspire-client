import { Component, OnInit } from '@angular/core';
import { AcademicTerm } from 'src/app/core/Models/api/academics';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ExamTypeService } from 'src/app/core/services/api/exam-type.service';
import { ExamType } from 'src/app/core/Models/api/exam-types';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-exam-types',
  templateUrl: './exam-types.component.html',
  styleUrl: './exam-types.component.scss'
})
export class ExamTypesComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
 
  submitted: boolean = false;

  academicTerms: AcademicTerm[] | undefined = [];
  examTypes: ExamType[] | undefined | any = [];

  examTypeForm!: UntypedFormGroup;
  isCreateMode: boolean = true;
  get form() {return this.examTypeForm.controls;}

  headers: any = [
    { key: 'name', displayName: 'Name' },
    { key: 'academicTermId', displayName: 'Academic Term' },
    { key: 'useWeight', displayName: 'Use Weight' },
    { key: 'weight', displayName: 'Weight' },
    { key: 'sortOrder', displayName: 'Sort Order' },
  ]

  constructor(
    private modalService: NgbModal,
    private examTypeFormBuilder: UntypedFormBuilder,
    private examTypeService: ExamTypeService,
    private academicService: AcademicService,
    protected override store: Store<{ data: RootReducerState }>
  ){
    super(store);
  }

  ngOnInit(): void {
    this.getExamtypes();
    this.getLookUps();
    this.getAcademicTerms();
      this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Exam Types', active: true }];

      this.examTypeForm = this.examTypeFormBuilder.group({
        id: [null],
        name: [null,[Validators.required]],
        useWeight: [null, [Validators.required]],
        weight: [null],
        academicTermId: [null, [Validators.required]],
        sortOrder: [null],
      });

      this.examTypeForm.get('useWeight')?.valueChanges.subscribe((useWeight: boolean) => {
        const weightControl = this.examTypeForm.get('weight');
    
        if (useWeight === true) {
          weightControl?.setValidators([Validators.required]);
          weightControl?.enable();
        } else {
          weightControl?.clearValidators();
          weightControl?.setValue(null); 
          weightControl?.disable();
        }
    
        weightControl?.updateValueAndValidity();
      });
    }

  addModal(content: any) {
  this.isCreateMode = true;
  this.submitted = false;
  this.modalService.open(content, { size: 'md', centered: true });
  }

  editModal(content: any, examType: ExamType) {
    this.isCreateMode = false;
    this.submitted = false;
    this.examTypeForm.setValue({...examType});
    this.modalService.open(content, { size: 'md', centered: true });
  }

  getExamtypes() {
    this.toggleLoading();
    this.examTypeService.getExamTypes().pipe(finalize(() => this.toggleLoading()))
      .subscribe({
        next: (response) => {
          this.examTypes = response.data;
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
    }

  onSubmit() {
    this.submitted = true;
    if (this.examTypeForm.invalid) {
      return;
    }
    
    this.modalService.dismissAll();

    if(this.isCreateMode){
      this.toggleLoading();
      this.examTypeService.createExamType(this.examTypeForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.reset();})
      ).subscribe({
        next: (response) => {
          if(response.success){
            this.getExamtypes();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
    }else{
      SimpleAlerts.confirmDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.examTypeService.updateExamType(this.examTypeForm.value).pipe(
            finalize(() => {this.toggleLoading(); this.reset();})
          ).subscribe({
            next: (response) => {
              if(response.success){
                this.getExamtypes();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          })
        }else{
          return;
        }
      });
    }
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
  }

  reset() {
    this.submitted = false;
    this.isCreateMode = true;
    this.examTypeForm.reset();
  }
  
  getAcademicTermName(academicTermId: string): string {
    const name = this.academicTerms?.find(item => item.id === academicTermId)?.name;
    return name?? '';
  }

  
  getAcademicTerms() {
    this.academicService.getAcademicTerms().subscribe({
        next: (response) => {
          this.academicTerms = response.data;
        },
        error: (error) => { }
      });
  }
}
  