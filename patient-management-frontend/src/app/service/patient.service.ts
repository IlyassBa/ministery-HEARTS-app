import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(N_Dossier: any): Observable<any> {
    return this.http.get(`${baseUrl}/${N_Dossier}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(N_Dossier: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${N_Dossier}`, data);
  }

  delete(N_Dossier: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${N_Dossier}`);
  }

}

