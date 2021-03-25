import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CovidChartComponent } from './admin/covid-chart/covid-chart.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/covid-details", pathMatch: "full" },
  {
    path: "covid-details",
    loadChildren: () =>
      import("./covid/covid.module").then(m => m.CovidModule)
  },
  {
    path: "covid-graph", component: CovidChartComponent
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
