import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GradeSetupComponent } from './grade-setup/grade-setup.component';
import { GradingSystemsComponent } from './grading-systems/grading-systems.component';

const routes: Routes = [
{path: 'grade-setup', component: GradeSetupComponent, pathMatch: 'full'},
{path: 'grading-systems', component: GradingSystemsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GradingRoutingModule { }
