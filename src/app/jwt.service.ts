import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  extractClaim(token: string, claimName: string): any {
    const userDetails = this.extractUserDetails(token);
    return userDetails ? userDetails[claimName] : null;
  }

  extractUsername(token: string): string {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.sub;
  }

  extractUserDetails(token: string): any {
    const decodedToken = this.jwtHelper.decodeToken(token);
    
    return decodedToken; // This will contain all user details stored in the token
  }

  extractRole(token: string): string {
    const user = this.extractUserDetails(token);
    console.log("User details:", user);
    return user.role; // Adjust this based on the structure of user details in your JWT token
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  // Additional methods for generating and validating tokens if needed

  // Method to set the 'Authorization' header
  public getHeadersWithAuthorization(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Add similar methods for other API calls as needed

  // Method to get the token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
