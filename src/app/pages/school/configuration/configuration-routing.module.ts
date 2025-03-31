import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { AdmissionComponent } from './admission/admission.component';
import { SectionsComponent } from './sections/sections.component';


const routes: Routes = [
  {path: "school", component: SchoolComponent, pathMatch: 'full'},
  {path: "admission", component: AdmissionComponent, pathMatch: 'full'},
  {path: "sections", component: SectionsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigurationRoutingModule { }
