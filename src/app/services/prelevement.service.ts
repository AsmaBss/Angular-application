import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Prelevement } from '../models/prelevement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrelevementService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByPlanSondage(id: number): Observable<Prelevement> {
    return this.http.get<Prelevement>(
      `${this.apiUrl}/Prelevement/show/sondage/` + id
    );
  }
}
