import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../models/images';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(id: number): Observable<Image[]> {
    return this.http.get<Image[]>(
      `${this.apiUrl}/Images/show/prelevement/` + id
    );
  }
}
