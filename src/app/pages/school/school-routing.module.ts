import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ParentsComponent } from './parents/parents.component';
import { ExamComponent } from './exam/exam.component';
import { LibraryComponent } from './library/library.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BoardingComponent } from './boarding/boarding.component';
import { TransportationComponent } from './transportation/transportation.component';


const routes: Routes = [
  {path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),},
  {path: 'academics', loadChildren: () => import('./configuration/academics/academics.module').then(m => m.AcademicsModule),},
  {path: 'analytics', component: AnalyticsComponent, pathMatch: 'full'},
  {path: 'parents', component: ParentsComponent, pathMatch: 'full'},
  {path: 'personnel', loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule),},
  {path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),},
  {path: 'results', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule),},
  {path: 'reporting', loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule),},
  {path: 'attendance', loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule),},
  {path: 'finance', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule),},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),},
  {path: 'exams', component: ExamComponent, pathMatch: 'full'},
  {path: 'library', component: LibraryComponent, pathMatch: 'full'},
  {path: 'inventory', component: InventoryComponent, pathMatch: 'full'},
  {path: 'boarding', component: BoardingComponent, pathMatch: 'full'},
  {path: 'transportation', component: TransportationComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SchoolRoutingModule { }
