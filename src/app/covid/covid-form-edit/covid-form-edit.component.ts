import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { CovidCaseService } from '../covidCase.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CovidCase } from '../covidCase.model';

@Component({
  selector: 'app-covid-form-edit',
  templateUrl: './covid-form-edit.component.html',
  styleUrls: ['./covid-form-edit.component.css']
})
export class CovidFormEditComponent implements OnInit {
  id: number;
  editMode = false;
  editedCovidCaseIndex = -1;
  editedCovidcase: CovidCase = null;
  covidForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private covidCaseService: CovidCaseService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.covidCaseService.covidCaseEditStarted.subscribe(index => {
      this.editedCovidCaseIndex = index;
      this.editedCovidcase = this.covidCaseService.getCovidCase(index);
      this.editMode = true;
      this.covidForm.setValue({
        patientName: this.editedCovidcase.patientName,
        phoneNumber: this.editedCovidcase.phoneNumber,
        //gender: covidCase.gender,
      })
    })
  }

  onSubmit() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      userType: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (this.editMode) {
      this.covidCaseService.updateCovidCase(this.editedCovidCaseIndex, {...this.covidForm.value, createdBy: userData.email});
    } else {
      this.covidCaseService.addCovidCase({...this.covidForm.value, createdBy: userData.email});
    }
    this.dataStorageService.storeCovidCases();
    this.onClear();
    this.covidForm.markAsPristine();
    this.covidForm.markAsUntouched();
  }

  onClear() {
    this.editMode = false;
    this.editedCovidCaseIndex = -1;
    this.editedCovidcase = null;
  }

  private initForm() {
    let patientName = '';
    let phoneNumber = '';

    if (this.editMode) {
      const recipe = this.covidCaseService.getCovidCase(this.id);
      patientName = recipe.patientName;
      phoneNumber = recipe.phoneNumber;
    }

    this.covidForm = new FormGroup({
      patientName: new FormControl(patientName, Validators.required),
      phoneNumber: new FormControl(phoneNumber, Validators.required)
    });
  }
}
