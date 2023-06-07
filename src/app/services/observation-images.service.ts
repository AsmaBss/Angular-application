import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImagesObservations } from '../models/images-observations';

@Injectable({
  providedIn: 'root',
})
export class ObservationImagesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByObservation(id: number): Observable<ImagesObservations[]> {
    return this.http.get<ImagesObservations[]>(
      `${this.apiUrl}/ImagesObservations/show/` + id
    );
  }
}
