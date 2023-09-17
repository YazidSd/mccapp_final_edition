import { Component } from '@angular/core';
import { EmployeService } from '../employe.service';
import { Employe } from '../employe';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css']
})
export class CollaborateursComponent {
  employe: Employe[]=[];
  employee: Employe = new Employe();
  errorMessage: string='';


  constructor(private router: Router,private jwtService: JwtService,
    private employeService: EmployeService){}

    
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

    add() {
      if (!this.isFormValid()) {
        alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
        return;
      }
    
      // Check if the matricule already exists in the database
      this.employeService.getEmployeeByMatricule(this.employee.matricule).subscribe(existingEmployee => {
        if (existingEmployee) {
          alert('Matricule existe déjà.');
        } else {
          this.employeService.getEmployeeByCin(this.employee.cin).subscribe(existingEmployeeByCin => {
            if (existingEmployeeByCin) {
              alert('CIN existe déjà.');
            } else {
              // Matricule and CIN don't exist, proceed with creating the employee
              this.employeService.createmp(this.employee).subscribe(
                data => {
                  console.log(data);
                  alert('Collaborateur ajouté avec succès.');
                  this.clearForm(); 
                  this.navigateToMenuBasedOnRole();
                },
                error => {
                  console.log(error);
                }
              );
            }
          });
        }
      }); 
    }
    
      
    
  

  transformToUppercase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }
  filterNonNumeric(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }

  clearForm(): void {
    this.employee.nomPrenomE = '';
    this.employee.matricule = '';
    this.employee.cin = '';
    this.employee.direction = '';
    this.employee.numTelE = '';
    this.employee.matriculeN1 = '';
    this.employee.role = '';
    this.employee.entite = '';
    this.employee.emailE = '';
    this.employee.fonction = '';
  }

  isFormValid(): string {
    return (
      this.employee.nomPrenomE &&
      this.employee.matricule &&
      this.employee.cin &&
      this.employee.direction &&
      this.employee.numTelE &&
      this.employee.matriculeN1 &&
      this.employee.role &&
      this.employee.entite &&
      this.employee.emailE &&
      this.employee.fonction
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
