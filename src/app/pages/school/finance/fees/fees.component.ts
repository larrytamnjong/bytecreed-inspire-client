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

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss'
})
export class FeesComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  feeTypes: any = [];
  feeTypeForm!: UntypedFormGroup;
  isFeeTypeCreateMode: boolean = true;
  get feeTypeFormF() {return this.feeTypeForm.controls; }

  feeTypeHeaders = [
        { key: 'name', displayName: 'Name' },
        { key: 'amount', displayName: 'Amount' },
  ]
  submitted = false;

  constructor(
     private classFormBuilder: UntypedFormBuilder,
     private modalService: NgbModal,
     private feeTypeService: FeesService,
     protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Finance'},{ label: 'Fees', active: true }];

    this.feeTypeForm = this.classFormBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      amount: [0],
      academicYearId: [null],
      staticId: [null]
    });

    this.getFeeTypes();
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

  reset() {
    this.feeTypeForm.reset();
    this.feeTypeForm.patchValue({amount: 0});
    this.submitted = false;
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
  }
}
