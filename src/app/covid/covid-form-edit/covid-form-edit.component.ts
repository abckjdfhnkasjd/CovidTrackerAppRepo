import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { CovidCaseService } from '../covidCase.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-covid-form-edit',
  templateUrl: './covid-form-edit.component.html',
  styleUrls: ['./covid-form-edit.component.css']
})
export class CovidFormEditComponent implements OnInit {
  id: number;
  editMode = false;
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
      this.covidCaseService.updateRecipe(this.id, {...this.covidForm.value, createdBy: userData.email});
    } else {
      this.covidCaseService.addRecipe({...this.covidForm.value, createdBy: userData.email});
      this.dataStorageService.storeRecipes();
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let patientName = '';
    let phoneNumber = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.covidCaseService.getRecipe(this.id);
      patientName = recipe.patientName;
      phoneNumber = recipe.phoneNumber;
    }

    this.covidForm = new FormGroup({
      patientName: new FormControl(patientName, Validators.required),
      phoneNumber: new FormControl(phoneNumber, Validators.required)
    });
  }
}
