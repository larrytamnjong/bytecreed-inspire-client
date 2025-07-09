import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { jsPDF } from "jspdf";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-master-sheets',
  templateUrl: './master-sheets.component.html',
  styleUrl: './master-sheets.component.scss'
})
export class MasterSheetsComponent extends BaseComponent {
  breadCrumbItems!: Array<{}>;

  classes: any[] = [];
  classSections: any[] = [];
  academicPeriods: any[] = [];

  getMasterSheetForm!: UntypedFormGroup;

  constructor(
    private resultReportService: ResultReportService,
    protected override store: Store<{ data: RootReducerState }>,
    private getMasterSheetFormBuilder: UntypedFormBuilder
  ) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Master Sheets', active: true }];

    this.getMasterSheetForm = this.getMasterSheetFormBuilder.group({
      classIds: [null, [Validators.required]],
      classSectionIds: [null, ],
      academicPeriodId: [null, [Validators.required]]
    });
  } 


  getMasterSheets(){

  }

}
