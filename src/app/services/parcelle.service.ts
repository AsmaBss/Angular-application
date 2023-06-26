import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parcelle } from '../models/parcelle';

@Injectable({
  providedIn: 'root',
})
export class ParcelleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Parcelle[]> {
    return this.http.get<Parcelle[]>(`${this.apiUrl}/Parcelle/show`);
  }
  getByUser(id: number): Observable<Parcelle[]> {
    return this.http.get<Parcelle[]>(`${this.apiUrl}/Parcelle/show/user/` + id);
  }
  add(f: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Parcelle/add`, f);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Parcelle/delete/` + id);
  }
}
