import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeService } from '../employe.service';
import { Employe } from '../employe';
import { JwtService } from '../jwt.service';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  username: string;
  password: string;
  errorMessage: string;
 
  constructor(
    private router: Router,
    private employeservice: EmployeService,
    private jwtService: JwtService,
    private authService: AuthserviceService
  ) {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }

  
  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          const token = response.token; // Extract token from the response
        this.jwtService.storeToken(token); // Store the token using JwtService

        const userRole = this.jwtService.extractRole(token); // Extract role from the token
        console.log('Extracted user role:', userRole); 

        // Store the role in local storage for further use
        localStorage.setItem('userRole', userRole);

        if (userRole === 'RH' || userRole === 'MANAGER') {
          this.router.navigate(['/menurh']);
        } else if (userRole === 'EMPLOYE') {
          this.router.navigate(['/menu']);
        } else if (userRole === 'ADMIN') {
          this.router.navigate(['/menuad']);
        } else {
          this.errorMessage = 'Invalid role'; // Handle invalid roles (optional)
        }
      },
      (error) => {
        console.log('Error logging in:', error);
        this.errorMessage = 'Invalid username or password';
      }
      );
  }
}
