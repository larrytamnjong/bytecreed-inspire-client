import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionComponent } from './institution/institution.component';


const routes: Routes = [
  { path: '', redirectTo: 'institution', pathMatch: 'full' },
  { path: 'institution', component: InstitutionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GeneralRoutingModule { }
