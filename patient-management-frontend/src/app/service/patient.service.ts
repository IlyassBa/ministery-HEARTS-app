import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  postUser(data: string) {
    const JSONData = {
      "name": data
    };
    const url = 'http://localhost:8080/auth-qr';
    return this.http.post(url, JSONData);
  }

  // verifyCode(code: string) {
  //   const JSONData = {
  //     "code": code
  //   };
  //   const url = 'http://localhost:3000/auth-qr';
  //   return this.http.post(url, JSONData);
  // }

  verifyCode(code: string, name: string) {
    const JSONData = {
      "code": code,
      "name": name
    };
    const url = 'http://localhost:8080/verify-token';
    return this.http.post(url, JSONData);
  }

}

