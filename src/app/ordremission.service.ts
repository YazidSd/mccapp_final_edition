import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordremission } from './ordremission';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdremissionService {

  private baseUrl ="http://localhost:8080/api/ordrem/readorder";
  private baseUrl1 ="http://localhost:8080/api/ordrem/createorder";
  private baseUrl2 ="http://localhost:8080/api/ordrem/valider";
  private baseUrl3 ="http://localhost:8080/api/ordrem/deleteorder";


  constructor(private httpClient :HttpClient,
    private http: HttpClient) {}
     readordremission(): Observable<Ordremission[]>{
      return this.httpClient.get<Ordremission[]>(this.baseUrl);
    }
    createordremission(ordremission : Ordremission): Observable<Object>{
      return this.httpClient.post(this.baseUrl1,ordremission);
    }
    validerordremission(ordremission : Ordremission): Observable<Object>{
      return this.httpClient.post(this.baseUrl2,ordremission);
    }
    deleteOrdremission(order: Ordremission): Observable<String> {
    
      return this.http.delete(this.baseUrl3, {body: order , responseType: 'text' } );
    }
   
}
