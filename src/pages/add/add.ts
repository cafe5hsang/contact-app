import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from "../../models/employee";

/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage implements OnInit {
  addFunc: any;
  employee = new Employee();
  isClickSubmit: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
  }

  ngOnInit(): void {
    this.addFunc = this.navParams.get('addFunc');
  }

  addEmployee(): void {
    this.isClickSubmit = true;
    this.navCtrl.pop();
  }

  checkValidEmployee(): boolean {
    if (!this.employee.name || !this.employee.address 
      || (this.employee.sex != true && this.employee.sex != false) || !this.employee.phone) return false;
    return true;
  }

  ionViewCanLeave(): boolean {
    if (this.isClickSubmit) {
      this.isClickSubmit = false;
      if (!this.checkValidEmployee()) return false;
      
      this.addFunc.bind(this.navCtrl.getPrevious().instance, this.employee)();
    }
    
    return true;
  }

}
