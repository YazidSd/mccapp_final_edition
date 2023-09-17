import { Component, OnInit } from '@angular/core';
import { Ordremission } from '../ordremission';
import { OrdremissionService } from '../ordremission.service';
import { Notefrais } from '../notefrais';
import { NotefraisService } from '../notefrais.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Deplacementurbain } from '../deplacementurbain';
import { DeplacementurbainService } from '../deplacementurbain.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-tablistf',
  templateUrl: './tablistf.component.html',
  styleUrls: ['./tablistf.component.css']
})
export class TablistfComponent implements OnInit {
  numOM: number | null = null;
  todayDate: string = '';
  startDate:string='';
  endDate:string='';
  ordremissionlist: Ordremission[] = [];
  notesfraislist: Notefrais[] = [];
  newNote: Notefrais = new Notefrais();
  deplacementlist: Deplacementurbain[] =[];
  selectedRows: { [key: string]: boolean } = {};
  isChecked: boolean = false;
  errorMessage: string='';


  constructor(private router: Router,private ordremissionService: OrdremissionService,
    private notefraisService: NotefraisService,
    private deplacementService: DeplacementurbainService,
    private jwtService: JwtService) {}

    ngOnInit() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month.
    
      // Set startDate to the first day of the current month
      this.startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    
      // Set endDate to the last day of the current month
      const lastDay = new Date(year, month, 0).getDate();
      this.endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
    
