import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private currentUser: any;

  constructor(private http: HttpClient, private authentication_service: AuthenticationService) {
    this.currentUser = authentication_service.currentUserValue;
  }

  persons(parameters) {
    let query_parameters = '';
    for(let parameter in parameters){
      query_parameters += `${parameter}=${parameters[parameter]}&`;
    }
    return this.http.get<any>(`${environment.api_url}/api/persons?${query_parameters}`).pipe();
  }

  create_person(data) {
    return this.http.post<any>(`${environment.api_url}/api/persons`, data).pipe();
  }

  delete_person(person_id) {
    return this.http.delete<any>(`${environment.api_url}/api/persons/${person_id}`).pipe();
  }
}
