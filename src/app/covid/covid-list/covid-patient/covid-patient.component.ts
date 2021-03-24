import { Component, OnInit, Input } from '@angular/core';

import { CovidCase } from '../../covidCase.model';
import { CovidCaseService } from '../../covidCase.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-covid-patient',
  templateUrl: './covid-patient.component.html',
  styleUrls: ['./covid-patient.component.css']
})
export class CovidPatientComponent implements OnInit {
  @Input() covidCase: CovidCase;
  @Input() index: number;
  //@Input() dataSource: CovidCase[] = [];
  covidCaseList: CovidCase[];
  subscription: Subscription;
  dataSource: CovidCase[] =[];

  constructor(private covidCaseService: CovidCaseService,
      private dataStorageService: DataStorageService) {}

  ngOnInit() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      userType: string
    } = JSON.parse(localStorage.getItem('userData'));
    this.subscription = this.covidCaseService.covidcaseListChanged
      .subscribe(
        (covidCaseList: CovidCase[]) => {
          this.covidCaseList = covidCaseList.filter(covidCase => {
            return (userData.email==="admin@gmail.com" || covidCase.createdBy === userData.email);
          });
          this.dataSource = this.covidCaseList;
        }
      )
      this.dataStorageService.fetchCovidCases()
      .subscribe((covidCaseList) => {
        this.covidCaseList = covidCaseList.filter(covidCase => {
          return (userData.email==="admin@gmail.com" || covidCase.createdBy === userData.email);
        });
        this.dataSource = this.covidCaseList;
      })
  }

 displayedColumns: string[] = ['Patient Name', 'Phone Number', "Gender", "State"];

 selectRecord = (index) => {
    console.log(index);
    this.covidCaseService.onSelectCovidcase(index);
 }
}
