import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),},
  {path: 'academics', loadChildren: () => import('./configuration/academics/academics.module').then(m => m.AcademicsModule),}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SchoolRoutingModule { }
