import { Component, OnInit } from '@angular/core';
import { Ordremission } from '../ordremission';
import { OrdremissionService } from '../ordremission.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ordrem',
  templateUrl: './ordrem.component.html',
  styleUrls: ['./ordrem.component.css']
})
export class OrdremComponent implements OnInit{
  oneWeekAgoDate: string='';
  todayDate: string = '';
  startDate: string = '';
  endDate: string = '';
  cin: string = '';
  matricule: string = '';
  nomPrenom: string = '';
userRole: string = '';
  user: any = {};
  
  constructor(private router: Router,private ordremissionService : OrdremissionService,
    private jwtService: JwtService){}

  ordremission : Ordremission =new Ordremission();
  errorMessage: string='';
  ngOnInit() {
 
    const currentDate = new Date();
    this.todayDate = currentDate.toISOString().split('T')[0];
    this.startDate = currentDate.toISOString().split('T')[0];
    this.endDate = currentDate.toISOString().split('T')[0];

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    this.oneWeekAgoDate = oneWeekAgo.toISOString().split('T')[0];
    
  

    const token = this.jwtService.getToken(); // Get the token from storage
    if (token) {
      this.userRole = this.jwtService.extractRole(token);
      this.cin = this.jwtService.extractClaim(token, 'cin');
      this.nomPrenom = this.jwtService.extractClaim(token, 'nomPrenomE');
      this.matricule = this.jwtService.extractClaim(token, 'matricule');
      this.ordremission.cin = this.cin;
      this.ordremission.nomPrenom = this.nomPrenom;
      this.ordremission.matriculeEmp = this.matricule;
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
  

  add() {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
      return;
    }
    const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

if (new Date(this.startDate) <= oneWeekAgo && new Date(this.startDate).setHours(0, 0, 0, 0) !== oneWeekAgo.setHours(0, 0, 0, 0)) {
  alert('Veuillez sélectionner une date plus récente');
  return;
}

if (new Date(this.endDate) < new Date(this.startDate) && new Date(this.endDate).setHours(0, 0, 0, 0) !== new Date(this.startDate).setHours(0, 0, 0, 0)) {
  alert('La date de retour doit être supérieure à la date de départ.');
  return;
}


  console.log(this.ordremission);
  this.ordremission.debutMission = this.startDate; 
    this.ordremission.finMission = this.endDate;
this.ordremission.dateMission=this.todayDate;
 
    this.ordremissionService.createordremission(this.ordremission).subscribe(data => {
      console.log(data);
      alert('Ordre mission en attente de validation par la hiéarchie');
      this.navigateToMenuBasedOnRole();
    },
    error => {
      console.log(error);
    });

this.ordremission.lieuDestination = '';
this.ordremission.ville = '';
this.ordremission.objetMission = '';
this.ordremission.moyenDeplacement = '';
this.ordremission.matriculeVehicule = '';
const currentDate = new Date();
this.startDate = currentDate.toISOString().split('T')[0];
this.endDate = currentDate.toISOString().split('T')[0];


    
  }
  isFormValid(): string {
    return (
      this.ordremission.nomPrenom &&
      this.ordremission.cin &&
      this.ordremission.lieuDestination &&
      this.ordremission.ville &&
      this.ordremission.objetMission &&
      this.ordremission.moyenDeplacement &&
      this.startDate &&
      this.endDate
    );
  }
  logout(): void {
    // Show a confirmation alert
    const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter?");
    
    if (confirmLogout) {
     
      // Navigate to the login page
      this.router.navigate(['/']); 
    }
  }

}
