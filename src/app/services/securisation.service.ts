import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Securisation } from '../models/securisation';

@Injectable({
  providedIn: 'root',
})
export class SecurisationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Securisation[]> {
    return this.http.get<Securisation[]>(`${this.apiUrl}/Securisation/show`);
  }
}
