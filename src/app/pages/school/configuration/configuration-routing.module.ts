import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { AdmissionComponent } from './admission/admission.component';
import { SectionsComponent } from './sections/sections.component';
import { ExamTypesComponent } from './exam-types/exam-types.component';
import { ClassesComponent } from './classes/classes.component';
import { CoursesComponent } from './courses/courses.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SystemComponent } from './system/system.component';


const routes: Routes = [
  {path: "system", component: SystemComponent, pathMatch: 'full'},
  {path: "school", component: SchoolComponent, pathMatch: 'full'},
  {path: "admission", component: AdmissionComponent, pathMatch: 'full'},
  {path: "sections", component: SectionsComponent, pathMatch: 'full'},
  {path: "exam-types", component: ExamTypesComponent, pathMatch: 'full'},
  {path: "courses", component: CoursesComponent, pathMatch: 'full'},
  {path: "subjects", component: SubjectsComponent, pathMatch: 'full'},
  {path: "grading", loadChildren: () => import('./grading/grading.module').then(m => m.GradingModule)},
  {path: "academics", loadChildren: () => import('./academics/academics.module').then(m => m.AcademicsModule)},
  {path: "classes", component: ClassesComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigurationRoutingModule { }