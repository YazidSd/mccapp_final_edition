import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from './employe';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private baseUrl="http://localhost:8080/api/employe/read";
  private baseUrl1="http://localhost:8080/api/employe/create";
  private baseUrl2="http://localhost:8080/api/employe/delete";
  private baseUrl3="http://localhost:8080/api/employe/update";
  private baseUrl4="http://localhost:8080/api/employe/updateP";
  private baseUrl5="http://localhost:8080/api/employe";



  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private jwtService: JwtService ) { }

    reademp():Observable<Employe[]>{
      return this.httpClient.get<Employe[]>(this.baseUrl);
    }

    getEmployees(): Observable<any> {
      const token = this.jwtService.getToken();
    if (token) {
      
      const headers = this.jwtService.getHeadersWithAuthorization(token);
      return this.httpClient.get(`${this.baseUrl}`, { headers });
    } else {
      
      return new Observable<any>();
    }
    }
    

    createmp(employe: Employe): Observable<Object> {
      return this.httpClient.post(this.baseUrl1,employe);
    }

    deleteDeplacementUrbain(existingEmploye: Employe ): Observable<string> {
      return this.http.delete(this.baseUrl2, {
        body: existingEmploye,
        responseType: 'text' // Expect a text response, not JSON
      });
    }
 
    updateEmployeePassword(employe: Employe): Observable<Employe> {
      const url = `${this.baseUrl4}`;
      return this.httpClient.put<Employe>(url, employe);
    }

    getEmployeeByMatricule(matricule: string): Observable<Employe | undefined> {
      const url = `${this.baseUrl5}/${matricule}`;
      return this.httpClient.get<Employe>(url);
    }

    getEmployeeByCin(cin: string): Observable<Employe> {
      return this.http.get<Employe>(`${this.baseUrl5}/Cin/${cin}`);
    }

}
