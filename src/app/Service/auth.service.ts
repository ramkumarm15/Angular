import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment as environment_1 } from 'src/environments/environment';
import { Login } from '../Model/login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment_1.baseUrlAuth;
  private isUserLoggedIn: boolean = false;
  private token: any = localStorage.getItem('access_token')?.toString();
  private user: any = localStorage.getItem('user');
  private jwt = new JwtHelperService();

  // Injecting service
  constructor(private http: HttpClient, private route: Router) {}

  // function to login a user
  // return JWT keys and user data
  login(data: Login): Observable<any> {
    return this.http.post(`${this.url}/Token`, data).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  // function to logout a user
  // no return
  logout(): void {
    localStorage.removeItem('access_token');
    if (localStorage.getItem('access_token') == null)
      this.route.navigate(['login']);
  }

  // get user JWT token from localstorage
  // return token as string or null
  getUserToken(): any {
    if (localStorage.getItem('access_token') != null) {
      return localStorage.getItem('access_token')?.toString();
    }
    return null;
  }

  // verify wheather user token is valid or not
  verifyToken(): Observable<any> {
    return this.http.get(`${this.url}/Token/Validate`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.url}/Token`);
  }
  getMe(): Observable<any> {
    return this.http.get(`${this.url}/Token/GetMe`, { responseType: 'text' });
  }

  // check wheather user is logged in or not
  // returns true / false
  get isLoggedIn(): boolean {
    console.log(this.token);

    if (!this.isUserLoggedIn) {
      if (this.token != null && !this.jwt.isTokenExpired(this.token)) {
        this.isLoggedIn = true;
      }
    }
    return this.isUserLoggedIn;
  }
  set isLoggedIn(value) {
    this.isUserLoggedIn = value;
  }
  get getUserId(): string {
    return JSON.parse(this.user).id;
  }

  get getUsername(): string {
    return JSON.parse(this.user).username;
  }
}
