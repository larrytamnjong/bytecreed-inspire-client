import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashDeskComponent } from './cash-desk/cash-desk.component';

const routes: Routes = [
  {path: "cash-desk", component: CashDeskComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BursaryRoutingModule { }
