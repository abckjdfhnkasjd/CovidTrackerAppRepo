import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovidComponent } from './covid.component';
import { AuthGuard } from '../auth/auth.guard';
import { CovidFormEditComponent } from './covid-form-edit/covid-form-edit.component';
import { CovidCaseResolverService } from './covidCase-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CovidComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id/edit',
        component: CovidFormEditComponent,
        resolve: [CovidCaseResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidRoutingModule {}
