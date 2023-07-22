import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Parcelle } from '../models/parcelle';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/User/show`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/User/delete/` + id);
  }

  affect(id: number, parcelles: Parcelle[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/User/affect/` + id, parcelles);
  }
}
