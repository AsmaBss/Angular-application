import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shapefile } from '../models/shapefile';
import { Geometry } from '@turf/turf';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ShapefileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(f: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Shapefile/test`, f);
  }

  addFiles(f: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Parcelle/add`, f);
  }

  /*addShapefile(
    name: string,
    type: string,
    geometry: Geometry
  ): Observable<Shapefile> {
    const body = { name, type, geometry };
    console.log('body', body);
    return this.http.post<Shapefile>(`${this.apiUrl}/Shapefile/add`, body);
  }*/
}
