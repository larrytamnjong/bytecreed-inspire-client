import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicTermsComponent } from './academic-terms/academic-terms.component';


const routes: Routes = [
{path: 'academic-terms', component: AcademicTermsComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AcademicsRoutingModule { }
