import { Ingredient } from '../shared/ingredient.model';

export class CovidCase {
  public patientName: string;
  public phoneNumber: string;
  public gender: string;
  public state: string;
  public createdBy: string;

  constructor(patientName: string, phoneNumber: string, gender: string, state: string, createdBy: string) {
    this.patientName = patientName;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.state = state;
    this.createdBy = createdBy;
  }
}
