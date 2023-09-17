import { Component, OnInit } from '@angular/core';
import { Autorisation } from '../autorisation';
import { EmployeService } from '../employe.service';
import { Employe } from '../employe';
import { AutorisationService } from '../autorisation.service';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-liste-a',
  templateUrl: './liste-a.component.html',
  styleUrls: ['./liste-a.component.css']
})
export class ListeAComponent implements OnInit {
  autorisation: Autorisation = new Autorisation();
  autorisationList: Autorisation[]=[]
  errorMessage: string='';
  employe: Employe[]=[];
  employee: Employe = new Employe();


  constructor(private router: Router,private autorisationservice: AutorisationService,
    private jwtService: JwtService,private employeService: EmployeService){}


  ngOnInit(){
   this.readAuto();
  }
  
  navigateToMenuBasedOnRole() {
    const token = this.jwtService.getToken();
    if (token) {
      const userRole = this.jwtService.extractRole(token);

      if (userRole === 'RH' || userRole === 'MANAGER') {
        this.router.navigate(['/menurh']);
      } else if (userRole === 'EMPLOYE') {
        this.router.navigate(['/menu']);
      } else if (userRole === 'ADMIN') {
        this.router.navigate(['/menuad']);
      } else {
        this.errorMessage = 'Invalid role'; // Handle invalid roles (optional)
      }
    }
  }
  
  private readAuto() {
    const token = this.jwtService.getToken();
  if (token) {
    const matriculeN1 = this.jwtService.extractClaim(token, 'matriculeN1');
  
    this.autorisationservice.readauto().subscribe(
      (data: Autorisation[]) => {
        // Filter the data where dateAutorisation is today
        const today = new Date();
        this.autorisationList = data.filter((autorisation) => {
          const autorisationDate = new Date(autorisation.dateAut);
          return (
            autorisationDate.getDate() === today.getDate() &&
            autorisationDate.getMonth() === today.getMonth() &&
            autorisationDate.getFullYear() === today.getFullYear() 
          );
        });
      },
      (error) => {
        console.log('Error fetching autorisation list:', error);
      }
    );
  }
  }


  read() {
    const token = this.jwtService.getToken();
    if (token) {
      const matriculeN1 = this.jwtService.extractClaim(token, 'matriculeN1');
    
      this.autorisationservice.readauto().subscribe(
        (data: Autorisation[]) => {
          this.autorisationList = data;
          
        },
        (error) => {
          console.log('Error fetching autorisation list:', error);
        }
      );
    }
  }
  

 readA() {
  const token = this.jwtService.getToken();
  if (token) {
    const matriculeN1 = this.jwtService.extractClaim(token, 'matriculeN1');
  
    this.autorisationservice.readauto().subscribe(
      
      (data: Autorisation[]) => {
        // Filter the data where dateAutorisation is within the current month
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        this.autorisationList = data.filter((autorisation) => {
          const autorisationDate = new Date(autorisation.dateAut);
          return (
            autorisationDate >= firstDayOfMonth && autorisationDate <= lastDayOfMonth 

          );
        });
      },
      (error) => {
        console.log('Error fetching autorisation list:', error);
      }
    );
  }
  }
  logout(): void {
    // Show a confirmation alert
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
     
      // Navigate to the login page
      this.router.navigate(['/']); 
    }
  }

}


