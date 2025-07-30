import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSheetsComponent } from './master-sheets/master-sheets.component';
import { TranscriptsComponent } from './transcripts/transcripts.component';
import { ReportCardsComponent } from './report-cards/report-cards.component';

const routes: Routes = [
   {path: 'master-sheets', component: MasterSheetsComponent, pathMatch: 'full'},
   {path: 'transcripts', component: TranscriptsComponent, pathMatch: 'full'},
   {path: 'report-cards', component: ReportCardsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ResultReportsRoutingModule { }
