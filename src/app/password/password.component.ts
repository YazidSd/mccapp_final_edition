import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeService } from '../employe.service'; 
import { Employe } from '../employe';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  employees: Employe[] = [];
  matriculeFilter: string = '';
  isChecked: boolean = false; 
  ngOnInit(): void {
   
  }

  constructor(private router: Router, private employeService: EmployeService) {}


  logout(): void {
    // Show a confirmation alert
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
     
      // Navigate to the login page
      this.router.navigate(['/']); 
    }
  }
  handleButtonClick(): void {
    console.log('Employee checked states:', this.employeeCheckedStates);
  const selectedEmployees = this.employees.filter((employee) => this.employeeCheckedStates[employee.numEmploye]);

    if (selectedEmployees.length > 0) {
      selectedEmployees.forEach((employee) => {
        this.updatePassword(employee);
        console.log('Button clicked');
      });
    }
  }
  updatePassword(employe: Employe): void {
    console.log('Updating password for employe:', employe);
  
    // Check if the provided numEmploye exists in the employees array
    const employeeToUpdate = this.employees.find(e => e.numEmploye === employe.numEmploye);
    if (!employeeToUpdate) {
      console.error('Employee with numEmploye', employe.numEmploye, 'not found.');
      return;
    }
  
    this.employeService.updateEmployeePassword(employeeToUpdate).subscribe(
      (updatedEmploye) => {
        console.log('Password updated successfully', updatedEmploye);
      },
      (error) => {
        console.error('Error updating password', error);
      }
    );
  }
  
  fetchEmployees(): void {
    this.employeService.reademp().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
  employeeCheckedStates: { [key: string]: boolean } = {};
  onMatriculeSearch(): void {
    this.employeService.reademp().subscribe(
      (data) => {
        this.employees = data.filter((employee) => {
          return employee.matricule === this.matriculeFilter;
        });
  
        // Initialize checked states for each employee
        this.employees.forEach((employee) => {
          this.employeeCheckedStates[employee.matricule] = false;
        });
  
        console.log('Employee checked states:', this.employeeCheckedStates);
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
}
