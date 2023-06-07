import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observation } from '../models/observation';

@Injectable({
  providedIn: 'root',
})
export class ObservationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByParcelle(id: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(
      `${this.apiUrl}/Observation/show/parcelle/` + id
    );
  }
}
