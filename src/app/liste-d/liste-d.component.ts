import { Component, OnInit } from '@angular/core';
import { Deplacementurbain } from '../deplacementurbain';
import { DeplacementurbainService } from '../deplacementurbain.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-d',
  templateUrl: './liste-d.component.html',
  styleUrls: ['./liste-d.component.css']
})
export class ListeDComponent implements OnInit{
  deplacementUrbain : Deplacementurbain = new Deplacementurbain();
  deplacementlist: Deplacementurbain[] =[];
  errorMessage: string='';


constructor(private router: Router,  private jwtService: JwtService,
  private deplacementService: DeplacementurbainService){}
  ngOnInit() {
    this.readDeplacement();
    
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

  private readDeplacement() {
    this.deplacementService.readdep().subscribe(
      (data: Deplacementurbain[]) => {
        // Apply your filtering logic here
        this.deplacementlist = data.filter((deplacementurbain)=>  deplacementurbain.statutDep === 'EN ATTENTE');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  validateDeplacementUrbain(deplacementUrbain1: Deplacementurbain) {
    this.deplacementService.validerDeplacementUrbain(deplacementUrbain1).subscribe(
      (response) => {
        // Handle the response from the API if needed
        console.log('Validation response:', response);
        this.refreshDeplacementList();
      },
      (error) => {
        // Handle the error
        console.log('Validation error:', error);
      }
    );
  }
  refreshDeplacementList() {
    this.deplacementService.readdep().subscribe(
      (data: Deplacementurbain[]) => {
        this.deplacementlist = data.filter((deplacementurbain)=>  deplacementurbain.statutDep === 'EN ATTENTE');

      },
      (error) => {
        console.log('Error fetching deplacement list:', error);
      }
    );
  }
  onDeleteDeplacementUrbain(deplacementUrbain1: Deplacementurbain) {
    this.deplacementService.deleteDeplacementUrbain(deplacementUrbain1)
      .subscribe(
        response => {
          console.log(response); 
          this.refreshDeplacementList();
        },
        error => {
          console.error(error); // Handle the error response
          const errorMessage = error.error; // The error response is now a string, not an object
          console.log(errorMessage); // Show the error message to the user or take corrective actions.
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
