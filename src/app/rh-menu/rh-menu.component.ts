import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rh-menu',
  templateUrl: './rh-menu.component.html',
  styleUrls: ['./rh-menu.component.css']
})
export class RhMenuComponent {
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
