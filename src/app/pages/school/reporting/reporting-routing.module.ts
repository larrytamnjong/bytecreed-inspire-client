import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "result-reports", loadChildren: () => import('./result-reports/result-reports.module').then(m => m.ResultReportsModule)},
  {path: "financial-reports", loadChildren: () => import('./financial-reports/financial-reports.module').then(m => m.FinancialReportsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportingRoutingModule { }
