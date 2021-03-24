import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { CovidChartComponent } from '../admin/covid-chart/covid-chart.component';
import { ChartModule } from 'primeng/chart';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AuthComponent,CovidChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    SharedModule,
    ChartModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class AuthModule {}
