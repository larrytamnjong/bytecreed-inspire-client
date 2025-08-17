import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { FeesComponent } from './fees/fees.component';

const routes: Routes = [
   {path: 'subscriptions', component: SubscriptionsComponent, pathMatch: 'full'},
   {path: 'fees', component: FeesComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FinanceRoutingModule { }
