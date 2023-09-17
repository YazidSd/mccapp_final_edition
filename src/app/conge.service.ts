import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import { Conge } from './conge';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  
  private baseURL ="http://localhost:8080/api/conge/create";
  private baseUrl1 ="http://localhost:8080/api/conge/read";
  private baseUrl2 ="http://localhost:8080/api/conge/approuver";
  private baseUrl3="http://localhost:8080/api/conge/delete";

 

  constructor(private httpClient: HttpClient,
   private http: HttpClient) { }

  createconge(conge : Conge): Observable<Object>{
    return this.httpClient.post(this.baseURL,conge);
  }

  readconge():Observable<Conge[]>{
    return this.httpClient.get<Conge[]>(this.baseUrl1);
  }

  validerConge(conge1: Conge): Observable<Conge> {
    return this.httpClient.post<Conge>(this.baseUrl2, conge1);
  }

  deleteConge(cong: Conge): Observable<string> {
    return this.http.delete(this.baseUrl3, {
      body: cong,
      responseType: 'text' // Expect a text response, not JSON
    });
  }
}
