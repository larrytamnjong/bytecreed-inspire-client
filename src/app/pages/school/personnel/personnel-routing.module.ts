import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
   {path: 'teachers', component: TeachersComponent, pathMatch: 'full'},
   {path: 'employees', component: EmployeesComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PersonnelRoutingModule { }
