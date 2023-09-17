import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}


  toggleResponsiveClass() {
    const x = document.getElementById('myTopnav');
    if (x?.classList.contains('topnav')) {
      x.classList.add('responsive');
    } else {
      x?.classList.remove('responsive');
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
