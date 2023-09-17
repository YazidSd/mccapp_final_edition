import { Component, OnInit } from '@angular/core';
import { Autorisation } from '../autorisation';
import { AutorisationService } from '../autorisation.service';
import { JwtService } from '../jwt.service'; 
import { EmployeService } from '../employe.service';
import { Employe } from '../employe';
import { Router } from '@angular/router';


@Component({
  selector: 'app-autoris',
  templateUrl: './autoris.component.html',
  styleUrls: ['./autoris.component.css']
})
export class AutorisComponent implements OnInit {
  oneWeekAgoDate: string='';
  todayDate: string = '';
  autorisation: Autorisation = new Autorisation();
  userRole: string = '';
  employe: Employe = new Employe();
  matricule: string = '';
  nomPrenom: string = '';
  direction: string = '';
  errorMessage: string='';
  


  constructor(private autorisationservice: AutorisationService
    ,private jwtService: JwtService,
    private employeservice: EmployeService,
    private router: Router) { }

  ngOnInit() {
    const currentDate = new Date();
    this.todayDate = currentDate.toISOString().split('T')[0];

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 1);
    this.oneWeekAgoDate = oneWeekAgo.toISOString().split('T')[0];
    


    const token = this.jwtService.getToken(); // Get the token from storage
    if (token) {
      this.userRole = this.jwtService.extractRole(token);
      this.matricule = this.jwtService.extractClaim(token, 'matricule');
      this.nomPrenom = this.jwtService.extractClaim(token, 'nomPrenomE');
      this.direction = this.jwtService.extractClaim(token, 'direction');
      this.autorisation.matriculeEmp = this.matricule;
      this.autorisation.nomPrenom = this.nomPrenom;
      this.autorisation.directionp =this.direction;
    } else {
      // Handle the case when the token is null
      console.error('Token is null.');
    }
  }

  transformToUppercase(event: any) {
    event.target.value = event.target.value.toUpperCase();
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

  add() {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
      return;
    }
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);
    console.log('One Week Ago:', oneWeekAgo.toISOString().split('T')[0]);

    
    if (new Date(this.todayDate) < oneWeekAgo) {
        alert('Veuillez sélectionner une date plus récente.');
        return;
    }
    
  if (this.autorisation.heureDepart && this.autorisation.heureRetourPr) {
    const heureDepart = this.parseTime(this.autorisation.heureDepart);
    const heureRetour = this.parseTime(this.autorisation.heureRetourPr);

    if (heureRetour <= heureDepart) {
      alert('L\'heure de retour prévisionnelle doit être supérieure à l\'heure de départ.');
      return;
    }
  }

    this.autorisation.dateAut = this.todayDate;

    this.autorisationservice.createauto(this.autorisation).subscribe(
      (data) => {
        console.log(data);
        alert('Autorisation de sortie en attente de validation par la hiéarchie');
        this.clearForm(); // Clear the form after successful submission
        this.navigateToMenuBasedOnRole();
      },
      (error) => {
        console.log(error);
      }
    );
  
  }
  isFormValid(): string {
    return (
      this.todayDate &&
      this.autorisation.nomPrenom &&
      this.autorisation.matriculeEmp &&
      this.autorisation.directionp &&
      this.autorisation.heureDepart &&
      this.autorisation.heureRetourPr &&
      this.autorisation.motif
    );
  }
  parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const parsedTime = new Date();
    parsedTime.setHours(hours, minutes);
    return parsedTime;
  }
 

  clearForm(): void {
    this.autorisation.nomPrenom = '';
    this.autorisation.matriculeEmp = '';
    this.autorisation.dateAut = '';
    this.autorisation.directionp = '';
    this.autorisation.heureDepart = '';
    this.autorisation.heureRetourPr = '';
    this.autorisation.heureRetourEff = '';
    this.autorisation.motif = '';
  }

  navigateToDashboard(): void {
    if (this.userRole === 'EMPLOYE') {
      this.router.navigate(['/menu']); // Navigate to the EMPLOYE dashboard
    } else if (this.userRole === 'ADMIN') {
      this.router.navigate(['/menuad']); // Navigate to the ADMIN dashboard
    } else if (this.userRole === 'RH' || this.userRole === 'MANAGER') {
      this.router.navigate(['/menurh']); // Navigate to the RH/MANAGER dashboard
    } else {
      console.log('Invalid role:', this.userRole);
    }
  }
  getDashboardLink(): string {
    if (this.userRole === 'EMPLOYE') {
      return '/menu';
    } else if (this.userRole === 'ADMIN') {
      return '/menuad';
    } else if (this.userRole === 'RH' || this.userRole === 'MANAGER') {
      return '/menurh';
    } else {
      return '#'; // Return a default link or handle invalid roles as needed
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
