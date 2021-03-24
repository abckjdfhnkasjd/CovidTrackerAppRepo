import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { CovidCase } from './covidCase.model';
import { DataStorageService } from '../shared/data-storage.service';
import { CovidCaseService } from './covidCase.service';

@Injectable({ providedIn: 'root' })
export class CovidCaseResolverService implements Resolve<CovidCase[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private covidCaseService: CovidCaseService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.covidCaseService.getCovidCases();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchCovidCases();
    } else {
      return recipes;
    }
  }
}
