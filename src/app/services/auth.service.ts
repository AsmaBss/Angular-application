import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Parcelle } from '../models/parcelle';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
  });

  constructor(private http: HttpClient) {}

  login(f: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, f, {
      headers: this.requestHeader,
    });
  }
  register(f: User, id: number): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/register/` + id, f);
  }
  addUser(user: User, parcelles: Parcelle[], id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/add/` + id, {
      user: user,
      parcelles: parcelles,
    });
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  public getUser(): User {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  public getToken(): string {
    return localStorage.getItem('jwtToken') ?? '';
  }
  public clear() {
    localStorage.clear();
  }
  public isLoggedIn() {
    return this.getUser() && this.getToken();
  }
}
