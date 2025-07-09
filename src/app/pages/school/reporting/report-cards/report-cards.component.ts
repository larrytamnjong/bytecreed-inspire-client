import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import  { finalize } from 'rxjs';
@Component({
  selector: 'app-report-cards',
  templateUrl: './report-cards.component.html',
  styleUrl: './report-cards.component.scss'
})
export class ReportCardsComponent extends BaseComponent {
  breadCrumbItems!: Array<{}>;

  classes: any = [];
  classSections: any = [];
  academicPeriods: any = [];

  getReportCardForm!: UntypedFormGroup;

  isFormValid: boolean = false;
  constructor(
    private resultReportService: ResultReportService,
    private classSectionService: ClassSectionService,
    private classService: ClassService,
    private academicService: AcademicService,
    private getReportCardFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Report Cards', active: true }];

    this.getReportCardForm = this.getReportCardFormBuilder.group({
      classId: [null, [Validators.required]],
      classSectionId: [null ],
      academicPeriodId: [null, [Validators.required]]
    });

    this.getReportCardForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    });

    this.getClasses();
    this.getAcademicPeriods();
    this.getClassSections();
  }

  getReportCards(){
    console.log(this.getReportCardForm.value);
    if(this.getReportCardForm.invalid){
      console.log(this.getReportCardForm.errors);
      return;
    }

    this.toggleLoading();

    this.resultReportService.getReportCards(this.getReportCardForm.value.academicPeriodId, this.getReportCardForm.value.classId, this.getReportCardForm.value.classSectionId).pipe(
      finalize(() => {
        this.toggleLoading()
      })).subscribe({
      next: (response) => {
        if(response.success){
          console.log(response.data);
        }
      },
      error: (error) => {
      }
    })
  }

  getClassSections(){
    this.classSectionService.getClassSections().subscribe({
      next: (response) => {
        if(response.success){
          this.classSections = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  getClasses() {
    this.classService.getClasses().subscribe({
      next: (response) => {
        if(response.success){
          this.classes = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  getAcademicPeriods() {
    this.academicService.getAcademicPeriods().subscribe({
      next: (response) => {
        if(response.success){
          this.academicPeriods = response.data;
        }
      },
      error: (error) => {
      }
    })
  }
}
