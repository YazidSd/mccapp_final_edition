import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autorisation } from './autorisation';
import{Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  baseURL ="http://localhost:8080/api/autorisation/create";
  baseUrl1 ="http://localhost:8080/api/autorisation/read";

  constructor(private httpClient: HttpClient) { }

  createauto(autorisation :Autorisation):Observable<Object>{
    return this.httpClient.post(this.baseURL,autorisation)
  }

  readauto():Observable<Autorisation[]>{
    return this.httpClient.get<Autorisation[]>(this.baseUrl1);
  }
}
