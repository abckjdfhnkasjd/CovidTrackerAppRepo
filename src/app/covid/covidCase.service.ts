import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CovidCase } from './covidCase.model';

@Injectable()
export class CovidCaseService {
  covidcaseListChanged = new Subject<CovidCase[]>();
  covidCaseEditStarted = new Subject<number>();

  private covidCaseList: CovidCase[] = [];

  constructor() {}

  setCovidCases(covidCaseList: CovidCase[]) {
    this.covidCaseList = covidCaseList;
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }

  getCovidCases() {
    return this.covidCaseList.slice();
  }

  getCovidCase(index: number) {
    return this.covidCaseList[index];
  }

  addCovidCase(covidCaseList: CovidCase) {
    this.covidCaseList.push(covidCaseList);
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }

  updateCovidCase(index: number, newCovidCase: CovidCase) {
    this.covidCaseList[index] = newCovidCase;
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }

  deleteCovidCase(index: number) {
    this.covidCaseList.splice(index, 1);
    this.covidcaseListChanged.next(this.covidCaseList.slice());
  }

  onSelectCovidcase(index: number) {
    this.covidCaseEditStarted.next(index);
  }
}
