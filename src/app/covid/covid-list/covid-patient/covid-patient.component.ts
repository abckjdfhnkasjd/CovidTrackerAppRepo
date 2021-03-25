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
  dataSourceCopy:CovidCase[];
  isLoading = false;

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
    this.isLoading = true;
    this.subscription = this.covidCaseService.covidcaseListChanged
      .subscribe(
        (covidCaseList: CovidCase[]) => {
          this.covidCaseList = covidCaseList.map((covidCase,index) => {
            return {...covidCase, id: index};
          })
          .filter(covidCase => {
            return (userData.email==="admin@gmail.com" || covidCase.createdBy === userData.email);
          });
          this.dataSource = this.covidCaseList;
          this.isLoading = false;
        }
      )
      this.dataStorageService.fetchCovidCases()
      .subscribe((covidCaseList) => {
        this.covidCaseList = covidCaseList.map((covidCase,index) => {
          return {...covidCase, id: index};
        }).filter(covidCase => {
          return (userData.email==="admin@gmail.com" || covidCase.createdBy === userData.email);
        });
        this.dataSource = this.dataSourceCopy = this.covidCaseList;
        this.isLoading = false;
      })
  }

 displayedColumns: string[] = ['Patient Name', 'Phone Number', "Gender", "State", "Symptoms"];

 selectRecord = (index) => {
    console.log(index);
    this.covidCaseService.onSelectCovidcase(index);
 }

 applyFilter(filteredString) {
  console.log(filteredString);
  this.dataSource = filteredString != "" ? this.dataSourceCopy.filter(covidCase => {
    let kept =   this.contains(covidCase.patientName, filteredString) 
                || this.contains(covidCase.phoneNumber, filteredString)
                || this.contains(covidCase.gender, filteredString)
                || this.contains(covidCase.state, filteredString)
                || this.contains(covidCase.symptoms, filteredString)
    return kept;
  }) : this.dataSourceCopy;
 }

 contains(str, filteredStr) {
  return (str && str.toLowerCase().includes(filteredStr.toLowerCase()));
 }
}
