import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { Conge } from '../conge';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit{
  todayDate: string ='';
  conge : Conge = new Conge();
  startDate: string = '';
  endDate: string = '';
  fonction: string = '';
  matricule: string = '';
  nomPrenom: string = '';
  errorMessage: string='';
  userRole: string = '';


  constructor(private router: Router,private congeservice : CongeService,
    private jwtService: JwtService){}

  ngOnInit() {
    const currentDate = new Date();
    this.todayDate = currentDate.toISOString().split('T')[0];
    this.startDate = currentDate.toISOString().split('T')[0];
    this.endDate = currentDate.toISOString().split('T')[0];

    const token = this.jwtService.getToken(); // Get the token from storage
    if (token) {
      this.userRole = this.jwtService.extractRole(token);
      this.fonction = this.jwtService.extractClaim(token, 'fonction');
      this.nomPrenom = this.jwtService.extractClaim(token, 'nomPrenomE');
      this.matricule = this.jwtService.extractClaim(token, 'matricule');
      this.conge.fonction = this.fonction;
      this.conge.nomPrenom = this.nomPrenom;
      this.conge.matriculeEmp = this.matricule;
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

  updateEndDateMinDate() {
   
  }
  

  add(){
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
      return;
    }
    
    this.conge.dateDebutC= this.startDate; 
    this.conge.dateFinC = this.endDate;
this.conge.dateConge=this.todayDate;

    this.congeservice.createconge(this.conge).subscribe( data => {
      console.log(data);
      alert('Demande de congé en attente de validation par la hiéarchie');
    },
    error => {
      console.log(error);
    });
  
    this.conge.nomPrenom = '';
    this.conge.fonction = '';
    this.conge.interim = '';
    this.conge.taches = '';
    this.conge.jourDemandes = '';
    this.conge.jourDispo = '';
    this.conge.jourRestants = '';
    this.conge.matriculeEmp = '';
    this.conge.motifConge = '';
    const currentDate = new Date();
    this.startDate = currentDate.toISOString().split('T')[0];
    this.endDate = currentDate.toISOString().split('T')[0];
  }
  isFormValid(): string {
    return (
      this.conge.nomPrenom &&
      this.startDate &&
      this.endDate &&
      this.conge.fonction &&
      this.conge.interim &&
      this.conge.taches &&
      this.conge.jourDemandes &&
      this.conge.jourDispo &&
      this.conge.jourRestants &&
      this.conge.matriculeEmp &&
      this.conge.motifConge
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
