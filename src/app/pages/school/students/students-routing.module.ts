import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentEnrollmentsComponent } from './student-enrollments/student-enrollments.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';


const routes: Routes = [
      {path: "student-enrollments", component: StudentEnrollmentsComponent, pathMatch: 'full'},
      {path: "student-registration", component: StudentRegistrationComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentsRoutingModule { }
