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
      path: 'school', loadChildren: () => import('./school/school.module').then(m => m.SchoolModule)
    },
    {
      path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'parent', loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule)
    },
    {
      path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
