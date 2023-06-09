import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('userInfos')!)?.user
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(user: User) {
    return this.http
      .post<string>(`http://localhost:3008/api/login`, { user })
      .pipe(
        map(token => {
          var decodedToken = { token: '', user: {} };
          decodedToken.token = JSON.parse(JSON.stringify(token)).token;
          decodedToken.user = jwt_decode(
            JSON.parse(JSON.stringify(token)).token
          );
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          var user = new User();
          user = decodedToken.user;
          localStorage.removeItem('userInfos');
          localStorage.setItem('userInfos', JSON.stringify(decodedToken));
          this.userSubject.next(user);
          return JSON.stringify(user);
        })
      );
  }
  register(user: User) {
    return this.http.post(`http://localhost:3008/api/register`, user);
  }
  validateToken() {
    const tokenAge = Math.floor(Date.now() / 1000) - this.userValue.iat;
    if (tokenAge < 3500) {
      // token is aged under 3500s ~an hour (valid)
      return true;
    }
    return false;
  }
  disconnect() {
    localStorage.removeItem('userInfos');
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('userInfos')!)?.user
    );
  }
}
