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
import { LookUpView } from 'src/app/core/Models/common/look-up-view';
import { LookUpData } from 'src/app/core/Models/common/look-up-data';
import { getLookUpsAction } from 'src/app/store/common/look-up/look-up.action';
import { selectLookUpsView } from 'src/app/store/common/look-up/look-up.selector';
import { LookUpTableEnum } from 'src/app/core/enums/look-up-table';
import { ExamTypeService } from 'src/app/core/services/api/exam-type.service';
import { ExamType } from 'src/app/core/Models/api/exam-types';

@Component({
  selector: 'app-exam-types',
  templateUrl: './exam-types.component.html',
  styleUrl: './exam-types.component.scss'
})
export class ExamTypesComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false;
  submitted: boolean = false;

  lookUps?: LookUpView;
  yesOrNoResponse: LookUpData[] = [];
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
  ]

  constructor(
    private modalService: NgbModal,
    private examTypeFormBuilder: UntypedFormBuilder,
    private examTypeService: ExamTypeService,
    private academicService: AcademicService,
    private store: Store<{ data: RootReducerState }>
  ){}

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
      this.toggleLoading();
      this.submitted = true;
      if (this.examTypeForm.invalid) {
        this.toggleLoading();
        return;
      }
      
      this.modalService.dismissAll();
  
      if(this.isCreateMode){
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
  
    toggleLoading() {
      this.loading = !this.loading;
    }
  
    getUseWeightLabel(res: boolean): string {
      const response = res ? 1 : 0;
      const responseItem = this.yesOrNoResponse.find(item => item.dataCode === response);
      return responseItem?.text ?? '';
    }
    getAcademicTermName(academicTermId: string): string {
      const name = this.academicTerms?.find(item => item.id === academicTermId)?.name;
      return name?? '';
    }

    getLookUps() {
      this.store.dispatch(getLookUpsAction());
      this.store.select(selectLookUpsView).subscribe((lookUps) => {
        if(lookUps){
         this.lookUps = lookUps;
         this.yesOrNoResponse = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.YesOrNoResponse) || [];
        }
      });
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
  