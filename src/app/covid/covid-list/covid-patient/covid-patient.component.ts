import { Component, OnInit, Input } from '@angular/core';

import { CovidCase } from '../../covidCase.model';
import { CovidCaseService } from '../../covidCase.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

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
    this.subscription = this.covidCaseService.covidcaseListChanged
      .subscribe(
        (covidCaseList: CovidCase[]) => {
          const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
            userType: string
          } = JSON.parse(localStorage.getItem('userData'));
          this.covidCaseList = covidCaseList.filter(covidCase => {
            return covidCase.createdBy === userData.email;
          });
          this.dataSource = this.covidCaseList;
        }
      );
      this.dataStorageService.fetchRecipes().subscribe((covidCaseList) => {
        this.dataSource = covidCaseList;
      })
  }

 displayedColumns: string[] = ['Patient Name', 'Phone Number', "Gender", "State"];
}
