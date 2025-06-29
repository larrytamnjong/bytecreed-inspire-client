import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';


const routes: Routes = [
  {path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),},
  {path: 'academics', loadChildren: () => import('./configuration/academics/academics.module').then(m => m.AcademicsModule),},
  {path: 'analytics', component: AnalyticsComponent, pathMatch: 'full'},
  {path: 'personnel', loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule),},
  {path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),},
  {path: 'results', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule),},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SchoolRoutingModule { }
