import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeeReportsComponent } from './fee-reports/fee-reports.component';


const routes: Routes = [
   {path: 'fees', component: FeeReportsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FinancialReportsRoutingModule { }