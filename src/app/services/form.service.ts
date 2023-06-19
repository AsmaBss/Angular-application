import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Form } from '../models/form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  add(f: Form): Observable<Form> {
    console.log('--------> ', f);
    return this.http.post<Form>(`${this.apiUrl}/Form/add`, f);
  }
}
