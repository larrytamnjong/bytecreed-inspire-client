import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { TeacherAttendanceComponent } from './teacher-attendance/teacher-attendance.component';

const routes: Routes = [
   {path: 'student-attendance', component: StudentAttendanceComponent, pathMatch: 'full'},
   {path: 'teacher-attendance', component: TeacherAttendanceComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AttendanceRoutingModule { }
