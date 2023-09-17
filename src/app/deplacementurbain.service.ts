import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deplacementurbain } from './deplacementurbain';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeplacementurbainService {
  private baseUrl = "http://localhost:8080/api/deplacement/create";
  private baseUrl1 ="http://localhost:8080/api/deplacement/read";
  private baseUrl2 ="http://localhost:8080/api/deplacement/approuver";
  private baseUrl3 ="http://localhost:8080/api/deplacement/delete";
  

  constructor(private httpClient: HttpClient,
    private http: HttpClient) { }

  createdep(deplacement: Deplacementurbain): Observable<Object> {
    return this.httpClient.post(this.baseUrl, deplacement);
  }

  readdep():Observable<Deplacementurbain[]>{
    return this.httpClient.get<Deplacementurbain[]>(this.baseUrl1);
  }
 
  validerDeplacementUrbain(deplacementUrbain1: Deplacementurbain): Observable<Deplacementurbain> {
    return this.httpClient.post<Deplacementurbain>(this.baseUrl2, deplacementUrbain1);
  }

  
  deleteDeplacementUrbain(dep: Deplacementurbain): Observable<string> {
    return this.http.delete(this.baseUrl3, {
      body: dep,
      responseType: 'text' // Expect a text response, not JSON
    });
  }

}
