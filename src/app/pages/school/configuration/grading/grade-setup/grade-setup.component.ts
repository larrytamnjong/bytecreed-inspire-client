import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { GradingService } from 'src/app/core/services/api/grading.service';
import { finalize } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GradeSetup, GradingSystem } from 'src/app/core/Models/api/grading';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';


@Component({
  selector: 'app-grade-setup',
  templateUrl: './grade-setup.component.html',
  styleUrl: './grade-setup.component.scss'
})
export class GradeSetupComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  
  submitted: boolean = false;
  gradingSystems: any = [];
  gradeSetups: any = [];
  gradeSetupForm!: UntypedFormGroup;
  isCreateMode: boolean = true;
  get form() {return this.gradeSetupForm.controls;}
  headers = [
    { key: 'grade', displayName: 'Grade' },
    { key: 'remark', displayName: 'Remark' },
    { key: 'minMark', displayName: 'Min Mark' },
    { key: 'maxMark', displayName: 'Max Mark' },
     {key: 'gradingSystemId', displayName: 'Grading System'}
  ];

  constructor(
    protected override store: Store<{ data: RootReducerState }>,
    private gradingService: GradingService, 
    private gradeSetupFormBuilder: UntypedFormBuilder,
    private modalService: NgbModal ) {
    super(store);
  }
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Grading'},{ label: 'Grade Setup', active: true }];

    this.gradeSetupForm = this.gradeSetupFormBuilder.group({
      id: [null],
      grade: [null,[Validators.required]],
      remark: [null],
      minMark: [0, [Validators.required]],
      maxMark: [0, [Validators.required]],
      gradingSystemId: [this.gradingSystems[0]?.id ?? null, [Validators.required]],
      sortOrder: [null],
    });

    this.getGradingSystems();
    this.getGradeSetups();
  }

  addModal(content: any) {
    this.isCreateMode = true;
    this.submitted = false;
    this.gradeSetupForm.patchValue({gradingSystemId: this.gradingSystems[0]?.id ?? null});
    this.modalService.open(content, this.mdModalConfig);
  }

  editModal(content: any, gradeSetup: GradeSetup) {
    this.isCreateMode = false; 
    this.submitted = false;
    this.gradeSetupForm.setValue({...gradeSetup});
    this.modalService.open(content, this.mdModalConfig);
  }

  getGradingSystems() {
    this.gradingService.getGradingSystems().subscribe({
      next: (response) => {
        if(response.success){
        this.gradingSystems = response.data;
        }
      },
      error: (error) => {},
    });
  }

  getGradeSetups() {
    this.toggleLoading();
    this.gradingService.getGradeSetups().pipe(
      finalize(() => {this.loading = false;})).subscribe({
      next: (response) => {
        if(response.success){
        this.gradeSetups = response.data;
        }
      },
      error: (error) => {},
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.gradeSetupForm.invalid) {
      return;
    }
    
    this.modalService.dismissAll();

    if(this.isCreateMode){
      this.toggleLoading();
      this.gradingService.addGradeSetup(this.gradeSetupForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
        next: (response) => {
          if(response.success){
            this.getGradeSetups();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
    }else{
      SimpleAlerts.confirmDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.gradingService.updateGradeSetup(this.gradeSetupForm.value).pipe(
            finalize(() => {this.toggleLoading(); this.reset();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getGradeSetups();
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
    this.gradeSetupForm.reset();
    this.gradeSetupForm.patchValue({minMark: 0, maxMark: 0, gradingSystemId: this.gradingSystems[0]?.id ?? null})
  }

  getGradingSystemName(gradingSystemId: string): string {
    const name = this.gradingSystems?.find((item : GradingSystem) => item.id === gradingSystemId)?.name;
    return name ?? '';
  }

  deleteGradeSetup(gradeSetup: GradeSetup){
      SimpleAlerts.confirmDeleteDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.gradingService.deleteGradeSetup(gradeSetup.id!).pipe(
            finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getGradeSetups();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          });
        }else{
          return;
        }
      });
    }
}
