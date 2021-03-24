import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CovidCase } from './covidCase.model';

@Injectable()
export class CovidCaseService {
  covidcaseListChanged = new Subject<CovidCase[]>();

  private covidCaseList: CovidCase[] = [];

  constructor() {}

  setRecipes(covidCaseList: CovidCase[]) {
    this.covidCaseList = covidCaseList;
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }

  getRecipes() {
    return this.covidCaseList.slice();
  }

  getRecipe(index: number) {
    return this.covidCaseList[index];
  }

  addRecipe(covidCaseList: CovidCase) {
    this.covidCaseList.push(covidCaseList);
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }

  updateRecipe(index: number, newCovidCase: CovidCase) {
    this.covidCaseList[index] = newCovidCase;
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }

  deleteRecipe(index: number) {
    this.covidCaseList.splice(index, 1);
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }
}
