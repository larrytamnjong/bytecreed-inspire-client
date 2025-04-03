import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicTermsComponent } from './academic-terms/academic-terms.component';
import { AcademicPeriodsComponent } from './academic-periods/academic-periods.component';
import { AcademicYearsComponent } from './academic-years/academic-years.component';


const routes: Routes = [
{path: 'academic-terms', component: AcademicTermsComponent, pathMatch: 'full'},
{path: 'academic-periods', component: AcademicPeriodsComponent, pathMatch: 'full'},
{path: 'academic-years', component: AcademicYearsComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AcademicsRoutingModule { }
