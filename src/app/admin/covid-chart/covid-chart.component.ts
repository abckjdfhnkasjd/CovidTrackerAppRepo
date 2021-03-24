import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CovidCase } from 'src/app/covid/covidCase.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.scss'],
})
export class CovidChartComponent implements OnInit {
  public userAppData: any;
  public appUserCount1: any;
  public userLabel: any;
  public options: any;
  public userUsageHoursData;
  covidCaseList: CovidCase[];
  subscription: Subscription;


  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.dataStorageService.fetchRecipes().subscribe(covidList => {
        this.covidCaseList = covidList;
        this.appUserCount1 = this.covidCaseList.length;

        this.userAppData = {
        labels: this.userLabel,
        datasets: [
            {
            data: [
                this.appUserCount1
            ],
            backgroundColor: [
                '#ff0000',
                '#0000FF',
                '#FFFF00',
                '#FFC0CB',
                '#7f00ff ',
            ],
            },
        ],
        };

        this.userUsageHoursData = {
        labels: ['User'],
        datasets: [
            {
            label: 'Users',
            backgroundColor: '#ff0000',
            data: [this.appUserCount1],
            }
        ],
        };

        this.options = {
        //display labels on data elements in graph
        plugins: {
            datalabels: {
            align: 'end',
            anchor: 'end',
            borderRadius: 4,
            backgroundColor: 'teal',
            color: 'white',
            font: {
                weight: 'bold',
            },
            },
            // display chart title
            title: {
            display: true,
            fontSize: 16,
            },
            legend: {
            position: 'bottom',
            },
        },
        scales: {
            yAxes: [{
            ticks: {
                min: 0,
                max:this.appUserCount1 + 5,
                stepSize: 1,
                beginAtZero: true,
            }
            }]
        }
        };
    });

  }
}