      this.todayDate = currentDate.toISOString().split('T')[0];
      this.readOrdremission();
      this.readDeplacement();
    }
    
  validateNumOMInput(inputValue: string) {
    const parsedValue = parseInt(inputValue, 10);
    if (isNaN(parsedValue)) {
      // The input cannot be parsed as a valid number, so set this.numOM to null.
      this.numOM = null;
    } else {
      // The input is a valid number, so update this.numOM with the parsed value.
      this.numOM = parsedValue;
    }
  }
  
  onSearch() {
    const inputValue = (document.getElementById('numOM') as HTMLInputElement).value;
    this.validateNumOMInput(inputValue);
  
    this.ordremissionService.readordremission().subscribe(
      (data: Ordremission[]) => {
        // Filter the ordre missions based on selected dates and/or numOM
        this.ordremissionlist = data.filter((ordremission) => {
          const isWithinDateRange =
            ordremission.dateMission >= this.startDate &&
            ordremission.dateMission <= this.endDate;
  
          // If numOM is not provided (i.e., null), only filter by date range
          if (this.numOM === null) {
            return isWithinDateRange;
          } else {
            // If numOM is provided, filter based on both date range and numOM value
            return ordremission.numOrdre === this.numOM;
          }

        
        }); 
        if (this.numOM === null && (!this.startDate || !this.endDate)) {
          this.ordremissionlist = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  
    this.deplacementService.readdep().subscribe(
      (data: Deplacementurbain[]) => {
        // Filter the deplacement list based on selected dates and/or numOM
        this.deplacementlist = data.filter((deplacementurbain) => {
          const isWithinDateRange =
            deplacementurbain.dateDep >= this.startDate &&
            deplacementurbain.dateDep <= this.endDate;
  
          // If numOM is not provided (i.e., null), only filter by date range
          if (this.numOM === null) {
            return isWithinDateRange;
          } else {
            // If numOM is provided, filter based on numOM value
            return deplacementurbain.numDep === this.numOM;       
         }

         

        });
        
        if (this.numOM === null && (!this.startDate || !this.endDate)) {
          this.deplacementlist = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  

  private readOrdremission() {
    const token = this.jwtService.getToken();
    if (token) {
      const employeId = this.jwtService.extractClaim(token, 'matricule'); // Assuming the claim name is 'numEmploye'
  
      this.ordremissionService.readordremission().subscribe(
        (data: Ordremission[]) => {
          // Get the current month and year
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month.
  
          // Filter the data to include only entries within the current month and matching employeId
          this.ordremissionlist = data.filter((ordremission) => {
            const ordreMissionDate = new Date(ordremission.dateMission);
            const ordreMissionYear = ordreMissionDate.getFullYear();
            const ordreMissionMonth = ordreMissionDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month.
  
            // Compare the year and month of the ordreMission with the current year and month
            // Also, check if the ordreMission's employeId matches the extracted employeId
            return (
              ordreMissionYear === currentYear &&
              ordreMissionMonth === currentMonth &&
              ordremission.matriculeEmp === employeId &&
              ordremission.statutOrdre === "VALIDE"
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("No token available");
    }
  }
  
  
  private readDeplacement() {
    const token = this.jwtService.getToken();
    if (token) {
      const employeId = this.jwtService.extractClaim(token, 'matricule'); // Assuming the claim name is 'numEmploye'
  
      this.deplacementService.readdep().subscribe(
        (data: Deplacementurbain[]) => {
          // Get the current month and year
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month.
  
          // Filter the data to include only entries within the current month and matching employeId
          this.deplacementlist = data.filter((deplacementurbain) => {
            const deplacementDate = new Date(deplacementurbain.dateDep);
            const deplacementYear = deplacementDate.getFullYear();
            const deplacementMonth = deplacementDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month.
  
            // Compare the year and month of the deplacement with the current year and month
            // Also, check if the deplacement's employeId matches the extracted employeId
            return (
              deplacementYear === currentYear &&
              deplacementMonth === currentMonth &&
              deplacementurbain.matriculeEmp === employeId &&
              deplacementurbain.statutDep === "VALIDE"
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("No token available");
    }
  }
  
  
  
  private readNotesfrais() {
    this.notefraisService.readnotesfrais().subscribe(
      (data: Notefrais[]) => {
        this.notesfraislist = data;
       
      },
      (error) => {
        console.log(error);
      }
    );
  }




  exportToExcel(data: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, fileName + '.xlsx');
  }
 onCheck(){
  var checkBox = document.getElementById("check")as HTMLInputElement;
  if (checkBox.checked==true) {
    this.onClickExportToExcel();
  }

 }
  
 onClickExportToExcel() {
  console.log(this.selectedRows);
  // Filter the ordremissionlist based on the selected row IDs
  const selectedOrdreMissionIds = Object.keys(this.selectedRows)
    .filter(key => this.selectedRows[key])
    .map(key => key);

  const selectedOrdreMissions = this.ordremissionlist
    .filter(ordreMission => selectedOrdreMissionIds.includes(ordreMission.numOrdre.toString()))
    .map(ordreMission => ({
      numero: ordreMission.numOrdre.toString(),
      dateDep: ordreMission.dateMission,
      depart: ordreMission.debutMission,
      retour: ordreMission.finMission,
      description: ordreMission.objetMission,
      fraisTransport: this.newNote.fraisTransport,
      hebergement: this.newNote.hebergement,
      typeTransport: this.newNote.typeTransport,
      fraisRepas: this.newNote.fraisRepas,
      kilometres: this.newNote.kilometres,
      indemnitesKm: this.newNote.indemnitesKm,
      fraisDivers: this.newNote.fraisDivers,
      total: this.newNote.total,
      avance: this.newNote.avance,
    }));

  // Filter the deplacementlist based on the selected row IDs
  const selectedDeplacementIds = Object.keys(this.selectedRows)
  .filter(key => this.selectedRows[key])
  .map(key => key);

  const selectedDeplacements = this.deplacementlist
    .filter(deplacementurbain => selectedDeplacementIds.includes(deplacementurbain.numDep.toString()))
    .map(deplacementurbain => ({
      numero: deplacementurbain.numDep.toString(),
      dateDep: deplacementurbain.dateDep,
      depart: deplacementurbain.heureDepart,
      retour: deplacementurbain.heureRetourPr,
      description: deplacementurbain.objetMission,
      fraisTransport: this.newNote.fraisTransport,
      hebergement: this.newNote.hebergement,
      typeTransport: this.newNote.typeTransport,
      fraisRepas: this.newNote.fraisRepas,
      kilometres: this.newNote.kilometres,
      indemnitesKm: this.newNote.indemnitesKm,
      fraisDivers: this.newNote.fraisDivers,
      total: this.newNote.total,
      avance: this.newNote.avance,
    }));

  // Concatenate the selected data from ordremissionlist and deplacementlist
  const mergedArray = selectedOrdreMissions.concat(selectedDeplacements);

  // Call the exportToExcel function with the merged array
  this.exportToExcel(mergedArray, 'Note des frais');
  setTimeout(() => {
    this.refreshPage();
  }, 1000);
}
refreshPage() {
 
  window.location.reload();


}
  
  add() {
    const combinedData = {
      numOrdre: this.ordremissionlist[0].numOrdre,
      dateMission: this.ordremissionlist[1].dateMission, 
      objetMission: this.ordremissionlist[2].objetMission, 
      debutMission: this.ordremissionlist[3].debutMission, 
      finMission: this.ordremissionlist[4].finMission, 
      fraisTransport: this.newNote.fraisTransport,
      hebergement: this.newNote.hebergement,
      typeTransport: this.newNote.typeTransport,
      fraisRepas: this.newNote.fraisRepas,
      kilometres: this.newNote.kilometres,
      indemnitesKm: this.newNote.indemnitesKm,
      fraisDivers: this.newNote.fraisDivers,
      total: this.newNote.total,
      avance: this.newNote.avance
    };
    const newNoteEntry: Notefrais = {

      numNote:0,
      numOM: combinedData.numOrdre.toString(),
      dateDep: combinedData.dateMission,
      depart: combinedData.debutMission,
      retour: combinedData.finMission,
      description: combinedData.objetMission,
      fraisTransport: combinedData.fraisTransport,
      hebergement: combinedData.hebergement,
      typeTransport:combinedData.typeTransport,
      fraisRepas: combinedData.fraisRepas,
      kilometres: combinedData.kilometres,
      indemnitesKm: combinedData.indemnitesKm,
      fraisDivers: combinedData.fraisDivers,
      total: combinedData.total,
      avance: combinedData.avance
    };
    
    this.notefraisService.createnote(newNoteEntry).subscribe(
      (data: any) => {
        console.log('Note crée:', data);
       
        this.newNote = new Notefrais();
        
        this.readNotesfrais();
      },
      (error) => {
        console.log('Error creation note:', error);
      }
    );
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

logout(): void {
  // Show a confirmation alert
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  
  if (confirmLogout) {
   
    // Navigate to the login page
    this.router.navigate(['/']); 
  }
}
}
