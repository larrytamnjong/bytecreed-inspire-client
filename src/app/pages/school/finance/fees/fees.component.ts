import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeesService } from 'src/app/core/services/api/fees.service';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { ClassService } from 'src/app/core/services/api/class.service';
import { ClassFeeType } from 'src/app/core/Models/api/class';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss'
})
export class FeesComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  feeTypes: any = [];
  classFeeTypes: any = [];
  classes: any = [];
  classFeeType_classId: any | null = null;

  feeTypeForm!: UntypedFormGroup;
  classFeeTypeForm!: UntypedFormGroup;
  classFeeTypeDeleteForm!: UntypedFormGroup;

  isFeeTypeCreateMode: boolean = true;
  get feeTypeFormF() {return this.feeTypeForm.controls; }
  get classFeeTypeFormF() {return this.classFeeTypeForm.controls; }
  get classFeeTypeDeleteF() {return this.classFeeTypeDeleteForm.controls; }

  feeTypeHeaders = [
        { key: 'name', displayName: 'Name' },
        { key: 'amount', displayName: 'Amount' },
  ]

  classFeeTypeHeaders = [
    { key: 'className', displayName: 'Name' },
    { key: 'amount', displayName: 'Amount' },
    { key: 'className', displayName: 'Class' },
    { key: 'isRequired', displayName: 'Is Required' },
    { key: 'overrideDefaultAmount', displayName: 'Override Default Amount' },
  ];

  submitted = false;

  constructor(
     private feeTypeFormBuilder: UntypedFormBuilder,
     private classFeeTypeFormBuilder: UntypedFormBuilder,
     private classFeeTypeDeleteFormBuilder: UntypedFormBuilder,
     private classService: ClassService,
     private modalService: NgbModal,
     private feeTypeService: FeesService,
     protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Finance'},{ label: 'Fees', active: true }];

    this.feeTypeForm = this.feeTypeFormBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      amount: [0],
      academicYearId: [null],
      staticId: [null]
    });


    this.classFeeTypeForm = this.classFeeTypeFormBuilder.group({
      id: [null],
      overrideDefaultAmount: [false, [Validators.required]],
      isRequired: [false, [Validators.required]],
      amount: [null, [Validators.required]],
      feeTypeIds: [null, [Validators.required]],
      classIds: [null, [Validators.required]],
      academicYearId: [null],
      staticId: [null]
    });

      this.classFeeTypeForm.get('overrideDefaultAmount')?.valueChanges.subscribe((overrideDefaultAmount: boolean) => {
      const amountControl = this.classFeeTypeForm.get('amount');
  
      if (overrideDefaultAmount === true) {
        amountControl?.setValidators([Validators.required]);
        amountControl?.enable();
      } else {
        amountControl?.clearValidators();
        amountControl?.setValue(null); 
        amountControl?.disable();
      }
      amountControl?.updateValueAndValidity();
    });

    this.classFeeTypeDeleteForm = this.classFeeTypeDeleteFormBuilder.group({
      feeTypeIds: [null,[Validators.required]],
      classIds: [null, [Validators.required]],
    });

    this.getFeeTypes();
    this.getClasses();
    this.getLookUps();
  }

    addFeeTypeModal(content: any) {
      this.isFeeTypeCreateMode = true;
      this.feeTypeForm.patchValue({amount: 0});
      this.modalService.open(content, this.lgModalConfig);
    }

    editFeeTypeModal(content: any, feeType: any) {
      this.isFeeTypeCreateMode = false;
      this.feeTypeForm.patchValue({id: feeType.id,name: feeType.name,amount: feeType.amount});
      this.submitted = false;
      this.modalService.open(content, this.lgModalConfig);
    }

    onSubmitFeeType() {
      this.submitted = true;
      if (this.feeTypeForm.invalid) {
        return;
      }
  
      if(this.isFeeTypeCreateMode){
        this.toggleLoading();
        this.feeTypeService.addFeeType(this.feeTypeForm.value).pipe(
          finalize(() => {this.toggleLoading();})).subscribe({
          next: (response) => {
            if(response.success){
              this.getFeeTypes();
              SimpleAlerts.showSuccess();
              this.dismissModal();
            }
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }else{
        SimpleAlerts.confirmDialog().then((result) => {
          if (result) {
            this.toggleLoading();
            this.feeTypeService.updateFeeType(this.feeTypeForm.value).pipe(
              finalize(() => {this.toggleLoading();})).subscribe({
              next: (response) => {
                if(response.success){
                  this.getFeeTypes();
                  SimpleAlerts.showSuccess();
                  this.dismissModal();
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

    deleteFeeType(feeType: any){
      SimpleAlerts.confirmDeleteDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.feeTypeService.deleteFeeType(feeType.id!).pipe(
            finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getFeeTypes();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          });
        }
      });
    }

    getFeeTypes() {
      this.toggleLoading();
      this.feeTypeService.getFeeTypes().pipe(
        finalize(() => this.toggleLoading())).subscribe({
          next: (response) => {
            this.feeTypes = response.data;
          },
          error: (error) => {
            SimpleAlerts.showError(getErrorMessage(error));
          }
      });
    }

  addClassFeeTypeModal(content: any) {
    this.classFeeTypeForm.get('amount')?.disable();
    this.submitted = false;
    this.modalService.open(content, {...this.lgModalConfig, backdrop: 'static'});
  }

  deleteClassFeeTypeModal(content: any) {
    this.modalService.open(content, this.lgModalConfig);
  }

  onSubmitClassFeeType(){
    this.submitted = true;
    if (this.classFeeTypeForm.invalid) {
      return;
    }
    this.toggleLoading();
      this.classService.addClassFeeType(this.classFeeTypeForm.value).pipe(
        finalize(() => {this.toggleLoading();})).subscribe({
        next: (response) => {
          if(response.success){
            SimpleAlerts.showSuccess();
            this.getClassFeeTypes();
            this.reset();
            this.dismissModal();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
  }

  editClassFeeTypeModal(content: any, classFeeType: ClassFeeType) {
    this.submitted = false;
    var data = {
      id: null,
      feeTypeIds: [classFeeType.feeTypeId],
      amount: classFeeType.amount,
      overrideDefaultAmount: classFeeType.overrideDefaultAmount,
      isRequired: classFeeType.isRequired,
      classIds: [classFeeType.classId],
      academicYearId: null,
      staticId:null
    };
    this.classFeeTypeForm.setValue(data);
    this.modalService.open(content, this.lgModalConfig);
  }
    
  deleteClassFeeType(classFeeType: ClassFeeType){
    SimpleAlerts.confirmDeleteDialog().then((result) => {
          if (result) {
            this.toggleLoading();
            this.classService.deleteClassFeeType({ feeTypeIds:[ classFeeType.feeTypeId], classIds: [classFeeType.classId]}).pipe(
              finalize(() => {this.toggleLoading();})).subscribe({
              next: (response) => {
                if(response.success){
                  this.getClassFeeTypes();
                  SimpleAlerts.showSuccess();
                }
              },
              error: (error) => {
                SimpleAlerts.showError(getErrorMessage(error));
              },
            });
          }
      });
   }

    onSubmitDeleteClassFeeTypes(){
    this.toggleLoading();
    this.submitted = true;
    if (this.classFeeTypeDeleteForm.invalid) {
      this.toggleLoading();
      return; 
    }

    this.modalService.dismissAll();

    this.classService.deleteClassFeeType(this.classFeeTypeDeleteForm.value).pipe(
      finalize(() => {this.toggleLoading();})).subscribe({
      next: (response) => {
        if(response.success){
          this.getClassFeeTypes();
          SimpleAlerts.showSuccess();
          this.reset();
          this.dismissModal();
        }
      },
      error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
    });
  }

  getClassFeeTypes(){
    this.classFeeTypes = [];
    if(this.classFeeType_classId == null){
      return;
    }
    this.toggleLoading();
    this.classService.getClassFeeTypes(this.classFeeType_classId).pipe(
      finalize(() => {this.toggleLoading();})).subscribe({
      next: (response) => {
        if(response.success){
          this.classFeeTypes = response.data;
        }
      },
      error: () => {},
    });
  }

  getClasses() {
    this.classService.getClasses().pipe().subscribe({
      next: (response) => {
        if(response.success){ this.classes = response.data;}
      },
      error: () => {},
    });
  }

  reset() {
    this.submitted = false;
    this.feeTypeForm.reset();
    this.feeTypeForm.patchValue({amount: 0});
    this.classFeeTypeForm.reset();
    this.classFeeTypeForm.patchValue({overrideDefaultAmount: false,isRequired: false, amount: null, feeTypeIds: null, classIds: null,});
    this.classFeeTypeDeleteForm.reset();
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
  }
}
