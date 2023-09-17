import { Component, OnInit } from '@angular/core';
import { Deplacementurbain } from '../deplacementurbain';
import { DeplacementurbainService } from '../deplacementurbain.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depurbain',
  templateUrl: './depurbain.component.html',
  styleUrls: ['./depurbain.component.css']
})

export class DepurbainComponent implements OnInit{
  selectedDate: string='';
  oneWeekAgoDate: string='';
  todayDate: string ='';
  deplacementurb : Deplacementurbain = new Deplacementurbain();
  isBack: boolean = false;
  actualHour: string = '';
  cin: string = '';
  matricule: string = '';
  nomPrenom: string = '';
  errorMessage: string='';
  userRole: string = '';


  constructor(private router: Router,private deplacementService: DeplacementurbainService,
    private jwtService: JwtService){
  }
  ngOnInit() {
    const currentDate = new Date();
    this.selectedDate = currentDate.toISOString().split('T')[0];

    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    this.oneWeekAgoDate = oneWeekAgo.toISOString().split('T')[0];
    
  


    const token = this.jwtService.getToken(); // Get the token from storage
    if (token) {
      this.userRole = this.jwtService.extractRole(token);
      this.matricule = this.jwtService.extractClaim(token, 'matricule');
      this.nomPrenom = this.jwtService.extractClaim(token, 'nomPrenomE');
      this.deplacementurb.matriculeEmp = this.matricule;
      this.deplacementurb.nomPrenom = this.nomPrenom;
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

  add(){
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
      return;
    }
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    console.log('One Week Ago:', oneWeekAgo.toISOString().split('T')[0]);

    
    if (new Date(this.selectedDate) <= oneWeekAgo && new Date(this.selectedDate).setHours(0, 0, 0, 0) !== oneWeekAgo.setHours(0, 0, 0, 0)) {
        alert('Veuillez sélectionner une date plus récente.');
        return;
    }

    this.deplacementurb.dateDep=this.selectedDate;
    this.deplacementurb.heureRetourEff = this.actualHour;

    this.deplacementService.createdep(this.deplacementurb).subscribe( data => {
      console.log(data);
      alert('Deplacement en attente de validation par la hiéarchie');
      this.navigateToMenuBasedOnRole();
    },
    error => {
      console.log(error);
    });
  }
  isFormValid(): string {
    return (
      this.deplacementurb.nomPrenom &&
      this.selectedDate &&
      this.deplacementurb.matriculeEmp &&
      this.deplacementurb.nomClient &&
      this.deplacementurb.objetMission &&
      this.deplacementurb.heureDepart 
      
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
