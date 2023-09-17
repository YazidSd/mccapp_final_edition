import { Component, OnInit } from '@angular/core';
import { Ordremission } from '../ordremission';
import { OrdremissionService } from '../ordremission.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liste-o',
  templateUrl: './liste-o.component.html',
  styleUrls: ['./liste-o.component.css']
})
export class ListeOComponent implements OnInit {
  ordremissionlist: Ordremission[] = [];
  ordremission : Ordremission =new Ordremission();
  errorMessage: string='';


  constructor(private jwtService: JwtService,private router: Router,private ordremissionService: OrdremissionService){}

ngOnInit(){
  this.readOrdremission();

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

private readOrdremission() {
  this.ordremissionService.readordremission().subscribe(
    (data: Ordremission[]) => {
      // Filter the data to include only entries with statutOrdre === 'EN ATTENTE'
      this.ordremissionlist = data.filter((ordremission) => ordremission.statutOrdre === 'EN ATTENTE');
    },
    (error) => {
      console.log(error);
    }
  );
}
validateOrdremission(ordremission: Ordremission) {
  this.ordremissionService.validerordremission(ordremission).subscribe(
    (response) => {
      // Handle the response from the API if needed
      console.log('Validation response:', response);
      this.refreshOrdremissionList();
     
    },
    (error) => {
      // Handle the error
      console.log('Validation error:', error);
    }
  );
}
onDelete(order: Ordremission) {
  this.ordremissionService.deleteOrdremission(order).subscribe(
    data => {
      console.log('Deleted successfully:', data);
      // Refresh your ordremission list here if needed
      this.refreshOrdremissionList();
    },
    (error) => {
      // Handle the error if deletion fails
      console.log('Delete error:', error);
      this.refreshOrdremissionList();
    }
  );
}


refreshOrdremissionList() {
  // Call the service to fetch the updated data
  this.ordremissionService.readordremission().subscribe(
    (data: Ordremission[]) => {
      // Filter the data to include only entries with statutOrdre === 'EN ATTENTE'
      this.ordremissionlist = data.filter((ordremission) => ordremission.statutOrdre === 'EN ATTENTE');
    },
    (error) => {
      console.log(error);
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
