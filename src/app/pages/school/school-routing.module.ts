import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportCardsComponent } from "./reporting/report-cards.component";

const routes: Routes = [
  {
    path: "configuration",
    loadChildren: () =>
      import("./configuration/configuration.module").then(
        (m) => m.ConfigurationModule
      ),
  },
  {
    path: "reporting/report-cards",
    component: ReportCardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRoutingModule {}
