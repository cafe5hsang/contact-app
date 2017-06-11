import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Employee } from '../../models/employee';
import { AddPage } from '../add/add';
import { EditPage } from "../edit/edit";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  indexSelected: number = -1;
  employees: Employee[] = [
    {name: 'Trần Minh Tuấn', phone: '0123456789', address: 'TP.HCM', sex: true},
    {name: 'Đỗ Mạnh Quân', phone: '0123456789', address: 'TP.Cần Thơ', sex: true},
    {name: 'Lê Tấn Tài', phone: '0123456789', address: 'TP.Đà Nẵng', sex: true},
    {name: 'Nguyễn Huỳnh Ngọc', phone: '0123456789', address: 'TP.Đà Lạt', sex: false},
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController) {
      // console.log('contructor');
  }

  ngOnInit(): void { }

  // add

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
    this.myToastBottom('Đã thêm nhân viên: ' + employee.name);
  }

  openAddPage() {
    this.navCtrl.push(AddPage, {
      employee: null, 
      addFunc: this.addEmployee
    });
  }

  // edit

  editEmployee(employee: Employee): void {
    this.employees[this.indexSelected] = employee;
    this.myToastBottom('Đã cập nhật thông tin nhân viên: ' + employee.name);
  }

  tabEmployee(employee: Employee, index: number) {
    this.indexSelected = index;
    this.navCtrl.push(EditPage, {
      employeeSelected: employee, 
      editFunc: this.editEmployee
    });
  }

  // delete 

  tabDeleteEmployee(index: number) {
    this.presentConfirm(
      'Xóa nhân viên', 
      'Bạn muốn xóa nhân viên: ' + this.employees[index].name, 
      function() {
        this.employees.splice(index, 1);
        this.myToastBottom('Đã xóa nhân viên: ' + this.employees[index].name);
      });
  }

  // display

  displaySex(sex: boolean) {
    if (sex) return 'Nam';
    return 'Nữ';
  }

  displayIcon(sex: boolean) {
    if (sex) return 'ios-male-outline';
    return 'ios-female-outline';
  }

  myToastBottom(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  presentConfirm(title: string, message: string, callbackFunc: any) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Bỏ qua',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Xác nhận',
          handler: callbackFunc.bind(this)
        }
      ]
    });

    alert.present();
  }
}
