import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterResultsComponent } from './register-results/register-results.component';
import { ResultHistoryComponent } from './result-history/result-history.component';

const routes: Routes = [
   {path: 'register-results', component: RegisterResultsComponent, pathMatch: 'full'},
   {path: 'result-history', component: ResultHistoryComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ResultsRoutingModule { }
