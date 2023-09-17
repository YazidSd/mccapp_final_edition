import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { Conge } from '../conge';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-c',
  templateUrl: './liste-c.component.html',
  styleUrls: ['./liste-c.component.css']
})
export class ListeCComponent implements OnInit {
  conge : Conge = new Conge();
  congelist: Conge[]=[]
  errorMessage: string='';


  constructor(private jwtService: JwtService,private router: Router,
    private congeservice : CongeService){}


  ngOnInit() {
   this.readconge();
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
  private readconge() {
    this.congeservice.readconge().subscribe(
      (data: Conge[]) => {
        // Apply your filtering logic here
        this.congelist = data.filter((conge)=>  conge.statutConge === 'EN ATTENTE');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  validerConge(conge1: Conge) {
    this.congeservice.validerConge(conge1).subscribe(
      (response) => {
        // Handle the response from the API if needed
        console.log('Validation response:', response);
        this.refreshCongeList(); // Optionally refresh the list after validation
      },
      (error) => {
        // Handle the error
        console.log('Validation error:', error);
      }
    );
  }

  deleteConge(cong: Conge) {
    this.congeservice.deleteConge(cong).subscribe(
      (response) => {
        // Handle the response from the API if needed
        console.log('Delete response:', response);
        this.refreshCongeList(); // Optionally refresh the list after deletion
      },
      (error) => {
        // Handle the error
        console.log('Delete error:', error);
      }
    );
  }

  refreshCongeList() {
    this.congeservice.readconge().subscribe(
      (data: Conge[]) => {
        this.congelist = data.filter((conge) => conge.statutConge === 'EN ATTENTE');
      },
      (error) => {
        console.log('Error fetching conge list:', error);
      }
    );
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

