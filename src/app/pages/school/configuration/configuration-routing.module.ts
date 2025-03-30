import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { AdmissionComponent } from './admission/admission.component';


const routes: Routes = [
  {path: "school", component: SchoolComponent, pathMatch: 'full'},
  {path: "admission", component: AdmissionComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigurationRoutingModule { }
