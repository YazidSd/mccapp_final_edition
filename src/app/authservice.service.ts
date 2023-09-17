import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  
  
  private baseUrl = 'http://localhost:8080/api/auth/authenticate';

  constructor(private http: HttpClient) { }
  login(matricule: string, password: string): Observable<any> {
    const body = { matricule, password };
    return this.http.post(`${this.baseUrl}`, body);
  }
}
