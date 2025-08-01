import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ResultService } from 'src/app/core/services/api/result.service';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { finalize } from 'rxjs';
import { RegisterResultsComponent } from '../register-results/register-results.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-result-history',
  templateUrl: './result-history.component.html',
  styleUrl: './result-history.component.scss'
})
export class ResultHistoryComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

   academicPeriods: any = [];
   academicYears: any = [];

   filterForm!: UntypedFormGroup;

   canPerformPeriodRankings: boolean = false;
   canPerformYearlyRankings: boolean = false;
   canEditResults: boolean = false;

  constructor( 
    private filterFormBuilder: UntypedFormBuilder,
    private resultService: ResultService,
    private modalService: NgbModal,
    private academicService: AcademicService,
    protected override store: Store<{ data: RootReducerState }>) {
        super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Results' }, { label: 'Archive ', active: true }];

     this.filterForm = this.filterFormBuilder.group({
          academicYearId: [null],
          academicPeriodId: [null]
        });

    this.filterForm.valueChanges.subscribe(() => {
      this.canPerformPeriodRankings = this.filterForm.get("academicYearId")?.value != null && this.filterForm.get("academicPeriodId")?.value != null;
      this.canPerformYearlyRankings = this.filterForm.get("academicYearId")?.value != null
      this.canEditResults = this.filterForm.get("academicYearId")?.value != null && this.filterForm.get("academicPeriodId")?.value != null;
    });


    this.filterForm.get("academicYearId")?.valueChanges.subscribe((value) => {
      if (value) {
        this.clearChildFormProperties();
        this.getAcademicPeriods(value);
      } 
    });

     this.getAcademicYears();
  }

  calculateYearlyRankings(){
      this.toggleLoading();
      this.resultService.calculateYearlyRankings(this.filterForm.get("academicYearId")?.value).pipe(finalize(() => {this.toggleLoading()})).subscribe({
        next: (response) => {
          if(response.success)
            {
              SimpleAlerts.showSuccess();
            }
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        },
      });
    }

  calculatePeriodRankings(){
      this.toggleLoading();
      this.resultService.calculatePeriodRankings(this.filterForm.get("academicPeriodId")?.value).pipe(finalize(() => {this.toggleLoading()})).subscribe({
        next: (response) => {
          if(response.success)
            {
              SimpleAlerts.showSuccess();
            }
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        },
      });
    }

    getAcademicPeriods(academicYearId?: any) {
    this.academicService.getAcademicPeriods(academicYearId).subscribe({
      next: (response) => {
        if(response.success){
          this.academicPeriods = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  getAcademicYears(){
    this.academicService.getAcademicYears().subscribe({
      next: (response) => {
        if(response.success){
          this.academicYears = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  openModal() {
    const modalRef = this.modalService.open(RegisterResultsComponent, {...this.xlModalConfig, backdrop: 'static'});
     modalRef.componentInstance.data = {
     external: true
   };
  }
  

  clearChildFormProperties() {
    this.filterForm.patchValue({academicPeriodId: null});
  }

 }
