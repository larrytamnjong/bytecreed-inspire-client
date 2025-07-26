import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';


const routes: Routes = [
   {path: 'roles', component: RolesComponent, pathMatch: 'full'},
   {path: 'manage-users', component: UsersComponent, pathMatch: 'full'},
   {path: 'logs', component: AuditLogsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
