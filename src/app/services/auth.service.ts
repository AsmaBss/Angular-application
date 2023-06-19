import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

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
  register(f: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/register`, f);
  }

  forUser() {
    return this.http.get(`${this.apiUrl}/forUser`, {
      responseType: 'text',
    });
  }

  //

  setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  public getRoles(): [] {
    const rolesString = localStorage.getItem('roles');
    return rolesString ? JSON.parse(rolesString) : [];
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
    return this.getRoles() && this.getToken();
  }
}
