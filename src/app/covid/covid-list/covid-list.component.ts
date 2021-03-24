import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CovidCaseService } from '../covidCase.service';

@Component({
  selector: 'app-covid-list',
  templateUrl: './covid-list.component.html',
  styleUrls: ['./covid-list.component.css']
})
export class CovidListComponent implements OnInit {

  userType;

  constructor(private covidCaseService: CovidCaseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      userType: string
    } = JSON.parse(localStorage.getItem('userData'));
    this.userType = userData.userType;
  }
}
