import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSheetsComponent } from './result-reports/master-sheets/master-sheets.component';
import { TranscriptsComponent } from './result-reports/transcripts/transcripts.component';
import { ReportCardsComponent } from './result-reports/report-cards/report-cards.component';

const routes: Routes = [
  {path: "result-reports", loadChildren: () => import('./result-reports/result-reports.module').then(m => m.ResultReportsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportingRoutingModule { }
