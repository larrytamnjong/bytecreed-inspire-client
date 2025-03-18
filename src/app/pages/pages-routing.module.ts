import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
    {
      path: 'school', loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule)
    },
    {
      path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'parent', loadChildren: () => import('./parents/parents.module').then(m => m.ParentsModule)
    },
    {
      path: 'student', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
