import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {ProfileService} from "../core/profile.service";

export interface Person {
  _id: string;
  name: string;
  phone: string;
  years_old: number;
  sex: string;
  hobby: string;
  creation_date: Date;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'years_old', 'hobby', 'creation_date', 'delete'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Person[];
  year_list = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
  sex_list = ['male', 'female']
  personForm: FormGroup;
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      years_old: ['', Validators.required],
      sex: ['', Validators.required],
      hobby: ['', Validators.required]
    });

    this.searchForm = this.formBuilder.group({
      name: ['', Validators.nullValidator],
      hobby: ['', Validators.nullValidator]
    });

    this.get_persons();
  }


  get_persons(parameters={}){
    this.profileService.persons(parameters)
      .pipe(first())
      .subscribe(
        response => {
          console.log(response);
          this.data = response.data;
        },
        err => {
          console.log(err)
        }); 
  }

  search_persons(){
    let parameters = {};
    if(this.personForm.controls.name.value.length > 0){
      parameters['name'] = this.personForm.controls.name.value;
    }
    if(this.personForm.controls.hobby.value.length > 0){
      parameters['hobby'] = this.personForm.controls.hobby.value;
    }

    this.get_persons(parameters);
  }

  save_person(){
    if (this.personForm.invalid) {
      return;
    }

    let data = {
      "name": this.f.name.value,
      "years_old": this.f.years_old.value,
      "sex": this.f.sex.value,
      "hobby": this.f.hobby.value,
      "password": this.f.password.value,
      "email": this.f.email.value,
      "phone": this.f.phone.value
    };

    this.profileService.create_person(data)
    .pipe(first())
    .subscribe(
      response => {
        this.get_persons();
      },
      err => {
        console.log(err);
      });
  }

  delete_person(person_id){    
    this.profileService.delete_person(person_id)
    .pipe(first())
    .subscribe(
      response => {
        this.data = this.data.filter(person => {
          return person._id != person_id;
        });
        console.log(this.data);
      },
      err => {
        console.log(err);
      });
  }

  get f() { return this.personForm.controls; }

}
