import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiServicesService } from '../shared/api-services.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any; 
  showAdd : boolean = true;
  showUpdate : boolean = false;


  constructor(private formBuilder: FormBuilder,private api : ApiServicesService ){

  }

  ngOnInit(): void {
      this.formValue = this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : [''],
      })
      this.getEmployees();
  }

  // clickAddForm(){
  //   this.formValue.reset();
  //   this.showAdd = true;
  //   this.showUpdate = false;
  // }



  addEmployeeDetails(){

    this.showUpdate = false;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;

    this.api.addEmployee(this.employeeModelObj)
    .subscribe(res =>{
      console.log(res);
      this.formValue.reset();
      // return res;
      this.getEmployees();
    })
  }

  formRest(){
    this.formValue.reset();
  }

  getEmployees(){
    this.api.getEmployee()
    .subscribe(res =>{
      this.employeeData = res;
    })
  }


  deleteEmployees(info : any){
    this.api.deleteEmployee(info.id)
    .subscribe(res =>{
      this.getEmployees();
    })
  }

  editEmployees(info: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = info.id;
    this.formValue.controls['firstName'].setValue(info.firstName)
    this.formValue.controls['lastName'].setValue(info.lastName)
    this.formValue.controls['email'].setValue(info.email)
  }

  updateEmployees(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res =>{
      this.formValue.reset();
      this.getEmployees();
    })
    this.showAdd = true;
    this.showUpdate = false;
  }
}
