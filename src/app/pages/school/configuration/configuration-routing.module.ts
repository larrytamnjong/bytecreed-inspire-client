import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { AdmissionComponent } from './admission/admission.component';
import { SectionsComponent } from './sections/sections.component';
import { ExamTypesComponent } from './exam-types/exam-types.component';


const routes: Routes = [
  {path: "school", component: SchoolComponent, pathMatch: 'full'},
  {path: "admission", component: AdmissionComponent, pathMatch: 'full'},
  {path: "sections", component: SectionsComponent, pathMatch: 'full'},
  {path: "exam-types", component: ExamTypesComponent, pathMatch: 'full'},
  {path: "grading", loadChildren: () => import('./grading/grading.module').then(m => m.GradingModule)},
  {path: "academics", loadChildren: () => import('./academics/academics.module').then(m => m.AcademicsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigurationRoutingModule { }
 