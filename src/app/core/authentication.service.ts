import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  updateUserValue(newData){
    let fields = Object.keys(newData);
    for ( let field of fields) {
      this.currentUserValue[field] = newData[field];
    }
    localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
  }

  login(username, password) {
    return this.http.post<any>(`${environment.api_url}/api/auth`, {
          'email': username,
          'password': password
        })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      },
        catchError((err) => {
          return err}))
      );

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
