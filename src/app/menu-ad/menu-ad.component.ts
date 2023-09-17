import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-ad',
  templateUrl: './menu-ad.component.html',
  styleUrls: ['./menu-ad.component.css']
})
export class MenuADComponent {
  constructor(private router: Router) {}


  logout(): void {
    // Show a confirmation alert
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
     
      // Navigate to the login page
      this.router.navigate(['/']); 
    }
  }

 
}
