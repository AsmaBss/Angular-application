import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanSondage } from '../models/plan-sondage';

@Injectable({
  providedIn: 'root',
})
export class PlanSondageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByParcelle(id: number): Observable<PlanSondage[]> {
    return this.http.get<PlanSondage[]>(
      `${this.apiUrl}/PlanSondage/show/parcelle/` + id
    );
  }

  existByParcelle(id: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/PlanSondage/exist/parcelle/` + id
    );
  }

  add(f: any, id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/PlanSondage/add/` + id, f);
  }

  nbr(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/PlanSondage/show/nbr/` + id);
  }
}
