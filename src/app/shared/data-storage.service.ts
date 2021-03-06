import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { CovidCase } from '../covid/covidCase.model';
import { CovidCaseService } from '../covid/covidCase.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private covidCaseService: CovidCaseService,
    private authService: AuthService
  ) {}

  storeCovidCases() {
    const covidCaseList = this.covidCaseService.getCovidCases();
    this.http
      .put(
        'https://ng-complete-guide-6523c.firebaseio.com/covidCaseList.json',
        covidCaseList
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchCovidCases() {
    return this.http
      .get<CovidCase[]>(
        'https://ng-complete-guide-6523c.firebaseio.com/covidCaseList.json'
      )
      .pipe(
        map(covidCaseList => {
          return covidCaseList.map(recipe => {
            return {
              ...recipe,
            };
          });
        }),
        tap(covidCaseList => {
          this.covidCaseService.setCovidCases(covidCaseList);
        })
      );
  }
}
