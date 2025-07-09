import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-report-cards',
  templateUrl: './report-cards.component.html',
  styleUrl: './report-cards.component.scss'
})
export class ReportCardsComponent extends BaseComponent {
  breadCrumbItems!: Array<{}>;

  classes: any[] = [];
  classSections: any[] = [];
  academicPeriods: any[] = [];

  getReportCardForm!: UntypedFormGroup;

  constructor(
    private resultReportService: ResultReportService,
    private getReportCardFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Report Cards', active: true }];

    this.getReportCardForm = this.getReportCardFormBuilder.group({
      classIds: [null, [Validators.required]],
      classSectionId: [null ],
      academicPeriodId: [null, [Validators.required]]
    });
  }

  getReportCards(){

  }

}
