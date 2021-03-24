import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CovidCase } from '../covidCase.model';
import { CovidCaseService } from '../covidCase.service';

@Component({
  selector: 'app-covid-list',
  templateUrl: './covid-list.component.html',
  styleUrls: ['./covid-list.component.css']
})
export class CovidListComponent implements OnInit, OnDestroy {
  covidCaseList: CovidCase[];
  subscription: Subscription;

  constructor(private covidCaseService: CovidCaseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.covidCaseService.covidcaseListChanged
      .subscribe(
        (covidCaseList: CovidCase[]) => {
          this.covidCaseList = covidCaseList;
        }
      );
    this.covidCaseList = this.covidCaseService.getRecipes();
  }

  onNewCovid() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
