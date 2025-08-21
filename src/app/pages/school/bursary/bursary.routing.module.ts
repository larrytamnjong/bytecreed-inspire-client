import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashDeskComponent } from './cash-desk/cash-desk.component';
import { PaymentArchiveComponent } from './payment-archive/payment-archive.component';

const routes: Routes = [
  {path: "cash-desk", component: CashDeskComponent, pathMatch: 'full'},
  {path: "payment-archive", component: PaymentArchiveComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BursaryRoutingModule { }
