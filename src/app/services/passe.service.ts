import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Passe } from '../models/passe';

@Injectable({
  providedIn: 'root',
})
export class PasseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(id: number): Observable<Passe[]> {
    return this.http.get<Passe[]>(
      `${this.apiUrl}/Passe/show/prelevement/` + id
    );
  }
}
