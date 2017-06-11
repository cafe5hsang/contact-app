import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from "../../models/employee";

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage implements OnInit {
  isClickSubmit = false;

  employee: Employee = null;
  employeeName: String = null; 
  editFunc: any;

  constructor(
    public navCtrl: NavController,
    public NavParams: NavParams
  ) {}

  ngOnInit():void {
    this.employee = this.NavParams.get('employeeSelected');
    this.editFunc = this.NavParams.get('editFunc');

    this.employeeName = this.employee.name;
  }

  checkValidEmployee(): boolean {
    if (!this.employee.name || !this.employee.address 
      || (this.employee.sex != true && this.employee.sex != false) || !this.employee.phone) return false;
    return true;
  }

  editEmployee(): void {
    this.isClickSubmit = true;
    this.navCtrl.pop();
  }

  ionViewCanLeave(): boolean {
    if (this.isClickSubmit) {
      this.isClickSubmit = false;
      if (!this.checkValidEmployee()) return false;

      this.editFunc.bind(this.navCtrl.getPrevious().instance, this.employee)();
    }

    return true;
  }
}