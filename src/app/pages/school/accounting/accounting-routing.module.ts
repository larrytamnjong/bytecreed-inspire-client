import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalsComponent } from './journals/journals.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';

const routes: Routes = [
   {path: 'journals', component: JournalsComponent, pathMatch: 'full'},
   {path: 'chart-of-accounts', component: ChartOfAccountsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountingRoutingModule { }
