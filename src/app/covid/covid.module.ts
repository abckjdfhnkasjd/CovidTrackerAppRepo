import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CovidComponent } from './covid.component';
import { CovidListComponent } from './covid-list/covid-list.component';
import { CovidPatientComponent } from './covid-list/covid-patient/covid-patient.component';
import { CovidFormEditComponent } from './covid-form-edit/covid-form-edit.component';
import { CovidRoutingModule } from './covid-routing.module';
import { SharedModule } from '../shared/shared.module';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    CovidComponent,
    CovidListComponent,
    CovidPatientComponent,
    CovidFormEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CovidRoutingModule,
    SharedModule,
    MatTableModule
  ]
})
export class RecipesModule {}
