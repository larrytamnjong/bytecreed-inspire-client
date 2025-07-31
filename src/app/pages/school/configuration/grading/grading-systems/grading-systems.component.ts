import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { GradingService } from 'src/app/core/services/api/grading.service';
import { finalize } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GradingSystem } from 'src/app/core/Models/api/grading';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';


@Component({
  selector: 'app-grading-systems',
  templateUrl: './grading-systems.component.html',
  styleUrl: './grading-systems.component.scss'
})
export class GradingSystemsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  submitted: boolean = false;
  gradingSystems: any = [];
  gradingSystemForm!: UntypedFormGroup;
  isCreateMode: boolean = true;
  get form() {return this.gradingSystemForm.controls;}
  headers = [
    { key: 'name', displayName: 'Name' },
    { key: 'scale', displayName: 'Scale' },
    { key: 'isActive', displayName: 'Status' },
    { key: 'gradingScale', displayName: 'Grading Scale' },
  ];

  constructor(
    protected override store: Store<{ data: RootReducerState }>,
    private gradingSystemService: GradingService,
    private gradingSystemFormBuilder: UntypedFormBuilder,
    private modalService: NgbModal ) {
    super(store);
  }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Grading'},{ label: 'Grading Systems', active: true }];

    this.gradingSystemForm = this.gradingSystemFormBuilder.group({
      id: [null],
      name: [null,[Validators.required]],
      scale: [0, [Validators.required]],
      gradingScale: [0, [Validators.required]],
      isActive: [true, [Validators.required]],
      academicYearId: [null],
      staticId: [null]
    });
    this.getLookUps();
    this.getGradingSystems();
  }

    addModal(content: any) {
      this.isCreateMode = true;
      this.submitted = false;
      this.modalService.open(content, this.lgModalConfig);
    }
  
    editModal(content: any, gradingSystem: GradingSystem) {
      this.isCreateMode = false; 
      this.submitted = false;
      this.gradingSystemForm.setValue({...gradingSystem});
      this.modalService.open(content, this.lgModalConfig);
    }
  
    getGradingSystems() {
      this.toggleLoading();
      this.gradingSystemService.getGradingSystems().pipe(
        finalize(() => {this.loading = false;})).subscribe({
        next: (response) => {
          if(response.success){
          this.gradingSystems = response.data;
          }
        },
        error: (error) => {},
      });
    }
  
    onSubmit() {
      this.submitted = true;
      if (this.gradingSystemForm.invalid) {
        return;
      }
      
      this.modalService.dismissAll();
  
      if(this.isCreateMode){
        this.toggleLoading();
        this.gradingSystemService.addGradingSystem(this.gradingSystemForm.value).pipe(
          finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
          next: (response) => {
            if(response.success){
              this.getGradingSystems();
              SimpleAlerts.showSuccess();
            }
          },
          error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
        });
      }else{
        SimpleAlerts.confirmDialog().then((result) => {
          if (result) {
            this.toggleLoading();
            this.gradingSystemService.updateGradingSystem(this.gradingSystemForm.value).pipe(
              finalize(() => {this.toggleLoading(); this.reset();})
            ).subscribe({
              next: (response) => {
                if(response.success){
                  this.getGradingSystems();
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

  deleteGradingSystem(gradingSystem: GradingSystem){
    SimpleAlerts.confirmDeleteDialog().then((result) => {
      if (result) {
        this.toggleLoading();
        this.gradingSystemService.deleteGradingSystem(gradingSystem.id!).pipe(finalize(() => {this.toggleLoading();})).subscribe({
          next: (response) => {
            if(response.success){
              this.getGradingSystems();
              SimpleAlerts.showSuccess();
            }
          },
          error : (error) => {
              SimpleAlerts.showError(getErrorMessage(error));
            }
        });
      }
    });
  }
    
  
    dismissModal() {
      this.modalService.dismissAll();
      this.reset();
    }
  
    reset() {
      this.submitted = false;
      this.isCreateMode = true;
      this.gradingSystemForm.reset();
      this.gradingSystemForm.patchValue({isActive: true, scale: 0, gradingScale: 0})
    }
}
