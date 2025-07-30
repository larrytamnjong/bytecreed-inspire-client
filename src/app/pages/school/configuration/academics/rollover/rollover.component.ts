import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AcademicYear } from 'src/app/core/Models/api/academics';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { finalize } from 'rxjs';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';

@Component({
  selector: 'app-rollover',
  templateUrl: './rollover.component.html',
  styleUrl: './rollover.component.scss'
})
export class RolloverComponent extends BaseComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  
  academicYears: AcademicYear[] | undefined | any = [];
  activeAcademicYears: any[] | undefined | any = [];
  inActiveAcademicYears : any[] | undefined | any = [];
  rollOvers: any[] | undefined | any = [];
  rollOVerTargetAcademicYears: any[] | undefined | any = [];
  rollOversToDisplay: any[] | undefined | any = [];

  form!: UntypedFormGroup;
  deleteForm!: UntypedFormGroup;
  submitted: boolean = false;

    headers: any = [
    { key: 'sourceAcademicYear', displayName: 'Source Year' },
    { key: 'targetAcademicYear', displayName: 'Target Year' },
    { key: 'rollOverDate', displayName: 'Rollover Date' },
  ];

  constructor(  
    protected override store: Store<{ data: RootReducerState }>,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private deleteFormBuilder: UntypedFormBuilder,
    private academicService: AcademicService
  ) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Rollover', active: true }];
      
    this.form = this.formBuilder.group({
      sourceAcademicYearId: [null, [Validators.required]],
      targetAcademicYearId: [null, [Validators.required]],
    });

    this.deleteForm = this.deleteFormBuilder.group({
      targetAcademicYearId: [null, [Validators.required]],
    });

    this.getAcademicYears();
    this.getRollOvers();
  }

  dismissModal(){
   this.modalService.dismissAll();
   this.form.reset();
   this.submitted = false;
  }

  openModal(content: any, large: boolean = true){
    if(large){
      this.modalService.open(content, { ...this.lgModalConfig, backdrop: 'static' });
    }else{
      this.modalService.open(content, { ...this.mdModalConfig, backdrop: 'static' });
    }
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if(this.form.value.sourceAcademicYearId == this.form.value.targetAcademicYearId){
      SimpleAlerts.showWarning('Academic year from and to cannot be the same');
      return;
    }

    this.toggleLoading();

    this.academicService.rollover(this.form.value).pipe(finalize(() => this.toggleLoading())).subscribe({
      next: (response) => {
        if(response.success){
          this.getRollOvers();
          SimpleAlerts.showSuccess();
          this.dismissModal();
        }else{
          SimpleAlerts.showError(response.message);
        }
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    });
  }

  getRollOvers(){
    this.academicService.getRollOvers().subscribe({
      next: (response) => {
        this.rollOvers = response.data;
        this.rollOVerTargetAcademicYears = response.data?.map(r => r.targetAcademicYear);

        this.rollOversToDisplay = this.rollOvers.map((rollOver: any) => {
          return {
            id: rollOver.id,
            sourceAcademicYear: rollOver.sourceAcademicYear?.name || "#",
            targetAcademicYear:
              rollOver.targetAcademicYear?.name || "#",
            rollOverDate: rollOver?.rollOverDate,
          };
        });
      },
      error: (error) => {
      }
    });
  }

  deleteRollover() {
    SimpleAlerts.confirmDialog().then((result) => {
          if (result) {
            this.toggleLoading();
            this.academicService.deleteRollover(this.deleteForm.value.targetAcademicYearId).pipe(
              finalize(() => {this.toggleLoading();})).subscribe({
              next: (response) => {
                if(response.success){
                  this.getRollOvers();
                  this.dismissModal();
                  SimpleAlerts.showSuccess();
                }
              },
              error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
            })
          }else{
            this.toggleLoading();
          }
        });
    }
  
  

  getAcademicYears() {
      this.toggleLoading();
      this.academicService.getAcademicYears().pipe(finalize(() => this.toggleLoading()))
        .subscribe({
          next: (response) => {
            this.academicYears = response.data;
            this.activeAcademicYears = this.academicYears.filter((year: any) => year.isActive);
            this.inActiveAcademicYears = this.academicYears.filter((year: any) => !year.isActive);
          },
          error: (error) => {
          }
        });
    }
}
