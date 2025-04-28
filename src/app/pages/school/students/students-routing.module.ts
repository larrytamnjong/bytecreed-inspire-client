import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentEnrollmentsComponent } from './student-enrollments/student-enrollments.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { StudentInfoComponent } from './student-info/student-info.component';


const routes: Routes = [
      {path: "student-enrollments", component: StudentEnrollmentsComponent, pathMatch: 'full'},
      {path: "student-registration", component: StudentRegistrationComponent, pathMatch: 'full'},
      {path: "student-info", component: StudentInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentsRoutingModule { }
