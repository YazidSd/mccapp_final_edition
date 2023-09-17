import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notefrais } from './notefrais';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotefraisService {
  
  private baseUrl="http://localhost:8080/api/notesfrais/create";
  private baseUrl1="http://localhost:8080/api/notesfrais/update";
  private baseUrl2="http://localhost:8080/api/notesfrais/delete";
  private baseUrl3="http://localhost:8080/api/notesfrais/read";


  constructor(private httpClient: HttpClient) { }


  createnote(notesfrais: Notefrais): Observable<object>{
    return this.httpClient.post(this.baseUrl, notesfrais)
  }

  updatenote(notesfrais: Notefrais): Observable<object>{
    return this.httpClient.put(this.baseUrl1, notesfrais)
  }
  
 // deletenote(notesfrais: Notefrais): Observable<any>{
  //  return this.httpClient.delete(this.baseUrl2, notesfrais)
 // }

 readnotesfrais(): Observable<Notefrais[]> {
  return this.httpClient.get<Notefrais[]>(this.baseUrl3);
}
}
